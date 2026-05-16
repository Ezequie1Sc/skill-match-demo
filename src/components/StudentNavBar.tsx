import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

interface NavLink {
  name: string
  href: string
}

const navLinks: NavLink[] = [
  { name: "Inicio", href: "#inicio" },
  { name: "Problema", href: "#problema" },
  { name: "Solución", href: "#solucion" },
  { name: "Comunidad", href: "#comunidad" }
]

function StudentNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para cambiar estilo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú al hacer click en un enlace
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'shadow-lg' : 'shadow-md'
    } bg-[#0085FF]`}>
      
      {/* NAV - MÁS DELGADO */}
      <nav className="h-10 md:h-12 flex items-center px-3 sm:px-4 lg:px-6">
        
        {/* CONTENEDOR PRINCIPAL */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO - Más pequeño */}
          <a href="#inicio" className="flex items-center flex-shrink-0">
            <img 
              src="/skill.png" 
              alt="SkillMatch Logo" 
              className="h-6 sm:h-7 lg:h-8 w-auto object-contain brightness-0 invert"
            />
          </a>

          {/* LINKS - Desktop (visible en md+) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-6 ml-2 lg:ml-3 xl:ml-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="relative text-white font-medium text-[10px] lg:text-xs xl:text-sm hover:text-white/80 transition group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* BOTONES - Desktop (visible en lg+) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            
            {/* LOGIN */}
            <Link 
              to="/login" 
              className="flex items-center gap-1 px-2.5 py-1 lg:px-3 lg:py-1 rounded-md border border-white/40 text-white text-[10px] font-semibold hover:bg-white/10 transition"
            >
              <svg className="h-2.5 w-2.5 lg:h-3 lg:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12H3m0 0l4-4m-4 4l4 4m13-4v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              <span className="hidden sm:inline">Iniciar sesión</span>
              <span className="sm:hidden">Login</span>
            </Link>
            
            {/* REGISTER */}
            <Link 
              to="/landing/register" 
              className="flex items-center gap-1 px-2.5 py-1 lg:px-3 lg:py-1 rounded-md bg-white text-[#0085FF] text-[10px] font-semibold hover:bg-white/90 transition shadow-sm"
            >
              <svg className="h-2.5 w-2.5 lg:h-3 lg:w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0" />
              </svg>
              <span className="hidden sm:inline">Crear cuenta</span>
              <span className="sm:hidden">Registro</span>
            </Link>

          </div>

          {/* BOTONES - Tablet (visible entre md y lg) */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            <Link 
              to="/login" 
              className="px-1.5 py-0.5 rounded-md border border-white/40 text-white text-[9px] font-semibold hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link 
              to="/landing/register" 
              className="px-1.5 py-0.5 rounded-md bg-white text-[#0085FF] text-[9px] font-semibold hover:bg-white/90 transition shadow-sm"
            >
              Registro
            </Link>
          </div>

          {/* BOTÓN MÓVIL - Más pequeño */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-0.5 -mr-0.5 flex flex-col gap-0.5 group"
            aria-label="Toggle menu"
          >
            <div className="w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
            <div className="w-2.5 h-[1.5px] bg-white rounded-full transition-all duration-300 group-hover:w-3.5"></div>
            <div className="w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
          </button>

        </div>
      </nav>

      {/* MENÚ MÓVIL - Barra desplegable hacia la derecha - MÁS COMPACTO */}
      {isMenuOpen && (
        <>
          {/* Overlay oscuro con blur */}
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menú lateral - Más compacto */}
          <div className="md:hidden fixed inset-y-0 right-0 z-50 w-[240px] sm:w-[260px] bg-[#0085FF] shadow-2xl transform transition-all duration-300 ease-out">
            
            {/* Decoración superior */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/20 via-white/60 to-white/20"></div>
            
            {/* Contenido del menú */}
            <div className="h-full flex flex-col p-4 relative overflow-y-auto">
              
              {/* Header con logo y nombre - Más compacto */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                <div className="p-1 bg-white/10 rounded-md">
                  <img 
                    src="/skill.png" 
                    alt="SkillMatch Logo" 
                    className="h-5 w-auto object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <span className="text-white font-bold text-base tracking-tight block">SkillMatch</span>
                  <span className="text-white/50 text-[7px] uppercase tracking-wider">Forma equipos inteligentes</span>
                </div>
              </div>

              {/* Botón de cerrar con diseño circular - Más compacto */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:rotate-90"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Links de navegación - Más compactos */}
              <div className="flex flex-col gap-0.5 mb-3 flex-1">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="group flex items-center gap-2 text-white text-xs font-medium py-1.5 px-2.5 rounded-md hover:bg-white/10 transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="w-0.5 h-0.5 rounded-full bg-white/30 group-hover:bg-white/60 transition-all"></span>
                    {link.name}
                    <span className="ml-auto text-white/20 group-hover:text-white/40 transition-all">
                      <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>

              {/* Botones CTA - Más compactos */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
                <Link 
                  to="/login" 
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 border border-white/30 text-white text-[10px] font-semibold rounded-md hover:bg-white/10 transition-all duration-300 hover:scale-[1.01]"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12H3m0 0l4-4m-4 4l4 4m13-4v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                  </svg>
                  Iniciar sesión
                </Link>

                <Link 
                  to="/landing/register" 
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white text-[#0085FF] text-[10px] font-semibold rounded-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.01] shadow-sm shadow-white/10"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0" />
                  </svg>
                  Crear cuenta gratis
                </Link>
              </div>

              {/* Footer del menú */}
              <div className="mt-2 pt-2 text-center">
                <p className="text-white/30 text-[7px] uppercase tracking-wider">© 2026 SkillMatch</p>
              </div>

            </div>
          </div>
        </>
      )}

    </header>
  )
}

export default StudentNavbar