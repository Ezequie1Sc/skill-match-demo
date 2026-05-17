// pages/Login.tsx

import { Link } from "react-router-dom"
import { useState } from "react"
import StudentNavbar from "../../components/StudentNavBar"
import './StudentHome.css'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { email, password, remember })
  }

  return (
    <div style={{ 
      fontFamily: "'Outfit', sans-serif",
      background: '#FFFFFF',
      color: '#050A14',
      width: '100%',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      
      {/* ─── NAVBAR ────────────────────────────────────────────────── */}
      <StudentNavbar />

      {/* ─── CONTENIDO PRINCIPAL ───────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 32px 40px',
        position: 'relative'
      }}>
        
        {/* ─── BACKGROUND GRID ────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(#E4EAF2 1px, transparent 1px), linear-gradient(90deg, #E4EAF2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.35,
          zIndex: 0
        }} />

        {/* ─── RADIAL LIGHT ───────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,133,255,0.06) 0%, transparent 70%)',
          zIndex: 0
        }} />

        {/* ─── LOGIN CARD ─────────────────────────────────────────── */}
        <div className="noise" style={{
          position: 'relative',
          zIndex: 1,
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '48px 40px',
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 30px 60px -20px rgba(15,23,42,0.15)',
          border: '1px solid rgba(228, 234, 242, 0.5)'
        }}>
          
          {/* ─── LOGO MEDIANO ──────────────────────────────────────── */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <img 
              src="/skill.png" 
              alt="SkillMatch Logo" 
              style={{ 
                height: 200,
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* ─── TÍTULO ────────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 className="font-display" style={{ 
              fontSize: 26, 
              fontWeight: 700, 
              color: '#050A14',
              letterSpacing: '-0.02em',
              marginBottom: 4
            }}>
              Bienvenido de vuelta
            </h1>

            <p style={{ 
              fontSize: 14, 
              color: '#5A6A85',
              lineHeight: 1.5
            }}>
              Inicia sesión para continuar formando equipos inteligentes
            </p>
          </div>

          {/* ─── FORM ──────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            {/* EMAIL */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: 13, 
                fontWeight: 600, 
                color: '#050A14',
                marginBottom: 6
              }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #E4EAF2',
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  color: '#050A14',
                  background: '#F7FAFF',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0085FF'
                  e.target.style.boxShadow = '0 0 0 4px rgba(0,133,255,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E4EAF2'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ 
                  fontSize: 13, 
                  fontWeight: 600, 
                  color: '#050A14'
                }}>
                  Contraseña
                </label>
                <Link 
                  to="/forgot-password"
                  style={{
                    fontSize: 12,
                    color: '#0085FF',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1.5px solid #E4EAF2',
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  color: '#050A14',
                  background: '#F7FAFF',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0085FF'
                  e.target.style.boxShadow = '0 0 0 4px rgba(0,133,255,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E4EAF2'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* REMEMBER ME */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  border: '1.5px solid #E4EAF2',
                  accentColor: '#0085FF',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="remember" style={{ 
                fontSize: 13, 
                color: '#5A6A85',
                cursor: 'pointer'
              }}>
                Recordarme
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: 15,
                marginTop: 4
              }}
            >
              Iniciar sesión
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* DIVIDER */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              margin: '4px 0'
            }}>
              <div style={{ flex: 1, height: 1, background: '#E4EAF2' }} />
              <span style={{ fontSize: 12, color: '#5A6A85' }}>o</span>
              <div style={{ flex: 1, height: 1, background: '#E4EAF2' }} />
            </div>

            {/* SOCIAL LOGIN */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: '1.5px solid #E4EAF2',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, background 0.3s',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  color: '#050A14'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0085FF'
                  e.currentTarget.style.background = 'rgba(0,133,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E4EAF2'
                  e.currentTarget.style.background = '#FFFFFF'
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: '1.5px solid #E4EAF2',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, background 0.3s',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  color: '#050A14'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0085FF'
                  e.currentTarget.style.background = 'rgba(0,133,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E4EAF2'
                  e.currentTarget.style.background = '#FFFFFF'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* SIGN UP LINK */}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#5A6A85' }}>
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/landing/register" 
                  style={{
                    color: '#0085FF',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Regístrate gratis
                </Link>
              </span>
            </div>

          </form>

          {/* ─── FOOTER ─────────────────────────────────────────────── */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid #E4EAF2'
          }}>
            <p style={{ fontSize: 12, color: '#5A6A85' }}>
              Al iniciar sesión, aceptas nuestros{' '}
              <Link to="/terms" style={{ color: '#0085FF', textDecoration: 'none' }}>
                Términos
              </Link>{' '}
              y{' '}
              <Link to="/privacy" style={{ color: '#0085FF', textDecoration: 'none' }}>
                Política de Privacidad
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login