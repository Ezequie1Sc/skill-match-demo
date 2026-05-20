// pages/AdminHome.tsx

import { useEffect, useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import AdminNavbar from "../../components/AdminNavBar"
import { supabase } from "../../database/supabaseClient"
import "../student-side/StudentHome.css"

type Participant = {
  id: number
  full_name: string
  career: string
  semester: number
  preferred_role: string
  interests: string[]
  frontend: number
  backend: number
  database_design: number
  ui_design: number
  documentation: number
  presentation: number
  leadership: number
  events?: {
    id: number
    name: string
  } | null
}

type Category = {
  id: number
  name: string
  description: string | null
  skills: string[]
}

type EventItem = {
  id: number
  name: string
  description: string | null
  event_date: string | null
  modality: string | null
  location: string | null
  team_size: number
  status: string
  category_id: number | null
  categories?: {
    id: number
    name: string
    skills: string[]
  } | null
}

type CategoryFormData = {
  name: string
  description: string
  skills: string
}

type EventFormData = {
  name: string
  categoryId: string
  description: string
  eventDate: string
  modality: string
  location: string
  teamSize: string
  status: string
}

const initialCategoryForm: CategoryFormData = {
  name: "",
  description: "",
  skills: "",
}

const initialEventForm: EventFormData = {
  name: "",
  categoryId: "",
  description: "",
  eventDate: "",
  modality: "Presencial",
  location: "",
  teamSize: "4",
  status: "Abierto",
}

const generatedTeams = [
  {
    name: "Equipo 1",
    balance: "89%",
    members: ["Sofía Ramírez", "Daniel Torres", "Valeria Cruz"],
  },
  {
    name: "Equipo 2",
    balance: "84%",
    members: ["Luis Herrera", "Andrea López", "Carlos Pech"],
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function AdminHome() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [events, setEvents] = useState<EventItem[]>([])

  const [categoryForm, setCategoryForm] =
    useState<CategoryFormData>(initialCategoryForm)

  const [eventForm, setEventForm] =
    useState<EventFormData>(initialEventForm)

  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [heroVisible, setHeroVisible] = useState(false)

  const hero = useInView(0.01)
  const studentsSection = useInView()
  const categoriesSection = useInView()
  const eventsSection = useInView()
  const generatorSection = useInView()

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    loadAdminData()
  }, [])

  async function loadAdminData() {
    try {
      setLoading(true)
      setMessage("")

      const [participantsResponse, categoriesResponse, eventsResponse] =
        await Promise.all([
          supabase
            .from("participants")
            .select(`
              *,
              events (
                id,
                name
              )
            `)
            .order("id", { ascending: true }),

          supabase
            .from("categories")
            .select("*")
            .order("id", { ascending: true }),

          supabase
            .from("events")
            .select(`
              *,
              categories (
                id,
                name,
                skills
              )
            `)
            .order("id", { ascending: true }),
        ])

      if (participantsResponse.error) {
        throw participantsResponse.error
      }

      if (categoriesResponse.error) {
        throw categoriesResponse.error
      }

      if (eventsResponse.error) {
        throw eventsResponse.error
      }

      setParticipants((participantsResponse.data ?? []) as Participant[])
      setCategories((categoriesResponse.data ?? []) as Category[])
      setEvents((eventsResponse.data ?? []) as EventItem[])
    } catch (error) {
      console.error("Error al cargar datos del administrador:", error)
      setMessage("No se pudieron cargar los datos desde Supabase.")
    } finally {
      setLoading(false)
    }
  }

  function handleCategoryChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    setCategoryForm({
      ...categoryForm,
      [name]: value,
    })
  }

  function handleEventChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target

    setEventForm({
      ...eventForm,
      [name]: value,
    })
  }

  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const skills = categoryForm.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")

      const { error } = await supabase.from("categories").insert({
        name: categoryForm.name.trim(),
        description: categoryForm.description.trim(),
        skills,
      })

      if (error) {
        throw error
      }

      setCategoryForm(initialCategoryForm)
      setShowCategoryForm(false)
      setMessage("Categoría creada correctamente.")
      await loadAdminData()
    } catch (error) {
      console.error("Error al crear categoría:", error)
      setMessage("No se pudo crear la categoría.")
    }
  }

  async function handleCreateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const { error } = await supabase.from("events").insert({
        name: eventForm.name.trim(),
        category_id: Number(eventForm.categoryId),
        description: eventForm.description.trim(),
        event_date: eventForm.eventDate,
        modality: eventForm.modality,
        location: eventForm.location.trim(),
        team_size: Number(eventForm.teamSize),
        status: eventForm.status,
      })

      if (error) {
        throw error
      }

      setEventForm(initialEventForm)
      setShowEventForm(false)
      setMessage("Evento creado correctamente.")
      await loadAdminData()
    } catch (error) {
      console.error("Error al crear evento:", error)
      setMessage("No se pudo crear el evento.")
    }
  }

  function getSkillsAverage(participant: Participant) {
    const values = [
      participant.frontend,
      participant.backend,
      participant.database_design,
      participant.ui_design,
      participant.documentation,
      participant.presentation,
      participant.leadership,
    ]

    const average =
      values.reduce((sum, value) => sum + Number(value ?? 0), 0) /
      values.length

    return average.toFixed(1)
  }

  const metrics = [
    {
      value: String(participants.length),
      label: "Estudiantes registrados",
    },
    {
      value: String(categories.length),
      label: "Categorías",
    },
    {
      value: String(events.length),
      label: "Eventos disponibles",
    },
    {
      value: String(generatedTeams.length),
      label: "Equipos generados",
    },
  ]

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: "#FFFFFF",
          color: "#050A14",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <section
          id="admin-inicio"
          ref={hero.ref}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "#FFFFFF",
            paddingTop: 80,
            width: "100%",
            overflow: "hidden",
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(#E4EAF2 1px, transparent 1px), linear-gradient(90deg, #E4EAF2 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              opacity: 0.35,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,133,255,0.06) 0%, transparent 70%)",
            }}
          />

          <div
            className="hero-content-grid"
            style={{
              width: "100%",
              maxWidth: 1200,
              margin: "0 auto",
              padding: "40px 32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div
                className={`section-label hero-title hero-title-d1 ${
                  heroVisible ? "show" : ""
                }`}
              >
                <span className="dot" />
                Panel del administrador
              </div>

              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(38px, 4vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#050A14",
                  marginBottom: 8,
                }}
              >
                <span
                  className={`block hero-title hero-title-d2 ${
                    heroVisible ? "show" : ""
                  }`}
                >
                  Administra eventos
                </span>

                <span
                  className={`block hero-title hero-title-d3 ${
                    heroVisible ? "show" : ""
                  }`}
                  style={{ color: "#0085FF" }}
                >
                  y forma equipos
                </span>

                <span
                  className={`block hero-title hero-title-d4 ${
                    heroVisible ? "show" : ""
                  }`}
                  style={{
                    fontSize: 18,
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    color: "#5A6A85",
                    marginTop: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  desde una vista inteligente
                </span>
              </h1>

              <p
                className={`hero-title hero-title-d5 ${
                  heroVisible ? "show" : ""
                }`}
                style={{
                  fontSize: 15,
                  color: "#5A6A85",
                  maxWidth: 460,
                  lineHeight: 1.65,
                  marginTop: 16,
                }}
              >
                Consulta estudiantes registrados, administra disciplinas,
                revisa eventos próximos y genera equipos equilibrados de
                acuerdo con las habilidades requeridas.
              </p>

              {message && (
                <p
                  style={{
                    marginTop: 18,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#F7FAFF",
                    color: "#0085FF",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {message}
                </p>
              )}

              <div
                className={`hero-title hero-title-d6 ${
                  heroVisible ? "show" : ""
                }`}
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 28,
                  flexWrap: "wrap",
                }}
              >
                <a href="#estudiantes" className="btn-primary">
                  Ver estudiantes
                </a>

                <a href="#eventos" className="btn-ghost">
                  Ver eventos
                </a>
              </div>

              <div
                className="metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  marginTop: 36,
                  paddingTop: 28,
                  borderTop: "1px solid #E4EAF2",
                }}
              >
                {metrics.map((metric) => (
                  <div key={metric.label} className="stat-line">
                    <p
                      className="font-display"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#0085FF",
                      }}
                    >
                      {loading ? "..." : metric.value}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#5A6A85",
                        marginTop: 3,
                      }}
                    >
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="noise"
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                height: 440,
                boxShadow: "0 30px 60px -20px rgba(15,23,42,0.15)",
                width: "100%",
                maxWidth: 500,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200"
                alt="Panel administrativo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  color: "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    opacity: 0.75,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Gestión académica
                </p>
                <p
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 600 }}
                >
                  Eventos · perfiles · equipos
                </p>
              </div>
            </div>
          </div>

          <div
            className="ticker-wrap"
            style={{
              padding: "14px 0",
              background: "#0085FF",
              width: "100%",
            }}
          >
            <div className="ticker-track">
              {[...Array(2)].map((_, r) =>
                [
                  "Estudiantes registrados",
                  "Categorías personalizables",
                  "Eventos activos",
                  "Equipos balanceados",
                  "Dashboard administrativo",
                  "Matching inteligente",
                ].map((text, i) => (
                  <span
                    key={`${r}-${i}`}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginRight: 56,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        marginRight: 56,
                        fontSize: 16,
                      }}
                    >
                      ✦
                    </span>
                    {text}
                  </span>
                ))
              )}
            </div>
          </div>
        </section>

        <section
          id="estudiantes"
          style={{
            background: "#F7FAFF",
            padding: "80px 32px",
            width: "100%",
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto" }}
            ref={studentsSection.ref}
          >
            <div
              className={`reveal ${
                studentsSection.inView ? "visible" : ""
              }`}
            >
              <div className="section-label">
                <span className="dot" />
                Estudiantes registrados
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#050A14",
                  marginBottom: 12,
                }}
              >
                Perfiles disponibles para formar equipos
              </h2>

              <p
                style={{
                  color: "#5A6A85",
                  fontSize: 15,
                  maxWidth: 620,
                  lineHeight: 1.6,
                }}
              >
                Esta información se obtiene directamente de la tabla de
                participantes registrada en Supabase.
              </p>
            </div>

            <div
              style={{
                marginTop: 36,
                border: "1px solid #E4EAF2",
                borderRadius: 20,
                overflow: "hidden",
                background: "#FFFFFF",
              }}
            >
              {participants.length === 0 ? (
                <div style={{ padding: 28, color: "#5A6A85" }}>
                  No hay estudiantes registrados.
                </div>
              ) : (
                participants.map((student, i) => (
                  <div
                    key={student.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
                      gap: 20,
                      padding: "18px 22px",
                      borderTop: i ? "1px solid #E4EAF2" : "none",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#050A14",
                        }}
                      >
                        {student.full_name}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#5A6A85",
                          marginTop: 3,
                        }}
                      >
                        {student.career} · {student.semester}° semestre
                      </p>
                    </div>

                    <p style={{ fontSize: 13, color: "#5A6A85" }}>
                      {student.events?.name ?? "Sin evento"}
                    </p>

                    <span className="tag-pill" style={{ width: "fit-content" }}>
                      {student.preferred_role}
                    </span>

                    <div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#5A6A85",
                          marginBottom: 6,
                        }}
                      >
                        Promedio: {getSkillsAverage(student)}/5
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 5,
                        }}
                      >
                        {student.interests?.slice(0, 3).map((interest) => (
                          <span key={interest} className="tag-pill">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section
          id="categorias"
          style={{
            background: "#FFFFFF",
            padding: "80px 32px",
            width: "100%",
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto" }}
            ref={categoriesSection.ref}
          >
            <div
              className={`reveal ${
                categoriesSection.inView ? "visible" : ""
              }`}
              style={{ textAlign: "center", marginBottom: 44 }}
            >
              <div className="section-label" style={{ justifyContent: "center" }}>
                <span className="dot" />
                Categorías
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#050A14",
                }}
              >
                Disciplinas y habilidades personalizables
              </h2>

              <p
                style={{
                  fontSize: 15,
                  color: "#5A6A85",
                  maxWidth: 560,
                  margin: "16px auto 0",
                  lineHeight: 1.6,
                }}
              >
                El administrador puede registrar disciplinas y definir las
                habilidades que serán consideradas en cada evento.
              </p>

              <button
                onClick={() => setShowCategoryForm(!showCategoryForm)}
                className="btn-primary"
                style={{ marginTop: 24, border: "none", cursor: "pointer" }}
              >
                {showCategoryForm ? "Cancelar" : "Crear categoría"}
              </button>
            </div>

            {showCategoryForm && (
              <form
                onSubmit={handleCreateCategory}
                style={{
                  marginBottom: 36,
                  background: "#F7FAFF",
                  border: "1px solid #E4EAF2",
                  borderRadius: 20,
                  padding: 24,
                  display: "grid",
                  gap: 16,
                }}
              >
                <input
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  required
                  placeholder="Nombre de la categoría"
                  style={inputStyle}
                />

                <textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                  required
                  rows={3}
                  placeholder="Descripción"
                  style={inputStyle}
                />

                <input
                  name="skills"
                  value={categoryForm.skills}
                  onChange={handleCategoryChange}
                  required
                  placeholder="Habilidades separadas por comas"
                  style={inputStyle}
                />

                <button type="submit" className="btn-primary" style={buttonReset}>
                  Guardar categoría
                </button>
              </form>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 18,
              }}
            >
              {categories.map((category, i) => (
                <article
                  key={category.id}
                  className={`feat-card reveal reveal-d${i + 1} ${
                    categoriesSection.inView ? "visible" : ""
                  }`}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#050A14",
                    }}
                  >
                    {category.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: "#5A6A85",
                      lineHeight: 1.55,
                      marginTop: 10,
                    }}
                  >
                    {category.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 16,
                    }}
                  >
                    {category.skills?.map((skill) => (
                      <span key={skill} className="tag-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="eventos"
          style={{
            background: "#F7FAFF",
            padding: "80px 32px",
            width: "100%",
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto" }}
            ref={eventsSection.ref}
          >
            <div className={`reveal ${eventsSection.inView ? "visible" : ""}`}>
              <div className="section-label">
                <span className="dot" />
                Eventos
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#050A14",
                  marginBottom: 12,
                }}
              >
                Eventos registrados por el administrador
              </h2>

              <p
                style={{
                  color: "#5A6A85",
                  fontSize: 15,
                  maxWidth: 620,
                  lineHeight: 1.6,
                }}
              >
                Cada evento puede tener una disciplina, habilidades requeridas,
                participantes inscritos y estado de disponibilidad.
              </p>

              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="btn-primary"
                style={{ marginTop: 24, border: "none", cursor: "pointer" }}
              >
                {showEventForm ? "Cancelar" : "Crear evento"}
              </button>
            </div>

            {showEventForm && (
              <form
                onSubmit={handleCreateEvent}
                style={{
                  marginTop: 32,
                  marginBottom: 36,
                  background: "#FFFFFF",
                  border: "1px solid #E4EAF2",
                  borderRadius: 20,
                  padding: 24,
                  display: "grid",
                  gap: 16,
                }}
              >
                <input
                  name="name"
                  value={eventForm.name}
                  onChange={handleEventChange}
                  required
                  placeholder="Nombre del evento"
                  style={inputStyle}
                />

                <select
                  name="categoryId"
                  value={eventForm.categoryId}
                  onChange={handleEventChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <textarea
                  name="description"
                  value={eventForm.description}
                  onChange={handleEventChange}
                  required
                  rows={3}
                  placeholder="Descripción del evento"
                  style={inputStyle}
                />

                <input
                  type="date"
                  name="eventDate"
                  value={eventForm.eventDate}
                  onChange={handleEventChange}
                  required
                  style={inputStyle}
                />

                <select
                  name="modality"
                  value={eventForm.modality}
                  onChange={handleEventChange}
                  style={inputStyle}
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Híbrido">Híbrido</option>
                </select>

                <input
                  name="location"
                  value={eventForm.location}
                  onChange={handleEventChange}
                  required
                  placeholder="Lugar"
                  style={inputStyle}
                />

                <select
                  name="teamSize"
                  value={eventForm.teamSize}
                  onChange={handleEventChange}
                  style={inputStyle}
                >
                  <option value="2">2 integrantes</option>
                  <option value="3">3 integrantes</option>
                  <option value="4">4 integrantes</option>
                  <option value="5">5 integrantes</option>
                  <option value="6">6 integrantes</option>
                </select>

                <select
                  name="status"
                  value={eventForm.status}
                  onChange={handleEventChange}
                  style={inputStyle}
                >
                  <option value="Abierto">Abierto</option>
                  <option value="Próximamente">Próximamente</option>
                  <option value="Cerrado">Cerrado</option>
                </select>

                <button type="submit" className="btn-primary" style={buttonReset}>
                  Guardar evento
                </button>
              </form>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                marginTop: 36,
              }}
            >
              {events.map((event, i) => (
                <article
                  key={event.id}
                  className={`feat-card reveal reveal-d${i + 1} ${
                    eventsSection.inView ? "visible" : ""
                  }`}
                >
                  <span className="tag-pill">
                    {event.categories?.name ?? "Sin categoría"}
                  </span>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#050A14",
                      marginTop: 18,
                    }}
                  >
                    {event.name}
                  </h3>

                  <p style={{ fontSize: 13, color: "#5A6A85", marginTop: 8 }}>
                    Fecha: {event.event_date ?? "Sin fecha"}
                  </p>

                  <p style={{ fontSize: 13, color: "#5A6A85", marginTop: 4 }}>
                    Modalidad: {event.modality}
                  </p>

                  <p style={{ fontSize: 13, color: "#5A6A85", marginTop: 4 }}>
                    Equipo: {event.team_size} integrantes
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 16,
                    }}
                  >
                    {event.categories?.skills?.map((skill) => (
                      <span key={skill} className="tag-pill">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #E4EAF2",
                      marginTop: 20,
                      paddingTop: 16,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#0085FF",
                      }}
                    >
                      Estado: {event.status}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="generador"
          style={{
            background: "#FFFFFF",
            padding: "80px 32px",
            width: "100%",
            scrollMarginTop: 80,
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto" }}
            ref={generatorSection.ref}
          >
            <div
              className={`reveal ${
                generatorSection.inView ? "visible" : ""
              }`}
              style={{ textAlign: "center", marginBottom: 44 }}
            >
              <div className="section-label" style={{ justifyContent: "center" }}>
                <span className="dot" />
                Generador
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#050A14",
                }}
              >
                Formación inteligente de equipos
              </h2>

              <p
                style={{
                  fontSize: 15,
                  color: "#5A6A85",
                  maxWidth: 560,
                  margin: "16px auto 0",
                  lineHeight: 1.6,
                }}
              >
                Esta sección queda preparada para generar equipos considerando
                evento, habilidades, intereses y roles preferidos.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "380px 1fr",
                gap: 24,
              }}
            >
              <article className="feat-card">
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#050A14" }}>
                  Configuración
                </h3>

                <label style={{ display: "block", marginTop: 20 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#5A6A85",
                    }}
                  >
                    Evento
                  </span>

                  <select style={{ ...inputStyle, marginTop: 8 }}>
                    {events.map((event) => (
                      <option key={event.id}>{event.name}</option>
                    ))}
                  </select>
                </label>

                <label style={{ display: "block", marginTop: 16 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#5A6A85",
                    }}
                  >
                    Integrantes por equipo
                  </span>

                  <select style={{ ...inputStyle, marginTop: 8 }}>
                    <option>3 integrantes</option>
                    <option>4 integrantes</option>
                    <option>5 integrantes</option>
                  </select>
                </label>

                <button
                  style={{
                    marginTop: 24,
                    width: "100%",
                    border: "none",
                    borderRadius: 12,
                    background: "#0085FF",
                    color: "#FFFFFF",
                    padding: "13px 18px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Generar equipos
                </button>
              </article>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 18,
                }}
              >
                {generatedTeams.map((team) => (
                  <article key={team.name} className="feat-card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#050A14",
                        }}
                      >
                        {team.name}
                      </h3>

                      <span className="tag-pill">{team.balance} balance</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginTop: 18,
                      }}
                    >
                      {team.members.map((member) => (
                        <div
                          key={member}
                          style={{
                            padding: "10px 12px",
                            borderRadius: 12,
                            background: "#F7FAFF",
                            fontSize: 13,
                            color: "#5A6A85",
                          }}
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E4EAF2",
  borderRadius: 12,
  padding: "12px 14px",
  outline: "none",
  fontSize: 14,
  background: "#FFFFFF",
}

const buttonReset: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  width: "fit-content",
}

export default AdminHome