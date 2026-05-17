import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

interface NavLink {
  name: string
  id: string
}

const navLinks: NavLink[] = [
  { name: "Inicio", id: "inicio" },
  { name: "Problema", id: "problema" },
  { name: "Solución", id: "solucion" },
  { name: "Comunidad", id: "comunidad" }
]

function StudentNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navegación con scroll
  const handleNavClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 120)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }

    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      } bg-[#0085FF]`}
    >
      {/* NAV */}
      <nav className="h-14 flex items-center px-6">
        <div className="w-full max-w-7xl mx-auto flex items-center">

          {/* LOGO */}
          <button 
            onClick={() => handleNavClick("inicio")} 
            className="flex items-center shrink-0"
          >
            <img
              src="/skill.png"
              alt="SkillMatch Logo"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </button>

          {/* 🔥 DERECHA: LINKS + BOTONES */}
          <div className="hidden md:flex items-center ml-auto">

            {/* LINKS */}
            <div className="flex items-center gap-6 mr-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-white font-medium text-sm hover:text-white/80 transition group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* BOTONES */}
            <div className="flex items-center gap-3">

              {/* LOGIN */}
              <Link
                to="/student-side/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4" />
                </svg>
                Iniciar sesión
              </Link>

              {/* REGISTER */}
              <Link
                to="/landing/register"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#0085FF] text-sm font-semibold hover:bg-white/90 transition shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3" />
                </svg>
                Crear cuenta
              </Link>

            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-auto flex flex-col gap-1"
          >
            <div className="w-5 h-[2px] bg-white"></div>
            <div className="w-3 h-[2px] bg-white"></div>
            <div className="w-5 h-[2px] bg-white"></div>
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed right-0 top-0 bottom-0 w-64 bg-[#0085FF] z-50 p-5 flex flex-col">

            {/* LINKS */}
            <div className="flex flex-col gap-5 mt-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="text-white text-base text-left hover:translate-x-1 transition"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* BOTONES */}
            <div className="mt-auto flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 border border-white/30 text-white py-2 rounded"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/landing/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-white text-[#0085FF] py-2 rounded font-semibold"
              >
                Crear cuenta
              </Link>
            </div>

          </div>
        </>
      )}
    </header>
  )
}

export default StudentNavbar