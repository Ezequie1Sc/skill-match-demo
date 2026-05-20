// pages/Register.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Notification from "../../components/Notification"
import Footer from "../../components/Footer"
import { getEvents, type EventOption } from "../../services/eventsService"
import {
  createParticipant,
  type CreateParticipantData,
} from "../../services/participantsService"

type RegisterFormData = {
  fullName: string
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
        const events = await getEvents()
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

      await createParticipant(participantData)

      setNotification({
        type: "success",
        message: "¡Participante registrado correctamente en SkillMatch!",
        isOpen: true,
      })

      setFormData(initialFormData)
      setErrors([])
    } catch (error) {
      console.error("Error al registrar:", error)

      setNotification({
        type: "error",
        message: "Algo salió mal. Por favor intenta de nuevo.",
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
              Registra tus datos, intereses y habilidades para participar en un
              evento y formar parte de un equipo equilibrado.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    <svg
                      className="w-4 h-4 text-[#0085FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
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
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      {getErrorMessage("fullName")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    <svg
                      className="w-4 h-4 text-[#0085FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
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
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      {getErrorMessage("career")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    <svg
                      className="w-4 h-4 text-[#0085FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
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
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      {getErrorMessage("semester")}
                    </p>
                  )}
                </div>

                <div className="block">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    <svg
                      className="w-4 h-4 text-[#0085FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
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
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      {getErrorMessage("preferredRole")}
                    </p>
                  )}
                </div>

                <div className="block md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    <svg
                      className="w-4 h-4 text-[#0085FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
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
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
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
                    <svg
                      className="w-4 h-4 text-[#0085FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
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
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
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
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-[#0085FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>

                  <h2 className="text-xl font-bold text-slate-900">
                    Nivel de habilidades
                  </h2>
                </div>

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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Limpiar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0085FF] px-6 py-3 font-semibold text-white transition hover:bg-[#0070DD] hover:scale-105 active:scale-95 shadow-lg shadow-[#0085FF]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0"
                    />
                  </svg>

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