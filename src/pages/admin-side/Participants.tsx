

import participantsData from '../../assets/data/participants.json'
import type { Participant } from '../../types/participant_model'

function Participants() {
  const participants = participantsData as Participant[];


  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Participantes
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Perfiles registrados
          </h1>

          <p className="mt-2 text-slate-600">
            Lista de estudiantes con sus roles, carrera e intereses principales.
          </p>
        </div>

        <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Agregar participante
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {participants.map((participant) => (
          <article
            key={participant.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-slate-900">
              {participant.fullName}
            </h2>

            <p className="mt-1 text-sm font-medium text-indigo-600">
              {participant.preferredRole}
            </p>

            <p className="mt-3 text-sm text-slate-600">
              {participant.career}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {participant.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Participants
