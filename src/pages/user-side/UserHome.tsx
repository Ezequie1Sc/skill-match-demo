import { useEffect, useState } from "react"
import type { CSSProperties } from "react"

import "../student-side/StudentHome.css"
import { createTeamWithMembers, getPendingInvitationsByParticipant, respondToTeamInvitation, type TeamInvitation } from "../../services/teamsService"
import {
  getParticipantByID,
  getParticipantsByEvent,
  updateLookingForTeam,
  type ParticipantData,
} from "../../services/participantsService"
import {
  getEvents,
  type EventData,
} from "../../services/eventsService"

function UserHome() {
  const [invitations, setInvitations] = useState<TeamInvitation[]>([])
  const [creatingTeam, setCreatingTeam] = useState(false)
  const [participant, setParticipant] = useState<ParticipantData | null>(null)
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [lookingForTeam, setLookingForTeam] = useState(true)
  const [suggestedTeam, setSuggestedTeam] = useState<ParticipantData[]>([])
  const [teamSize, setTeamSize] = useState("4")

  

  useEffect(() => {
    loadUserData()
  }, [])

  function getParticipantAverage(participant: ParticipantData) {
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
    values.reduce((sum, value) => sum + Number(value ?? 0), 0) / values.length

  return Number(average.toFixed(1))
}

function suggestTeamForParticipant(
  currentParticipant: ParticipantData,
  participants: ParticipantData[],
  size: number,
) {
  const candidates = participants
    .filter((candidate) => {
      return (
        candidate.id !== currentParticipant.id &&
        candidate.looking_for_team === true
      )
    })
    .map((candidate) => {
      const differentRole =
        candidate.preferred_role !== currentParticipant.preferred_role ? 1 : 0

      const averageDifference = Math.abs(
        getParticipantAverage(candidate) -
          getParticipantAverage(currentParticipant),
      )

      return {
        participant: candidate,
        score: differentRole * 2 - averageDifference,
      }
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.participant)

  return [currentParticipant, ...candidates.slice(0, size - 1)]
}

async function handleSearchTeam() {
  if (!participant) {
    setMessage("Inicia sesión para buscar equipo.")
    return
  }

  try {
    const participantsByEvent = await getParticipantsByEvent(participant.event_id)

    const team = suggestTeamForParticipant(
      participant,
      participantsByEvent,
      Number(teamSize),
    )

    setSuggestedTeam(team)
    setMessage("Sugerencia de equipo generada correctamente.")
  } catch (error) {
    console.error("Error al sugerir equipo:", error)
    setMessage("No se pudo generar una sugerencia de equipo.")
  }
}


async function handleCreateSuggestedTeam() {
  if (!participant || suggestedTeam.length === 0) {
    setMessage("Primero genera una sugerencia de equipo.")
    return
  }

  try {
    setCreatingTeam(true)
    setMessage("")

    const balanceScore =
      suggestedTeam.reduce(
        (sum, member) => sum + getParticipantAverage(member),
        0,
      ) / suggestedTeam.length

    await createTeamWithMembers(
  {
    name: `Equipo de ${participant.full_name}`,
    event_id: participant.event_id,
    balance_score: Number(balanceScore.toFixed(1)),
    members: suggestedTeam,
  },
  participant.id,
)

    setMessage("Equipo creado correctamente.")
  } catch (error) {
    console.error("Error al crear equipo:", error)
    setMessage("No se pudo crear el equipo.")
  } finally {
    setCreatingTeam(false)
  }
}

async function handleToggleLookingForTeam(value: boolean) {
  if (!participant) {
    setMessage("Inicia sesión para cambiar tu disponibilidad.")
    return
  }

  try {
    setLookingForTeam(value)

    await updateLookingForTeam(participant.id, value)

    setMessage(
      value
        ? "Ahora apareces como disponible para formar equipo."
        : "Tu disponibilidad para formar equipo fue desactivada.",
    )
  } catch (error) {
    console.error("Error al actualizar disponibilidad:", error)
    setLookingForTeam(!value)
    setMessage("No se pudo actualizar tu disponibilidad.")
  }
}



async function handleRespondInvitation(
  invitationId: number,
  status: "Aceptado" | "Rechazado",
) {
  try {
    await respondToTeamInvitation(invitationId, status)

    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId),
    )

    setMessage(
      status === "Aceptado"
        ? "Invitación aceptada."
        : "Invitación rechazada.",
    )
  } catch (error) {
    console.error("Error al responder invitación:", error)
    setMessage("No se pudo responder la invitación.")
  }
}


 async function loadUserData() {
  try {
    setLoading(true)
    setMessage("")

    const currentParticipantId = localStorage.getItem("currentParticipantId")

    const eventsData = await getEvents()
    setEvents(eventsData)

    if (!currentParticipantId) {
      setParticipant(null)
      setMessage("Inicia sesión para consultar tu perfil.")
      return
    }

    const participantData = await getParticipantByID(
      Number(currentParticipantId),
    )

    setParticipant(participantData)

    if (participantData) {
       setLookingForTeam(participantData.looking_for_team)
    }

    if (participantData) {
      const invitationData = await getPendingInvitationsByParticipant(
        participantData.id,
      )

      setInvitations(invitationData)
    }
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error)
    setMessage("No se pudieron cargar los datos del usuario.")
  } finally {
    setLoading(false)
  }
}

  function getSkillsAverage(participant: ParticipantData) {
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

  return (
    <main
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: "#FFFFFF",
        color: "#050A14",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        id="user-inicio"
        style={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "100px 32px 60px",
          background: "#FFFFFF",
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
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <div className="section-label">
              <span className="dot" />
              Panel del participante
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: "clamp(38px, 4vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#050A14",
                marginBottom: 12,
              }}
            >
              Bienvenido
              <br />
              <span style={{ color: "#0085FF" }}>
                {loading
                  ? "cargando..."
                  : participant?.full_name ?? "a SkillMatch"}
              </span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "#5A6A85",
                maxWidth: 480,
                lineHeight: 1.65,
                marginTop: 16,
              }}
            >
              Consulta tu perfil, revisa eventos disponibles y conoce el estado
              de tu equipo dentro de la plataforma.
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
              style={{
                display: "flex",
                gap: 10,
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              <a href="#mi-perfil" className="btn-primary">
                Ver mi perfil
              </a>

              <a href="#eventos" className="btn-ghost">
                Ver eventos
              </a>

              <a href="#mi-equipo" className="btn-ghost">
                Ver mi equipo
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
              <MetricCard
                value={participant?.events?.name ?? "Sin evento"}
                label="Evento elegido"
              />

              <MetricCard
                value={participant?.preferred_role ?? "Sin rol"}
                label="Rol preferido"
              />

              <MetricCard
                value={participant ? `${getSkillsAverage(participant)}/5` : "0/5"}
                label="Promedio"
              />

              <MetricCard value="Pendiente" label="Equipo" />
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
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
              alt="Estudiantes colaborando"
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
                SkillMatch
              </p>

              <p
                className="font-display"
                style={{ fontSize: 20, fontWeight: 600 }}
              >
                Perfil · eventos · equipo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MI PERFIL */}
      <section
        id="mi-perfil"
        style={{
          background: "#F7FAFF",
          padding: "90px 32px",
          width: "100%",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            label="Mi perfil"
            title="Datos del participante"
            description="Estos son los datos que se usarán para formar equipos equilibrados."
          />

          {!participant ? (
            <EmptyState
              title="No se encontró un perfil registrado"
              description="Completa el formulario de registro para visualizar tus datos en esta sección."
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: 24,
                marginTop: 36,
              }}
            >
              <article className="feat-card">
                <h3 style={cardTitle}>Información general</h3>

                <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                  <InfoRow label="Nombre" value={participant.full_name} />
                  <InfoRow label="Carrera" value={participant.career} />
                  <InfoRow label="Semestre" value={`${participant.semester}°`} />
                  <InfoRow
                    label="Rol preferido"
                    value={participant.preferred_role}
                  />
                  <InfoRow
                    label="Evento elegido"
                    value={participant.events?.name ?? "Sin evento"}
                  />
                </div>

                <div style={{ marginTop: 22 }}>
                  <p style={smallTitle}>Intereses</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {participant.interests?.length ? (
                      participant.interests.map((interest) => (
                        <span key={interest} className="tag-pill">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span style={mutedText}>Sin intereses registrados</span>
                    )}
                  </div>
                </div>
              </article>

              <article className="feat-card">
                <h3 style={cardTitle}>Nivel de habilidades</h3>

                <div style={{ marginTop: 18 }}>
                  <SkillBar label="Frontend" value={participant.frontend} />
                  <SkillBar label="Backend" value={participant.backend} />
                  <SkillBar
                    label="Base de datos"
                    value={participant.database_design}
                  />
                  <SkillBar label="Diseño UI" value={participant.ui_design} />
                  <SkillBar
                    label="Documentación"
                    value={participant.documentation}
                  />
                  <SkillBar
                    label="Presentación"
                    value={participant.presentation}
                  />
                  <SkillBar label="Liderazgo" value={participant.leadership} />
                </div>
              </article>
            </div>
          )}
        </div>
      </section>

      {/* EVENTOS */}
      <section
        id="eventos"
        style={{
          background: "#FFFFFF",
          padding: "90px 32px",
          width: "100%",
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            label="Eventos"
            title="Eventos disponibles"
            description="Consulta los eventos académicos registrados en SkillMatch."
            centered
          />

          {events.length === 0 ? (
            <EmptyState
              title="No hay eventos disponibles"
              description="Cuando el administrador registre eventos, aparecerán en esta sección."
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                marginTop: 36,
              }}
            >
              {events.map((event) => {
                const category = event.categories?.[0]

                return (
                  <article key={event.id} className="feat-card">
                    <span className="tag-pill">
                      {category?.name ?? "Sin categoría"}
                    </span>

                    <h3 style={{ ...cardTitle, marginTop: 18 }}>
                      {event.name}
                    </h3>

                    <p style={mutedText}>
                      Fecha: {event.event_date ?? "Sin fecha"}
                    </p>

                    <p style={mutedText}>
                      Modalidad: {event.modality ?? "Sin modalidad"}
                    </p>

                    <p style={mutedText}>
                      Lugar: {event.location ?? "Sin lugar"}
                    </p>

                    <p style={mutedText}>
                      Integrantes por equipo: {event.team_size}
                    </p>

                    {event.description && (
                      <p
                        style={{
                          fontSize: 13,
                          color: "#5A6A85",
                          lineHeight: 1.5,
                          marginTop: 12,
                        }}
                      >
                        {event.description}
                      </p>
                    )}

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 16,
                      }}
                    >
                      {category?.skills?.map((skill) => (
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
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* MI EQUIPO */}
        <section
  id="mi-equipo"
  style={{
    background: "#F7FAFF",
    padding: "90px 32px",
    width: "100%",
    scrollMarginTop: 80,
  }}
>
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <SectionTitle
      label="Mi equipo"
      title="Buscar equipo"
      description="Activa tu disponibilidad y recibe una sugerencia de compañeros compatibles para tu evento."
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: 24,
        marginTop: 36,
      }}
    >
      <article className="feat-card">
        <h3 style={cardTitle}>Estado de búsqueda</h3>

        <p
          style={{
            fontSize: 13,
            color: "#5A6A85",
            lineHeight: 1.6,
            marginTop: 10,
          }}
        >
          Si activas esta opción, SkillMatch usará tu perfil, rol preferido,
          habilidades y evento seleccionado para sugerirte posibles compañeros.
        </p>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 20,
            fontSize: 14,
            fontWeight: 700,
            color: "#050A14",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={lookingForTeam}
            onChange={(event) =>
              handleToggleLookingForTeam(event.target.checked)
            }
          />
          Estoy buscando equipo
        </label>

        <div style={{ marginTop: 22 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 700,
              color: "#050A14",
              marginBottom: 8,
            }}
          >
            Tamaño del equipo
          </label>

          <select
            value={teamSize}
            onChange={(event) => setTeamSize(event.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #E4EAF2",
              outline: "none",
              background: "#FFFFFF",
              color: "#050A14",
            }}
          >
            <option value="2">2 integrantes</option>
            <option value="3">3 integrantes</option>
            <option value="4">4 integrantes</option>
            <option value="5">5 integrantes</option>
            <option value="6">6 integrantes</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSearchTeam}
          disabled={!lookingForTeam || !participant}
          style={{
            marginTop: 24,
            width: "100%",
            border: "none",
            borderRadius: 12,
            background: "#0085FF",
            color: "#FFFFFF",
            padding: "13px 18px",
            fontWeight: 800,
            cursor: !lookingForTeam || !participant ? "not-allowed" : "pointer",
            opacity: !lookingForTeam || !participant ? 0.6 : 1,
          }}
        >
          Buscar equipo sugerido
        </button>
      </article>

      <article className="feat-card">
        <h3 style={cardTitle}>Equipo sugerido</h3>

        {suggestedTeam.length === 0 ? (
          <p
            style={{
              fontSize: 13,
              color: "#5A6A85",
              lineHeight: 1.6,
              marginTop: 12,
            }}
          >
            Aún no hay sugerencias. Activa tu disponibilidad, selecciona el
            tamaño del equipo y presiona “Buscar equipo sugerido”.
          </p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 14,
                marginBottom: 18,
              }}
            >
              <span className="tag-pill">
                {suggestedTeam.length} integrantes
              </span>

              <span className="tag-pill">
                Promedio{" "}
                {(
                  suggestedTeam.reduce(
                    (sum, member) => sum + getParticipantAverage(member),
                    0,
                  ) / suggestedTeam.length
                ).toFixed(1)}
                /5
              </span>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {suggestedTeam.map((member) => (
                <div
                  key={member.id}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    background:
                      member.id === participant?.id
                        ? "rgba(0,133,255,0.08)"
                        : "#F7FAFF",
                    border:
                      member.id === participant?.id
                        ? "1px solid rgba(0,133,255,0.25)"
                        : "1px solid #E4EAF2",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#050A14",
                    }}
                  >
                    {member.full_name}
                    {member.id === participant?.id ? " (Tú)" : ""}
                  </p>

                  <p
                    style={{
                      fontSize: 12,
                      color: "#5A6A85",
                      marginTop: 4,
                    }}
                  >
                    {member.preferred_role} · Promedio{" "}
                    {getParticipantAverage(member)}/5
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    {member.interests?.slice(0, 3).map((interest) => (
                      <span key={interest} className="tag-pill">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCreateSuggestedTeam}
              disabled={creatingTeam || suggestedTeam.length === 0}
              style={{
                marginTop: 20,
                width: "100%",
                border: "none",
                borderRadius: 12,
                background: "#050A14",
                color: "#FFFFFF",
                padding: "13px 18px",
                fontWeight: 800,
                cursor:
                  creatingTeam || suggestedTeam.length === 0
                    ? "not-allowed"
                    : "pointer",
                opacity: creatingTeam || suggestedTeam.length === 0 ? 0.6 : 1,
              }}
            >
              {creatingTeam ? "Enviando invitaciones..." : "Enviar invitaciones"}
            </button>
          </>
        )}
      </article>
    </div>
  </div>
</section>





    </main>
  )
}

type MetricCardProps = {
  value: string
  label: string
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="stat-line">
      <p
        className="font-display"
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#0085FF",
          lineHeight: 1.2,
        }}
      >
        {value}
      </p>

      <p
        style={{
          fontSize: 11,
          color: "#5A6A85",
          marginTop: 3,
        }}
      >
        {label}
      </p>
    </div>
  )
}

type SectionTitleProps = {
  label: string
  title: string
  description: string
  centered?: boolean
}

function SectionTitle({
  label,
  title,
  description,
  centered = false,
}: SectionTitleProps) {
  return (
    <div
      style={{
        textAlign: centered ? "center" : "left",
      }}
    >
      <div
        className="section-label"
        style={{ justifyContent: centered ? "center" : "flex-start" }}
      >
        <span className="dot" />
        {label}
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
        {title}
      </h2>

      <p
        style={{
          color: "#5A6A85",
          fontSize: 15,
          maxWidth: centered ? 560 : 620,
          lineHeight: 1.6,
          margin: centered ? "16px auto 0" : 0,
        }}
      >
        {description}
      </p>
    </div>
  )
}

type InfoRowProps = {
  label: string
  value: string
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div style={infoRowStyle}>
      <span style={infoLabelStyle}>{label}</span>
      <span style={infoValueStyle}>{value}</span>
    </div>
  )
}

type SkillBarProps = {
  label: string
  value: number
}

function SkillBar({ label, value }: SkillBarProps) {
  const safeValue = Number(value ?? 0)
  const percentage = Math.min(Math.max((safeValue / 5) * 100, 0), 100)

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#5A6A85",
          marginBottom: 5,
        }}
      >
        <span>{label}</span>
        <span>{safeValue}/5</span>
      </div>

      <div
        style={{
          height: 6,
          background: "rgba(0,133,255,0.08)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            background: "#0085FF",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}

type EmptyStateProps = {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E4EAF2",
        borderRadius: 24,
        padding: 40,
        marginTop: 36,
        textAlign: "center",
        color: "#5A6A85",
        boxShadow: "0 18px 40px rgba(15,23,42,0.05)",
      }}
    >
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#050A14",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>

      <p style={{ fontSize: 14 }}>{description}</p>
    </div>
  )
}

const cardTitle: CSSProperties = {
  fontSize: 18,
  fontWeight: 800,
  color: "#050A14",
}

const smallTitle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: "#050A14",
  marginBottom: 10,
}

const mutedText: CSSProperties = {
  fontSize: 13,
  color: "#5A6A85",
  marginTop: 8,
}

const infoRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  borderBottom: "1px solid #E4EAF2",
  paddingBottom: 10,
}

const infoLabelStyle: CSSProperties = {
  fontSize: 13,
  color: "#5A6A85",
}

const infoValueStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: "#050A14",
  textAlign: "right",
}

export default UserHome