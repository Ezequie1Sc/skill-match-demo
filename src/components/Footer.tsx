// components/Footer.tsx
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-[#0085FF] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/skill.png" alt="SkillMatch" className="h-8 w-auto brightness-0 invert" />
              <span className="font-display font-bold text-xl">SkillMatch</span>
            </div>
            <p className="text-white/70 text-sm max-w-xs">
              Forma equipos inteligentes con matching basado en habilidades.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              Navegación
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-white/70 hover:text-white text-sm transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#problema" className="text-white/70 hover:text-white text-sm transition">
                  Problema
                </a>
              </li>
              <li>
                <a href="#solucion" className="text-white/70 hover:text-white text-sm transition">
                  Solución
                </a>
              </li>
              <li>
                <a href="#comunidad" className="text-white/70 hover:text-white text-sm transition">
                  Comunidad
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-white/70 hover:text-white text-sm transition">
                  Términos
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 hover:text-white text-sm transition">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@skillmatch.com
                </span>
              </li>
              <li className="text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Mérida, Yucatán
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} SkillMatch. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}