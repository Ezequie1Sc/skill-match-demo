import { supabase } from "../database/supabaseClient"

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true"

export type Category = {
  id: number
  name: string | null
  description: string | null
  skills: string[]
  created_at: string
}

export type CreateCategoryData = {
  name: string | null
  description: string | null
  skills: string[]
  created_at: string
}

const demoCategories: Category[] = [
  {
    id: 1,
    name: "Desarrollo Web",
    description: "Proyectos enfocados en frontend, backend y bases de datos.",
    skills: ["Frontend", "Backend", "UI Design", "Database"],
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Aplicaciones Móviles",
    description: "Equipos para desarrollo de apps móviles.",
    skills: ["Mobile", "UI Design", "Documentation", "Presentation"],
    created_at: new Date().toISOString(),
  },
]

export async function getCategories(): Promise<Category[]> {
  if (DEMO_MODE) return demoCategories

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true })

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function createCategory(category: CreateCategoryData): Promise<void> {
  if (DEMO_MODE) return

  const { error } = await supabase.from("categories").insert(category)

  if (error) throw new Error(error.message)
}