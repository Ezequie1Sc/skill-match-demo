function Dashboard() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        Dashboard
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Métricas generales
      </h1>

      <p className="mt-2 text-slate-600">
        Visualización rápida del estado de los participantes, habilidades y
        equipos generados.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Participantes</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">24</h2>
          <p className="mt-2 text-sm text-slate-600">Perfiles registrados</p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Equipos</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">6</h2>
          <p className="mt-2 text-sm text-slate-600">Equipos sugeridos</p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Balance promedio</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">84%</h2>
          <p className="mt-2 text-sm text-slate-600">Equilibrio general</p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Área fuerte</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Frontend</h2>
          <p className="mt-2 text-sm text-slate-600">Habilidad dominante</p>
        </article>
      </div>

      <article className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Resumen de habilidades
        </h2>

        <div className="mt-6 space-y-4">
          {[
            ['Frontend', 85],
            ['Backend', 72],
            ['Base de datos', 68],
            ['Diseño UI', 76],
            ['Documentación', 80],
            ['Presentación', 74],
          ].map(([skill, value]) => (
            <div key={skill}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{skill}</span>
                <span className="text-slate-500">{value}%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-indigo-600"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default Dashboard