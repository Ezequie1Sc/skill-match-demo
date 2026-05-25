// pages/StudentHome.tsx
// Redesigned — Modern Electric Blue - FULL WIDTH

import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import './StudentHome.css'

const carouselUsers = [
  {
    name: "Sofía Ramírez",
    role: "Frontend Developer",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    rating: "4.9",
    desc: "Especialista en interfaces modernas y experiencia de usuario.",
    tags: ["React", "UI", "UX"]
  },
  {
    name: "Daniel Torres",
    role: "Backend Developer",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    rating: "4.8",
    desc: "Apasionado por arquitecturas escalables y APIs.",
    tags: ["Node", "API", "SQL"]
  },
  {
    name: "Valeria Cruz",
    role: "Data Analyst",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400",
    rating: "5.0",
    desc: "Transforma datos en decisiones inteligentes.",
    tags: ["Python", "Data", "ML"]
  },
  {
    name: "Luis Herrera",
    role: "Mobile Dev",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    rating: "4.7",
    desc: "Desarrollo de apps rápidas y eficientes.",
    tags: ["Flutter", "iOS", "Android"]
  },
  {
    name: "Camila Ortega",
    role: "UX Designer",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    rating: "4.9",
    desc: "Diseña experiencias centradas en el usuario.",
    tags: ["Figma", "UX", "Research"]
  },
  {
    name: "Jorge Méndez",
    role: "DevOps",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400",
    rating: "4.8",
    desc: "Automatización y despliegues eficientes.",
    tags: ["Docker", "CI/CD", "AWS"]
  },
  {
    name: "Andrea López",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
    rating: "5.0",
    desc: "Gestión ágil de equipos y proyectos.",
    tags: ["Scrum", "Agile", "Leadership"]
  }
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const metrics = [
  { value: "0", label: "Usuarios activos" },
  { value: "0%", label: "Efectividad" },
  { value: "0", label: "Equipos creados" },
  { value: "0", label: "Satisfacción" },
]

const problems = [
  {
    num: "01",
    title: "Equipos por amistad,\nno por habilidades",
    desc: "Se priorizan relaciones personales sobre competencias técnicas y la complementariedad real de perfiles.",
  },
  {
    num: "02",
    title: "Distribución\ndesigual de tareas",
    desc: "Algunos miembros sobrecargados mientras otros tienen poca participación activa en el proyecto.",
  },
  {
    num: "03",
    title: "Pérdida de tiempo\ny baja eficiencia",
    desc: "Reuniones improductivas, retrasos constantes y falta de claridad en los objetivos del equipo.",
  },
]

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Distribución inteligente",
    desc: "Analizamos habilidades para asignar tareas de manera óptima, maximizando el potencial de cada miembro.",
    stat: "94%", statLabel: "Efectividad"
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Equipos balanceados",
    desc: "Grupos con perfiles complementarios que potencian el trabajo colaborativo y el máximo rendimiento.",
    stat: "97%", statLabel: "Balance óptimo"
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Mayor eficiencia",
    desc: "Reducimos el tiempo de organización en un 75% y aumentamos la productividad general del equipo.",
    stat: "75%", statLabel: "Ahorro de tiempo"
  },
]

function StudentHome() {
  const [carIdx, setCarIdx] = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)
  const autoPlayRef = useRef<number | null>(null)
  const hero = useInView(0.01)
  const problemSection = useInView()
  const solutionSection = useInView()
  const communitySection = useInView()
  const ctaSection = useInView()

  // Auto-play del carrusel
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCarIdx(prev => {
          const maxIndex = carouselUsers.length - 3
          return prev >= maxIndex ? 0 : prev + 1
        })
      }, 3000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [])

  // Resetear auto-play cuando se hace clic manual
  const handlePrev = () => {
    setCarIdx(i => Math.max(0, i - 1))
    resetAutoPlay()
  }

  const handleNext = () => {
    setCarIdx(i => Math.min(carouselUsers.length - 3, i + 1))
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      setCarIdx(prev => {
        const maxIndex = carouselUsers.length - 3
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 3000)
  }

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ 
      fontFamily: "'Outfit', sans-serif",
      background: '#FFFFFF',
      color: '#050A14',
      width: '100%',
      margin: 0,
      padding: 0
    }}>

     {/* ─── HERO ───────────────────────────────────────────────────── */}
<section
  id="inicio"
  ref={hero.ref}
  style={{ 
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#FFFFFF',
    paddingTop: 80,
    paddingBottom: 0,
    width: '100%',
    overflow: 'hidden'
  }}
>
  {/* GRID BACKGROUND */}
  <div style={{
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'linear-gradient(#E4EAF2 1px, transparent 1px), linear-gradient(90deg, #E4EAF2 1px, transparent 1px)',
    backgroundSize: '64px 64px',
    opacity: 0.35,
  }} />

  {/* RADIAL LIGHT */}
  <div style={{
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,133,255,0.06) 0%, transparent 70%)'
  }} />

  <div className="hero-content-grid" style={{ 
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 32px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 60,
    alignItems: 'center'
  }}>

    {/* TEXTO */}
    <div style={{ textAlign: 'left' }}>
      <div className={`section-label hero-title hero-title-d1 ${heroVisible ? 'show' : ''}`}>
        <span className="dot" />
        Plataforma de matching inteligente
      </div>

      <h1 className="font-display" style={{ 
  fontSize: 'clamp(38px, 4vw, 56px)', 
  lineHeight: 1.05, 
  letterSpacing: '-0.03em', 
  color: '#050A14', 
  marginBottom: 8 
}}>
  <span className={`block hero-title hero-title-d2 ${heroVisible ? 'show' : ''}`}>
    Forma equipos
  </span>
  <span className={`block hero-title hero-title-d3 ${heroVisible ? 'show' : ''}`} style={{ color: '#0085FF' }}>
    inteligentes
  </span>
  <span className={`block hero-title hero-title-d4 ${heroVisible ? 'show' : ''}`} style={{ 
    fontSize: 18, 
    fontFamily: "'Outfit', sans-serif", 
    fontWeight: 400, 
    color: '#5A6A85', 
    marginTop: 12,
    letterSpacing: '0.02em'
  }}>
    y deja de trabajar al azar
  </span>
</h1>
      <p className={`hero-title hero-title-d5 ${heroVisible ? 'show' : ''}`} style={{ 
        fontSize: 15, 
        color: '#5A6A85', 
        maxWidth: 400, 
        lineHeight: 1.65, 
        marginTop: 16 
      }}>
        Analizamos habilidades, intereses y roles para crear equipos equilibrados automáticamente.
      </p>

      {/* BOTONES */}
      <div className={`hero-title hero-title-d6 ${heroVisible ? 'show' : ''}`} style={{ 
        display: 'flex', 
        gap: 10, 
        marginTop: 28, 
        flexWrap: 'wrap' 
      }}>
        <Link to="/landing/register" className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0" />
          </svg>
          Crear cuenta gratis
        </Link>
          <Link to="/login" className="btn-ghost">          Iniciar sesión
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
      </div>

      {/* FEATURES */}
      <div className={`hero-title hero-title-d6 ${heroVisible ? 'show' : ''}`} style={{ 
        display: 'flex', 
        gap: 16, 
        marginTop: 20, 
        flexWrap: 'wrap' 
      }}>
        {["Sin tarjeta de crédito", "Menos de 1 minuto"].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#5A6A85' }}>
            <svg className="w-4 h-4" style={{ color: '#22C55E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {t}
          </div>
        ))}
      </div>

      {/* METRICS */}
      <div className="metrics-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 16, 
        marginTop: 36, 
        paddingTop: 28, 
        borderTop: '1px solid #E4EAF2' 
      }}>
        {metrics.map((m, i) => (
          <div key={i} className="stat-line">
            <div className={`hero-title hero-title-d${Math.min(i + 3, 6)} ${heroVisible ? 'show' : ''}`}>
              <p className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#0085FF' }}>
                {m.value}
              </p>
              <p style={{ fontSize: 11, color: '#5A6A85', marginTop: 3 }}>
                {m.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* IMAGEN */}
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="noise" style={{ 
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        height: 440,
        boxShadow: '0 30px 60px -20px rgba(15,23,42,0.15)',
        width: '100%',
        maxWidth: 500
      }}>
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center 35%' 
          }}
        />

        <div style={{ 
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)'
        }} />

        <div style={{ position: 'absolute', bottom: 20, left: 20, color: '#fff' }}>
          <p style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Plataforma activa
          </p>
          <p className="font-display" style={{ fontSize: 20, fontWeight: 600 }}>
            +2,500 profesionales
          </p>
        </div>
      </div>
    </div>

  </div>

  {/* TICKER */}
  <div className="ticker-wrap" style={{ 
    borderTop: '1px solid rgba(255,255,255,0.2)', 
    borderBottom: '1px solid rgba(255,255,255,0.2)', 
    padding: '14px 0', 
    background: '#0085FF',
    width: '100%'
  }}>
    <div className="ticker-track">
      {[...Array(2)].map((_, r) =>
        ["Matching inteligente", "94% efectividad", "Equipos balanceados", "+2,500 usuarios", "Cero fricciones", "98% satisfacción", "Resultados reales"].map((t, i) => (
          <span key={`${r}-${i}`} style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: '#FFFFFF',
            letterSpacing: '0.08em', 
            textTransform: 'uppercase', 
            display: 'inline-block',
            marginRight: 56
          }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', marginRight: 56, fontSize: 16 }}>✦</span>{t}
          </span>
        ))
      )}
    </div>
  </div>
</section>

{/* ─── PROBLEMA ───────────────────────────────────────────────── */}
<section id="problema" style={{ 
  background: '#F7FAFF', 
  padding: '80px 32px',
  width: '100%'
}}>
  <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }} ref={problemSection.ref}>
    
    {/* HEADER */}
    <div className={`reveal ${problemSection.inView ? 'visible' : ''}`}>
      <div className="section-label">
        <span className="dot" />El problema
      </div>

      <div 
        className="section-content-grid"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 32, 
          alignItems: 'flex-end', 
          marginBottom: 48 
        }}
      >
        <h2 className="font-display" style={{ 
          fontSize: 'clamp(28px, 3vw, 40px)', 
          lineHeight: 1.1, 
          letterSpacing: '-0.03em', 
          color: '#050A14' 
        }}>
          ¿Cómo se forman<br />
          los equipos <span style={{ color: '#0085FF' }}>hoy</span>?
        </h2>

        <p style={{ 
          fontSize: 15, 
          color: '#5A6A85', 
          lineHeight: 1.6, 
          maxWidth: 380 
        }}>
          La mayoría todavía forma equipos basándose en amistades o decisiones rápidas, generando desequilibrios.
        </p>
      </div>
    </div>

    {/* CONTENIDO */}
    <div 
      className="section-content-grid"
      style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 40, 
        alignItems: 'center' 
      }}
    >

      {/* IMAGEN CUADRADA LIMPIA */}
      <div className={`reveal reveal-d1 ${problemSection.inView ? 'visible' : ''}`} style={{ position: 'relative' }}>
        <div className="noise" style={{ 
          borderRadius: 20,
          overflow: 'hidden',
          aspectRatio: '1 / 1',
          boxShadow: '0 24px 48px -16px rgba(15,23,42,0.12)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800"
            alt="Equipo colaborando desorganizado" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain'
            }}
          />

          <div style={{ 
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,133,255,0.08) 0%, transparent 60%)'
          }} />
        </div>

        <div style={{ 
          position: 'absolute', 
          bottom: -16, 
          right: -16, 
          width: 100, 
          height: 100, 
          borderRadius: 20, 
          background: 'rgba(0,133,255,0.08)', 
          zIndex: -1 
        }} />
      </div>

      {/* PROBLEMAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {problems.map((p, i) => (
          <div
            key={i}
            className={`prob-card reveal reveal-d${i + 2} ${problemSection.inView ? 'visible' : ''}`}
          >
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              
              <span 
                className="font-display" 
                style={{ 
                  fontSize: 28, 
                  fontWeight: 800, 
                  color: '#0085FF',
                  lineHeight: 1, 
                  flexShrink: 0 
                }}
              >
                {p.num}
              </span>

              <div>
                <h3 style={{ 
                  fontSize: 15, 
                  fontWeight: 600, 
                  color: '#050A14', 
                  marginBottom: 6, 
                  whiteSpace: 'pre-line', 
                  lineHeight: 1.3 
                }}>
                  {p.title}
                </h3>

                <p style={{ 
                  fontSize: 13, 
                  color: '#5A6A85', 
                  lineHeight: 1.55 
                }}>
                  {p.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

      <hr className="thin-rule" />
{/* ─── SOLUCIÓN ───────────────────────────────────────────────── */}
<section id="solucion" style={{ 
  background: '#FFFFFF', 
  padding: '80px 32px',
  width: '100%'
}}>
  <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }} ref={solutionSection.ref}>
    
    {/* HEADER */}
    <div className={`reveal ${solutionSection.inView ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 48 }}>
      <div className="section-label" style={{ justifyContent: 'center' }}>
        <span className="dot" />La solución
      </div>

      <h2 className="font-display" style={{ 
        fontSize: 'clamp(28px, 3vw, 40px)', 
        lineHeight: 1.1, 
        letterSpacing: '-0.03em', 
        color: '#050A14' 
      }}>
        SkillMatch cambia la forma<br />
        <span style={{ color: '#0085FF' }}>de trabajar juntos</span>
      </h2>

      <p style={{ 
        fontSize: 15, 
        color: '#5A6A85', 
        maxWidth: 420, 
        margin: '16px auto 0', 
        lineHeight: 1.6 
      }}>
        Analizamos perfiles para crear equipos equilibrados automáticamente, en segundos.
      </p>
    </div>
<div className={`reveal reveal-d1 ${solutionSection.inView ? 'visible' : ''}`} style={{ 
  borderRadius: 20,
  overflow: 'hidden',
  marginBottom: 48,
  boxShadow: '0 24px 48px -16px rgba(15,23,42,0.1)',
  position: 'relative',
  height: 220,
  background: '#0f172a'
}}>
  <img 
    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600"
    alt="Equipo colaborando" 
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover' 
    }}
  />

  {/* overlay */}
  <div style={{ 
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, rgba(15,23,42,0.6) 0%, transparent 60%)'
  }} />

  {/* texto */}
  <div style={{ 
    position: 'absolute', 
    left: 32, 
    top: '50%', 
    transform: 'translateY(-50%)', 
    color: '#fff' 
  }}>
    <p style={{ 
      fontSize: 10, 
      opacity: 0.7, 
      letterSpacing: '0.1em', 
      textTransform: 'uppercase', 
      marginBottom: 6 
    }}>
      SkillMatch en acción
    </p>

    <p className="font-display" style={{ 
      fontSize: 'clamp(18px, 2vw, 24px)', 
      fontWeight: 600, 
      lineHeight: 1.2 
    }}>
      Equipos colaborando<br />en tiempo real
    </p>
  </div>
</div>

    {/* FEATURES */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
      {features.map((f, i) => (
        <div key={i} className={`feat-card reveal reveal-d${i + 2} ${solutionSection.inView ? 'visible' : ''}`}>
          
          <div style={{ 
            width: 40, height: 40, borderRadius: 12, 
            background: 'rgba(0,133,255,0.08)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: '#0085FF', marginBottom: 20 
          }}>
            {f.icon}
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#050A14', marginBottom: 8 }}>
            {f.title}
          </h3>

          <p style={{ fontSize: 13, color: '#5A6A85', lineHeight: 1.6, marginBottom: 20 }}>
            {f.desc}
          </p>

          <div style={{ borderTop: '1px solid #E4EAF2', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: '#5A6A85' }}>{f.statLabel}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#0085FF' }}>{f.stat}</span>
            </div>

            <div style={{ height: 3, background: 'rgba(0,133,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div 
                className={solutionSection.inView ? 'bar-fill' : ''} 
                style={{ 
                  height: '100%', 
                  background: '#0085FF', 
                  borderRadius: 3, 
                  width: f.stat, 
                  animationDelay: `${0.3 + i * 0.15}s` 
                }} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* STATS AZUL */}
    <div className={`reveal reveal-d5 ${solutionSection.inView ? 'visible' : ''}`} style={{ 
      background: '#0085FF',
      borderRadius: 16,
      padding: '28px 36px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }}>
      {[
        { label: "Ahorro de tiempo", value: "−3 horas semanales" },
        { label: "Productividad", value: "+156% entregas" },
        { label: "Satisfacción", value: "98% lo recomiendan" },
      ].map((item, i) => (
        <div key={i} style={{ borderLeft: i ? '1px solid rgba(255,255,255,0.2)' : 'none', paddingLeft: i ? 24 : 0 }}>
          <p style={{ 
            fontSize: 10, 
            color: 'rgba(255,255,255,0.7)', 
            letterSpacing: '0.06em', 
            textTransform: 'uppercase', 
            marginBottom: 6 
          }}>
            {item.label}
          </p>

          <p className="font-display" style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className={`reveal reveal-d5 ${solutionSection.inView ? 'visible' : ''}`} style={{ textAlign: 'center', marginTop: 36 }}>
      <Link to="/landing/register" className="btn-primary">
        Comienza a formar equipos inteligentes
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>

  </div>
</section>

  <hr className="thin-rule" />

  {/* ─── COMUNIDAD ─────────────────────────────────────────────── */}
  


  {/* ─── CTA FINAL ─────────────────────────────────────────────── */}
  <section ref={ctaSection.ref} style={{ 
    position: 'relative',
    padding: '80px 32px',
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%'
  }}>

  {/* 🖼️ IMAGEN DE FONDO */}
  <div style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0
  }} />

  {/* 🔵 OVERLAY AZUL */}
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(0,133,255,0.92) 0%, rgba(0,102,204,0.9) 50%, rgba(0,82,163,0.92) 100%)',
    zIndex: 1
  }} />

  {/* 💡 LUCES DECORATIVAS */}
  <div style={{ 
    position: 'absolute', 
    top: -80, 
    left: -80, 
    width: 300, 
    height: 300, 
    borderRadius: '50%', 
    background: 'rgba(255,255,255,0.08)', 
    filter: 'blur(60px)', 
    pointerEvents: 'none',
    zIndex: 2
  }} />

  <div style={{ 
    position: 'absolute', 
    bottom: -60, 
    right: -60, 
    width: 250, 
    height: 250, 
    borderRadius: '50%', 
    background: 'rgba(255,255,255,0.06)', 
    filter: 'blur(50px)', 
    pointerEvents: 'none',
    zIndex: 2
  }} />

  {/* CONTENIDO */}
  <div className={`reveal ${ctaSection.inView ? 'visible' : ''}`} style={{ 
    position: 'relative', 
    zIndex: 3, 
    maxWidth: 600, 
    margin: '0 auto' 
  }}>

    {/* BADGE */}
    <div style={{ 
      display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'center',
      padding: '6px 16px', borderRadius: 99,
      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)', marginBottom: 24
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block', animation: 'pulse 2s infinite' }} />
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
        Empieza hoy
      </span>
    </div>

    {/* TITLE */}
    <h2 className="font-display" style={{ 
      fontSize: 'clamp(32px, 4vw, 52px)', 
      fontWeight: 800, 
      color: '#fff', 
      lineHeight: 1.05, 
      letterSpacing: '-0.03em', 
      marginBottom: 16 
    }}>
      Tu próximo gran equipo<br />
      <span style={{ color: '#B3DFFF' }}>empieza aquí</span>
    </h2>
    
    {/* DESC */}
    <p style={{ 
      fontSize: 16, 
      color: 'rgba(255,255,255,0.85)', 
      maxWidth: 400, 
      margin: '0 auto 32px', 
      lineHeight: 1.55 
    }}>
      Crea tu perfil en menos de un minuto y descubre el poder del matching inteligente.
    </p>

    {/* BOTONES */}
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link to="/landing/register" style={{
        background: '#fff', color: '#0085FF', borderRadius: 12,
        padding: '14px 32px', fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8,
        textDecoration: 'none', boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      }}>
        Crear cuenta gratis
      </Link>
      
      <Link to="/login" style={{
        border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff',
        borderRadius: 12, padding: '13px 28px', fontWeight: 600, fontSize: 15,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        textDecoration: 'none',
        background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)',
      }}>
        Ya tengo cuenta
      </Link>
    </div>

  </div>
</section>

    </div>
  )
}

export default StudentHome