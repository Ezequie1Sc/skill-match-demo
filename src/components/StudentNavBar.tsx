import { NavLink } from 'react-router-dom'

function StudentNavbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-indigo-600 font-semibold'
      : 'text-slate-600 hover:text-indigo-600'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/student" className="text-xl font-bold text-indigo-600">
          SkillMatch
        </NavLink>

        <div className="flex gap-4 text-sm font-medium">
          <NavLink to="/student" end className={linkClass}>
            Inicio
          </NavLink>

          <NavLink to="/registro" className={linkClass}>
            Registro
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default StudentNavbar