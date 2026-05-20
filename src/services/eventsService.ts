import { supabase } from "../database/supabaseClient"

export type EventOption = {
  id: number
  name: string
}

export async function getEvents(): Promise<EventOption[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id, name")
    .order("id", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}