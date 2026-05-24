import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import StudentNavbar from "../../components/StudentNavBar"
import { getParticipantByID } from "../../services/participantsService"
import "./StudentHome.css"

function Login() {
  const [participantId, setParticipantId] = useState("")
  const [remember, setRemember] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setLoading(true)
      setErrorMessage("")

      const participant = await getParticipantByID(Number(participantId))

      if (!participant) {
        setErrorMessage("No se encontró un participante con ese ID.")
        return
      }

      localStorage.setItem("currentParticipantId", String(participant.id))

      if (remember) {
        localStorage.setItem("rememberParticipant", "true")
      } else {
        localStorage.removeItem("rememberParticipant")
      }

      navigate("/user/home")
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setErrorMessage("No se pudo iniciar sesión. Revisa el ID ingresado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StudentNavbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#F7FAFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px 60px",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: 1100,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* LADO IZQUIERDO */}
          <div>
            <div className="section-label">
              <span className="dot" />
              Acceso de participante
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: "clamp(38px, 4vw, 58px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#050A14",
                marginTop: 18,
                marginBottom: 16,
              }}
            >
              Entra a tu panel
              <br />
              <span style={{ color: "#0085FF" }}>
                SkillMatch
              </span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "#5A6A85",
                maxWidth: 430,
                lineHeight: 1.65,
              }}
            >
              Ingresa tu ID de participante para consultar tu perfil,
              eventos disponibles y el estado de tu equipo asignado.
            </p>

            <div
              style={{
                marginTop: 32,
                display: "grid",
                gap: 14,
              }}
            >
              {[
                "Consulta tu perfil registrado",
                "Revisa eventos disponibles",
                "Conoce tu equipo asignado",
              ].map((text) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#5A6A85",
                    fontSize: 14,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "rgba(0,133,255,0.1)",
                      color: "#0085FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 12,
                    }}
                  >
                    ✓
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* TARJETA LOGIN */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 28,
              padding: 34,
              border: "1px solid #E4EAF2",
              boxShadow: "0 28px 60px rgba(15,23,42,0.10)",
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 18,
                background: "rgba(0,133,255,0.08)",
                color: "#0085FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 22,
              }}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15 7a3 3 0 11-6 0 3 3 0 016 0zM4 21a8 8 0 1116 0H4z"
                />
              </svg>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#050A14",
                marginBottom: 8,
              }}
            >
              Iniciar sesión
            </h2>

            <p
              style={{
                fontSize: 14,
                color: "#5A6A85",
                lineHeight: 1.55,
                marginBottom: 24,
              }}
            >
              Usa el ID que se generó al registrarte en la plataforma.
            </p>

            {errorMessage && (
              <p
                style={{
                  marginBottom: 16,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "#FEF2F2",
                  color: "#DC2626",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#050A14",
                  marginBottom: 8,
                }}
              >
                ID de participante
              </label>

              <input
                type="number"
                value={participantId}
                onChange={(event) => setParticipantId(event.target.value)}
                placeholder="Ej. 1"
                required
                min="1"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 12,
                  border: "1.5px solid #E4EAF2",
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  color: "#050A14",
                  background: "#F7FAFF",
                  outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onFocus={(event) => {
                  event.target.style.borderColor = "#0085FF"
                  event.target.style.boxShadow =
                    "0 0 0 4px rgba(0,133,255,0.08)"
                }}
                onBlur={(event) => {
                  event.target.style.borderColor = "#E4EAF2"
                  event.target.style.boxShadow = "none"
                }}
              />

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "#5A6A85",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                  />
                  Recordar participante
                </label>

                <Link
                  to="/landing/register"
                  style={{
                    fontSize: 13,
                    color: "#0085FF",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Crear perfil
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px",
                  fontSize: 15,
                  marginTop: 24,
                  border: "none",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Entrando..." : "Entrar a mi panel"}

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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>

            <div
              style={{
                marginTop: 24,
                paddingTop: 18,
                borderTop: "1px solid #E4EAF2",
                textAlign: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  fontSize: 13,
                  color: "#5A6A85",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login