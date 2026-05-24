import { supabase } from "../database/supabaseClient"

export type CreateParticipantData = {
  full_name: string
  career: string
  semester: number
  preferred_role: string
  interests: string[]
  event_id: number
  frontend: number
  backend: number
  database_design: number
  ui_design: number
  documentation: number
  presentation: number
  leadership: number
}

export type ParticipantData = {
  id: number
  full_name: string
  career: string
  semester: number
  preferred_role: string
  interests: string[]
  event_id: number
  frontend: number
  backend: number
  database_design: number
  ui_design: number
  documentation: number
  presentation: number
  leadership: number
  created_at: string
  events?: {
    id: number
    name: string
  } | null
}


export async function createParticipant(
  participant: CreateParticipantData,
): Promise<void> {
  const { error } = await supabase
    .from("participants")
    .insert(participant)

  if (error) {
    throw new Error(error.message)
  }
}


export async function getParticipants(

):Promise<ParticipantData[]>{
    const {data, error} = await supabase
    .from("participants")
    .select("*")
    .order("id", {ascending: true})

  if(error){
    throw new Error(error.message)
  }
  return data ?? [];

}


export async function getParticipantByID(id: number): Promise<ParticipantData | null>{
 const { data, error } = await supabase
    .from("participants")
    .select(`
      *,
      events (
        id,
        name
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data ?? null
}


export async function getLastParticipant(): Promise<ParticipantData | null> {
  const { data, error } = await supabase
    .from("participants")
    .select(`
      *,
      events (
        id,
        name
      )
    `)
    .order("id", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data ?? null
}