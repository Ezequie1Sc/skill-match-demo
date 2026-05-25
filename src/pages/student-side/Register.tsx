// pages/Register.tsx
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Notification from "../../components/Notification"
import Footer from "../../components/Footer"
import {
  getEventOptions,
  type EventOption,
} from "../../services/eventsService"
import {
  createParticipant,
  type CreateParticipantData,
} from "../../services/participantsService"

type RegisterFormData = {
  fullName: string
  email: string
  password: string
  career: string
  semester: string
  preferredRole: string
  interests: string
  eventId: string
  frontend: string
  backend: string
  database: string
  uiDesign: string
  documentation: string
  presentation: string
  leadership: string
}

const initialFormData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  career: "",
  semester: "",
  preferredRole: "",
  interests: "",
  eventId: "",
  frontend: "1",
  backend: "1",
  database: "1",
  uiDesign: "1",
  documentation: "1",
  presentation: "1",
  leadership: "1",
}

type ValidationError = {
  field: keyof RegisterFormData
  message: string
}

function Register() {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [events, setEvents] = useState<EventOption[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning" | "info"
    message: string
    isOpen: boolean
  }>({
    type: "info",
    message: "",
    isOpen: false,
  })

  useEffect(() => {
    async function loadEvents() {
      try {
        const events = await getEventOptions()
        setEvents(events)
      } catch (error) {
        console.error("Error al cargar eventos:", error)

        setNotification({
          type: "error",
          message: "No se pudieron cargar los eventos desde Supabase.",
          isOpen: true,
        })
      }
    }

    loadEvents()
  }, [])

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors((prev) =>
      prev.filter((error) => error.field !== name),
    )
  }

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = []

    if (!formData.fullName.trim()) {
      errors.push({
        field: "fullName",
        message: "El nombre completo es obligatorio",
      })
    } else if (formData.fullName.trim().length < 3) {
      errors.push({
        field: "fullName",
        message: "El nombre debe tener al menos 3 caracteres",
      })
    }

    if (!formData.email.trim()) {
      errors.push({
        field: "email",
        message: "El correo electrónico es obligatorio",
      })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push({
        field: "email",
        message: "Ingresa un correo electrónico válido",
      })
    }

    if (!formData.password.trim()) {
      errors.push({
        field: "password",
        message: "La contraseña es obligatoria",
      })
    } else if (formData.password.length < 6) {
      errors.push({
        field: "password",
        message: "La contraseña debe tener al menos 6 caracteres",
      })
    }

    if (!formData.career) {
      errors.push({
        field: "career",
        message: "Selecciona una carrera",
      })
    }

    if (!formData.semester) {
      errors.push({
        field: "semester",
        message: "Selecciona un semestre",
      })
    }

    if (!formData.preferredRole) {
      errors.push({
        field: "preferredRole",
        message: "Selecciona un rol preferido",
      })
    }

    if (!formData.eventId) {
      errors.push({
        field: "eventId",
        message: "Selecciona un evento de interés",
      })
    }

    if (!formData.interests.trim()) {
      errors.push({
        field: "interests",
        message: "Los intereses son obligatorios",
      })
    } else {
      const interests = formData.interests
        .split(",")
        .map((interest) => interest.trim())
        .filter((interest) => interest !== "")

      if (interests.length < 2) {
        errors.push({
          field: "interests",
          message: "Agrega al menos 2 intereses separados por comas",
        })
      }
    }

    return errors
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm()

    if (validationErrors.length > 0) {
      setErrors(validationErrors)

      setNotification({
        type: "error",
        message: "Por favor corrige los errores del formulario.",
        isOpen: true,
      })

      return
    }

    try {
      setIsSubmitting(true)

      const participantData: CreateParticipantData = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        career: formData.career,
        semester: Number(formData.semester),
        preferred_role: formData.preferredRole,
        interests: formData.interests
          .split(",")
          .map((interest) => interest.trim())
          .filter((interest) => interest !== ""),
        event_id: Number(formData.eventId),
        frontend: Number(formData.frontend),
        backend: Number(formData.backend),
        database_design: Number(formData.database),
        ui_design: Number(formData.uiDesign),
        documentation: Number(formData.documentation),
        presentation: Number(formData.presentation),
        leadership: Number(formData.leadership),
      }

      const createdParticipant = await createParticipant(participantData)

      localStorage.setItem(
        "currentParticipantId",
        String(createdParticipant.id),
      )

      setNotification({
        type: "success",
        message: "¡Participante registrado correctamente en SkillMatch!",
        isOpen: true,
      })

      setFormData(initialFormData)
      setErrors([])

      navigate("/user/home")
    } catch (error) {
      console.error("Error al registrar:", error)

      setNotification({
        type: "error",
        message:
          "No se pudo registrar el participante. Verifica que el correo no esté registrado.",
        isOpen: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    setFormData(initialFormData)
    setErrors([])

    setNotification({
      type: "info",
      message: "Formulario limpiado",
      isOpen: true,
    })
  }

  const getErrorMessage = (field: keyof RegisterFormData) => {
    const error = errors.find((error) => error.field === field)
    return error ? error.message : null
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Notification
        type={notification.type}
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isOpen: false }))
        }
      />

      <main className="flex-1 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0085FF] rounded-3xl p-8 mb-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-white/80"></div>

              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Registro
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Completa tu perfil SkillMatch
            </h1>

            <p className="text-white/80 max-w-2xl">
              Registra tus datos, intereses, habilidades y credenciales para
              participar en un evento y formar parte de un equipo equilibrado.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Nombre completo
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Ej. David Euán Pérez"
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("fullName")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  />

                  {getErrorMessage("fullName") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("fullName")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="correo@ejemplo.com"
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("email")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  />

                  {getErrorMessage("email") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("email")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("password")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  />

                  {getErrorMessage("password") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("password")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Carrera
                  </label>

                  <select
                    name="career"
                    value={formData.career}
                    onChange={handleChange}
                    required
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("career")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  >
                    <option value="">Selecciona una carrera</option>
                    <option value="Ingeniería en Sistemas Computacionales">
                      Ingeniería en Sistemas Computacionales
                    </option>
                    <option value="Ingeniería Informática">
                      Ingeniería Informática
                    </option>
                    <option value="Ingeniería en Tecnologías de la Información">
                      Ingeniería en Tecnologías de la Información
                    </option>
                    <option value="Ingeniería en Software">
                      Ingeniería en Software
                    </option>
                    <option value="Ingeniería en Mecatrónica">
                      Ingeniería en Mecatrónica
                    </option>
                  </select>

                  {getErrorMessage("career") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("career")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Semestre
                  </label>

                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("semester")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  >
                    <option value="">Selecciona un semestre</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}° semestre
                      </option>
                    ))}
                  </select>

                  {getErrorMessage("semester") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("semester")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Rol preferido
                  </label>

                  <select
                    name="preferredRole"
                    value={formData.preferredRole}
                    onChange={handleChange}
                    required
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("preferredRole")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Base de datos">Base de datos</option>
                    <option value="Diseño UI">Diseño UI</option>
                    <option value="Documentación">Documentación</option>
                    <option value="Presentación">Presentación</option>
                    <option value="Liderazgo">Liderazgo</option>
                  </select>

                  {getErrorMessage("preferredRole") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("preferredRole")}
                    </p>
                  )}
                </div>

                <div className="block md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Evento de interés
                  </label>

                  <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    required
                    className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("eventId")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  >
                    <option value="">Selecciona un evento</option>

                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>

                  {getErrorMessage("eventId") && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("eventId")}
                    </p>
                  )}

                  {events.length === 0 && (
                    <p className="mt-1.5 text-xs text-amber-600">
                      No hay eventos disponibles. Revisa la tabla events en
                      Supabase.
                    </p>
                  )}
                </div>

                <div className="block md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    Intereses
                  </label>

                  <textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                    placeholder="Ej. React, APIs, diseño UI, bases de datos"
                    rows={3}
                    className={`mt-1 w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                      getErrorMessage("interests")
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[#0085FF] focus:ring-[#0085FF]/20"
                    }`}
                  />

                  {getErrorMessage("interests") ? (
                    <p className="mt-1.5 text-xs text-red-500">
                      {getErrorMessage("interests")}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs text-slate-400">
                      Separa tus intereses con comas.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Nivel de habilidades
                </h2>

                <p className="text-sm text-slate-500 mb-4">
                  Selecciona un nivel del 1 al 5, donde 1 es básico y 5 es
                  avanzado.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <SkillSelect
                    label="Frontend"
                    name="frontend"
                    value={formData.frontend}
                    onChange={handleChange}
                  />

                  <SkillSelect
                    label="Backend"
                    name="backend"
                    value={formData.backend}
                    onChange={handleChange}
                  />

                  <SkillSelect
                    label="Base de datos"
                    name="database"
                    value={formData.database}
                    onChange={handleChange}
                  />

                  <SkillSelect
                    label="Diseño UI"
                    name="uiDesign"
                    value={formData.uiDesign}
                    onChange={handleChange}
                  />

                  <SkillSelect
                    label="Documentación"
                    name="documentation"
                    value={formData.documentation}
                    onChange={handleChange}
                  />

                  <SkillSelect
                    label="Presentación"
                    name="presentation"
                    value={formData.presentation}
                    onChange={handleChange}
                  />

                  <SkillSelect
                    label="Liderazgo"
                    name="leadership"
                    value={formData.leadership}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Limpiar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0085FF] px-6 py-3 font-semibold text-white transition hover:bg-[#0070DD] hover:scale-105 active:scale-95 shadow-lg shadow-[#0085FF]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Registrando..." : "Registrar participante"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-semibold text-[#0085FF] hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

type SkillSelectProps = {
  label: string
  name: keyof RegisterFormData
  value: string
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void
}

function SkillSelect({ label, name, value, onChange }: SkillSelectProps) {
  return (
    <div className="block">
      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0085FF] focus:ring-2 focus:ring-[#0085FF]/20"
      >
        <option value="1">1 - Básico</option>
        <option value="2">2 - Bajo</option>
        <option value="3">3 - Medio</option>
        <option value="4">4 - Alto</option>
        <option value="5">5 - Avanzado</option>
      </select>
    </div>
  )
}

export default Register