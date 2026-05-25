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
  email: string
  password: string
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
  email: string | null
  events?: {
    id: number
    name: string
  } | null
}

const participantSelect = `
  id,
  full_name,
  career,
  semester,
  preferred_role,
  interests,
  event_id,
  frontend,
  backend,
  database_design,
  ui_design,
  documentation,
  presentation,
  leadership,
  created_at,
  email,
  events (
    id,
    name
  )
`

export async function createParticipant(
  participant: CreateParticipantData,
): Promise<ParticipantData> {
  const { data, error } = await supabase
    .from("participants")
    .insert({
      ...participant,
      email: participant.email.trim().toLowerCase(),
    })
    .select(participantSelect)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as unknown as ParticipantData
}

export async function getParticipants(): Promise<ParticipantData[]> {
  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .order("id", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as unknown as ParticipantData[]
}

export async function getParticipantByID(
  id: number,
): Promise<ParticipantData | null> {
  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as unknown as ParticipantData
}

export async function getLastParticipant(): Promise<ParticipantData | null> {
  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .order("id", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as unknown as ParticipantData
}

export async function loginParticipant(
  email: string,
  password: string,
): Promise<ParticipantData | null> {
  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .eq("email", email.trim().toLowerCase())
    .eq("password", password)
    .single()

  if (error) {
    return null
  }

  return data as unknown as ParticipantData
}


export async function getParticipantsByEvent(
  eventId: number,
): Promise<ParticipantData[]> {
  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .eq("event_id", eventId)
    .order("id", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as unknown as ParticipantData[]
}