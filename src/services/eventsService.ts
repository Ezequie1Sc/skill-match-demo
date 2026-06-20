import { supabase } from "../database/supabaseClient"

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true"

export type EventOption = {
  id: number
  name: string
}

export type EventData = {
  id: number
  name: string
  category_id: number | null
  description: string | null
  event_date: string | null
  modality: string | null
  location: string | null
  team_size: number
  status: string
  created_at: string | null

  categories?: {
    id: number
    name: string
    description?: string | null
    skills: string[]
  }[] | null
}

export type CreateEventData = {
  name: string
  category_id: number | null
  description: string
  event_date: string
  modality: string
  location: string
  team_size: number
  status: string
}

const demoEvents: EventData[] = [
  {
    id: 1,
    name: "Hackathon Web 2026",
    category_id: 1,
    description: "Evento demo para formar equipos de desarrollo web.",
    event_date: "2026-08-15",
    modality: "Presencial",
    location: "Campeche, México",
    team_size: 4,
    status: "Activo",
    created_at: new Date().toISOString(),
    categories: [
      {
        id: 1,
        name: "Desarrollo Web",
        description: "Frontend, backend y bases de datos.",
        skills: ["Frontend", "Backend", "Database"],
      },
    ],
  },
  {
    id: 2,
    name: "Reto Mobile UX",
    category_id: 2,
    description: "Evento demo para crear soluciones móviles.",
    event_date: "2026-09-10",
    modality: "Remoto",
    location: "Online",
    team_size: 3,
    status: "Activo",
    created_at: new Date().toISOString(),
    categories: [
      {
        id: 2,
        name: "Aplicaciones Móviles",
        description: "Apps móviles y experiencia de usuario.",
        skills: ["Mobile", "UI Design", "Presentation"],
      },
    ],
  },
]

export async function getEventOptions(): Promise<EventOption[]> {
  if (DEMO_MODE) {
    return demoEvents.map((event) => ({
      id: event.id,
      name: event.name,
    }))
  }

  const { data, error } = await supabase
    .from("events")
    .select("id, name")
    .order("id", { ascending: true })

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function getEvents(): Promise<EventData[]> {
  if (DEMO_MODE) return demoEvents

  const { data, error } = await supabase
    .from("events")
    .select(`
      id,
      name,
      category_id,
      description,
      event_date,
      modality,
      location,
      team_size,
      status,
      created_at,
      categories (
        id,
        name,
        description,
        skills
      )
    `)
    .order("id", { ascending: true })

  if (error) throw new Error(error.message)

  return (data ?? []) as EventData[]
}

export async function getEventById(id: number): Promise<EventData | null> {
  if (DEMO_MODE) {
    return demoEvents.find((event) => event.id === id) ?? null
  }

  const { data, error } = await supabase
    .from("events")
    .select(`
      id,
      name,
      category_id,
      description,
      event_date,
      modality,
      location,
      team_size,
      status,
      created_at,
      categories (
        id,
        name,
        description,
        skills
      )
    `)
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)

  return data as EventData
}

export async function createEvent(event: CreateEventData): Promise<void> {
  if (DEMO_MODE) return

  const { error } = await supabase.from("events").insert(event)

  if (error) throw new Error(error.message)
}