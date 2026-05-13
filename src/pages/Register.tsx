import { useState } from "react"
import type { Participant } from "../types/participant_model"

type RegisterFormData = {
    fullName: string
    career: string
    semester: string
    preferredRole: string
    interests: string
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
    frontend: "1",
    backend: "1",
    database: "1",
    uiDesign: "1",
    documentation: "1",
    presentation: "1",
    leadership: "1",
}



function Register() {
  const [formData,setFormData] = useState<RegisterFormData>(initialFormData)
  const [savedMessage, setSavedMessage] = useState('')

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const{name, value} = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const participant: Participant = {
      id: Date.now(),
      fullName: formData.fullName,
      career: formData.career,
      semester: Number(formData.semester),
      preferredRole: formData.preferredRole,
      interests: formData.interests
        .split(',')
        .map((interest) => interest.trim())
        .filter((interest) => interest !== ''),
      skills: {
        frontend: Number(formData.frontend),
        backend: Number(formData.backend),
        database: Number(formData.database),
        uiDesign: Number(formData.uiDesign),
        documentation: Number(formData.documentation),
        presentation: Number(formData.presentation),
        leadership: Number(formData.leadership),
      },
      createdAt: new Date().toISOString(),
    }

    const savedParticipants = JSON.parse(
      localStorage.getItem('participants') ?? '[]',
    ) as Participant[]

    localStorage.setItem(
      'participants',
      JSON.stringify([...savedParticipants, participant]),
    )

    setSavedMessage('Participante registrado correctamente.')
    setFormData(initialFormData)
  }


  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Registro
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Registro de participante
        </h1>

        <p className="mt-2 max-w-3xl text-slate-600">
          Captura tus datos generales, intereses y nivel de habilidades para que
          SkillMatch pueda generar equipos equilibrados.
        </p>
      </div>

      {savedMessage && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          {savedMessage}
        </div>
      )}

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Nombre completo
            </span>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Ej. David Euán Pérez"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Carrera
            </span>

            <select 
              name="career"
              value={formData.career}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">Selecciona una carrera</option>
              <option value="Ingeniería en Sistemas Computacionales">
                Ingeniería en Sistemas Computacionales
              </option>
              <option value="Ingeniería Informática">
                Ingeniería Informática
              </option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Semestre
            </span>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">Selecciona un semestre</option>
              <option value="2">2° semestre</option>
              <option value="4">4° semestre</option>
              <option value="6">6° semestre</option>
              <option value="8">8° semestre</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Rol preferido
            </span>

            <select 
              name="preferredRole"
              value={formData.preferredRole}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">Selecciona un rol</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Base de datos">Base de datos</option>
              <option value="Diseño UI">Diseño UI</option>
              <option value="Documentación">Documentación</option>
              <option value="Presentación">Presentación</option>
              <option value="Liderazgo">Liderazgo</option>
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Intereses
            </span>

            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              required
              placeholder="Ej. React, APIs, diseño UI, bases de datos"
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Separa tus intereses con comas.
            </p>
          </label>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-slate-900">
            Nivel de habilidades
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Selecciona un nivel del 1 al 5, donde 1 es básico y 5 es avanzado.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
              type="button"
              onClick={() => setFormData(initialFormData)}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Limpiar
          </button>

          <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Registrar participante
          </button>

        </div>
      </form>
    </section>
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
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="1">1 - Básico</option>
        <option value="2">2 - Bajo</option>
        <option value="3">3 - Medio</option>
        <option value="4">4 - Alto</option>
        <option value="5">5 - Avanzado</option>
      </select>
    </label>
  )
}

export default Register