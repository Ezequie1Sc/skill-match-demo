function Home() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        SkillMatch
      </p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
        Formación inteligente de equipos
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Plataforma diseñada para analizar habilidades, roles e intereses de los
        participantes y generar equipos de trabajo equilibrados para proyectos
        académicos, hackathones o eventos de innovación.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Generar equipos
        </button>

        <button className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
          Ver participantes
        </button>
      </div>
    </section>
  )
}

export default Home