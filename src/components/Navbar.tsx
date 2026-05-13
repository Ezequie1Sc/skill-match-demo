function Navbar(){
    return (
        <header className="border-b border-slate-200 bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <h1 className="text-xl font-bold text-indigo-600">
                SkillMatch
                </h1>

                <div className="flex gap-4 text-sm font-medium text-slate-600">
                <a href="#" className="hover:text-indigo-600">
                    Inicio
                </a>
                <a href="#" className="hover:text-indigo-600">
                    Participantes
                </a>
                <a href="#" className="hover:text-indigo-600">
                    Generador
                </a>
                <a href="#" className="hover:text-indigo-600">
                    Dashboard
                </a>
                </div>
            </nav>
        </header>
        
    )
}

export default Navbar;