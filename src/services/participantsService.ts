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

):Promise<void>{
    
}