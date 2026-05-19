import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import AdminNavbar from "../../components/AdminNavBar"
import "../student-side/StudentHome.css"

const adminMetrics = [
  { value: "24", label: "Estudiantes registrados" },
  { value: "7", label: "Categorías" },
  { value: "4", label: "Eventos disponibles" },
  { value: "6", label: "Equipos generados" },
]

const students = [
  {
    name: "Sofía Ramírez",
    career: "Ingeniería en Sistemas",
    semester: "8° semestre",
    event: "Hackathon Web 2026",
    role: "Frontend",
    skills: ["React", "UI", "Documentación"],
  },
  {
    name: "Daniel Torres",
    career: "Ingeniería Informática",
    semester: "8° semestre",
    event: "Hackathon Web 2026",
    role: "Backend",
    skills: ["APIs", "PostgreSQL", "Python"],
  },
  {
    name: "Valeria Cruz",
    career: "Ingeniería en Sistemas",
    semester: "6° semestre",
    event: "Concurso de Programación",
    role: "Algoritmos",
    skills: ["Lógica", "Estructuras", "C++"],
  },
  {
    name: "Luis Herrera",
    career: "Ingeniería Informática",
    semester: "8° semestre",
    event: "Reto de Ciberseguridad",
    role: "Redes",
    skills: ["Linux", "Redes", "Seguridad"],
  },
]

const categories = [
  {
    name: "Desarrollo Web",
    desc: "Proyectos frontend, backend, bases de datos y diseño de interfaces.",
    skills: ["Frontend", "Backend", "Base de datos", "UI/UX"],
  },
  {
    name: "Programación Competitiva",
    desc: "Retos de lógica, algoritmos, estructuras de datos y resolución de problemas.",
    skills: ["Algoritmos", "Estructuras", "Matemáticas"],
  },
  {
    name: "Ciberseguridad",
    desc: "Eventos enfocados en redes, seguridad informática y análisis de vulnerabilidades.",
    skills: ["Redes", "Linux", "Seguridad", "Análisis"],
  },
  {
    name: "Innovación / Emprendimiento",
    desc: "Equipos orientados a propuestas, pitch, liderazgo y modelo de negocio.",
    skills: ["Pitch", "Liderazgo", "Marketing", "Gestión"],
  },
]

const events = [
  {
    name: "Hackathon Web 2026",
    category: "Desarrollo Web",
    date: "27 de mayo",
    participants: 12,
    status: "Abierto",
    skills: ["Frontend", "Backend", "UI/UX", "Base de datos"],
  },
  {
    name: "Concurso de Programación",
    category: "Programación Competitiva",
    date: "30 de mayo",
    participants: 8,
    status: "Próximamente",
    skills: ["Algoritmos", "Estructuras", "Lógica"],
  },
  {
    name: "Reto de Ciberseguridad",
    category: "Ciberseguridad",
    date: "5 de junio",
    participants: 6,
    status: "Abierto",
    skills: ["Redes", "Linux", "Análisis", "Seguridad"],
  },
]

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
        {/* HERO ADMIN */}
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

                <a href="#generador" className="btn-ghost">
                  Generar equipos
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
                {adminMetrics.map((m, i) => (
                  <div key={i} className="stat-line">
                    <p
                      className="font-display"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#0085FF",
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#5A6A85",
                        marginTop: 3,
                      }}
                    >
                      {m.label}
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
              borderTop: "1px solid rgba(255,255,255,0.2)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
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
                ].map((t, i) => (
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
                    {t}
                  </span>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ESTUDIANTES */}
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
                El administrador puede consultar participantes, intereses,
                evento seleccionado, rol preferido y habilidades principales.
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
              {students.map((student, i) => (
                <div
                  key={student.name}
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
                      {student.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#5A6A85",
                        marginTop: 3,
                      }}
                    >
                      {student.career} · {student.semester}
                    </p>
                  </div>

                  <p style={{ fontSize: 13, color: "#5A6A85" }}>
                    {student.event}
                  </p>

                  <span className="tag-pill" style={{ width: "fit-content" }}>
                    {student.role}
                  </span>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {student.skills.map((skill) => (
                      <span key={skill} className="tag-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
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
                SkillMatch no se limita a software. El organizador puede
                trabajar con distintas disciplinas y habilidades según el tipo
                de evento.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 18,
              }}
            >
              {categories.map((cat, i) => (
                <article
                  key={cat.name}
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
                    {cat.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: "#5A6A85",
                      lineHeight: 1.55,
                      marginTop: 10,
                    }}
                  >
                    {cat.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 16,
                    }}
                  >
                    {cat.skills.map((skill) => (
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

        {/* EVENTOS */}
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
            </div>

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
                  key={event.name}
                  className={`feat-card reveal reveal-d${i + 1} ${
                    eventsSection.inView ? "visible" : ""
                  }`}
                >
                  <span className="tag-pill">{event.category}</span>

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

                  <p
                    style={{
                      fontSize: 13,
                      color: "#5A6A85",
                      marginTop: 8,
                    }}
                  >
                    Fecha: {event.date}
                  </p>

                  <p
                    style={{
                      fontSize: 13,
                      color: "#5A6A85",
                      marginTop: 4,
                    }}
                  >
                    Participantes: {event.participants}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 16,
                    }}
                  >
                    {event.skills.map((skill) => (
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

      {/**() */}
        {/* GENERADOR */}
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
                El sistema puede generar equipos equilibrados considerando
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
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#050A14",
                  }}
                >
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

                  <select
                    style={{
                      marginTop: 8,
                      width: "100%",
                      border: "1px solid #E4EAF2",
                      borderRadius: 12,
                      padding: "12px 14px",
                      outline: "none",
                    }}
                  >
                    {events.map((event) => (
                      <option key={event.name}>{event.name}</option>
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

                  <select
                    style={{
                      marginTop: 8,
                      width: "100%",
                      border: "1px solid #E4EAF2",
                      borderRadius: 12,
                      padding: "12px 14px",
                      outline: "none",
                    }}
                  >
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

export default AdminHome