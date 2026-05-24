import { supabase } from "../database/supabaseClient"

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

export async function getEventOptions(): Promise<EventOption[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, name")
    .order("id", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getEvents(): Promise<EventData[]> {
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

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as EventData[]
}

export async function getEventById(id: number): Promise<EventData | null> {
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

  if (error) {
    throw new Error(error.message)
  }

  return data as EventData
}

export async function createEvent(event: CreateEventData): Promise<void> {
  const { error } = await supabase
    .from("events")
    .insert(event)

  if (error) {
    throw new Error(error.message)
  }
}