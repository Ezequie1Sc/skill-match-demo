import { useEffect, useState } from 'react'
import { supabase } from './database/SupabaseClient'

type Category = {
  id: number
  name: string
  description: string | null
  skills: string[]
}

function TestSupabase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')

      if (error) {
        console.error(error)
        setErrorMessage(error.message)
        return
      }

      setCategories(data ?? [])
    }

    loadCategories()
  }, [])

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-600">
          Prueba Supabase
        </h1>

        {errorMessage && (
          <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-600">
            Error: {errorMessage}
          </p>
        )}

        <div className="mt-6 grid gap-4">
          {categories.map((category) => (
            <article
              key={category.id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <h2 className="font-bold text-slate-900">
                {category.name}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {category.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default TestSupabase