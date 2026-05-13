type Page = 'home' | 'participants' | 'generator' | 'dashboard'

type NavBarProps = {
  currentPage: Page
  onNavigate: (page: Page) => void
}

function NavBar({ currentPage, onNavigate }: NavBarProps) {
  const linkClass = (page: Page) =>
    currentPage === page
      ? 'text-indigo-600 font-semibold'
      : 'text-slate-700 hover:text-indigo-600'

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-bold text-indigo-600"
        >
          SkillMatch
        </button>

        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={linkClass('home')}
          >
            Inicio
          </button>

          <button
            onClick={() => onNavigate('participants')}
            className={linkClass('participants')}
          >
            Participantes
          </button>

          <button
            onClick={() => onNavigate('generator')}
            className={linkClass('generator')}
          >
            Generador
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={linkClass('dashboard')}
          >
            Dashboard
          </button>
        </div>
      </nav>
    </header>
  )
}

export default NavBar