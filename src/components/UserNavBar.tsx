import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

interface NavLink {
  name: string
  id: string
}

const navLinks: NavLink[] = [
  { name: "Inicio", id: "user-inicio" },
  { name: "Mi perfil", id: "mi-perfil" },
  { name: "Eventos", id: "eventos" },
  { name: "Mi equipo", id: "mi-equipo" },
]

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    if (location.pathname !== "/user/home") {
      navigate("/user/home")

      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 120)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("currentParticipantId")
    localStorage.removeItem("rememberParticipant")
    setIsMenuOpen(false)
    navigate("/login")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      } bg-[#0085FF]`}
    >
      <nav className="h-18 flex items-center px-6">
        <div className="w-full max-w-7xl mx-auto flex items-center">
          <button
            onClick={() => handleNavClick("user-inicio")}
            className="flex items-center shrink-0"
          >
            <img
              src="/skillmatch.svg"
              alt="SkillMatch Logo"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
          </button>

          <div className="hidden md:flex items-center ml-auto">
            <div className="flex items-center gap-6 mr-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-white font-medium text-sm hover:text-white/80 transition group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* 
              <Link
                to="/landing-page"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                Landing
              </Link>
              */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#0085FF] text-sm font-semibold hover:bg-white/90 transition shadow-sm"
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
                    d="M15 12H3m0 0l4-4m-4 4l4 4m7-9h4a2 2 0 012 2v10a2 2 0 01-2 2h-4"
                  />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-auto flex flex-col gap-1"
          >
            <div className="w-5 h-[2px] bg-white" />
            <div className="w-3 h-[2px] bg-white" />
            <div className="w-5 h-[2px] bg-white" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed right-0 top-0 bottom-0 w-64 bg-[#0085FF] z-50 p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <img
                src="/skillmatch.svg"
                alt="SkillMatch Logo"
                className="h-16 w-auto object-contain brightness-0 invert"
              />

              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

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

            <div className="mt-auto flex flex-col gap-3">
              <Link
                to="/landing-page"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 border border-white/30 text-white py-2 rounded"
              >
                Landing
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-white text-[#0085FF] py-2 rounded font-semibold"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default UserNavbar