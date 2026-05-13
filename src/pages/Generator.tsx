function Generator() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        Generador
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Generar equipos equilibrados
      </h1>

      <p className="mt-2 max-w-3xl text-slate-600">
        Configura el tamaño de los equipos y genera una propuesta de distribución
        basada en habilidades técnicas, creativas, de gestión y comunicación.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Configuración
          </h2>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-slate-700">
              Integrantes por equipo
            </span>

            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option>3 integrantes</option>
              <option>4 integrantes</option>
              <option>5 integrantes</option>
              <option>6 integrantes</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-slate-700">
              Estrategia de balance
            </span>

            <select className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option>Balance general</option>
              <option>Priorizar habilidades técnicas</option>
              <option>Priorizar comunicación</option>
              <option>Priorizar liderazgo</option>
            </select>
          </label>

          <button className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Generar equipos
          </button>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Resultado preliminar
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Equipo 1</h3>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  86%
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Ahsly — Frontend</li>
                <li>Carlos — Backend</li>
                <li>María — Documentación</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Equipo 2</h3>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  82%
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Luis — Base de datos</li>
                <li>Sofía — Diseño UI</li>
                <li>Pedro — Liderazgo</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Generator