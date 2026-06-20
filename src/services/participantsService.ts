import { supabase } from "../database/supabaseClient"

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true"

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
  looking_for_team: boolean
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
  looking_for_team,
  events (
    id,
    name
  )
`

const demoParticipants: ParticipantData[] = [
  {
    id: 1,
    full_name: "María López",
    career: "Ingeniería en Sistemas",
    semester: 8,
    preferred_role: "Frontend",
    interests: ["React", "UI Design", "UX"],
    event_id: 1,
    frontend: 5,
    backend: 3,
    database_design: 3,
    ui_design: 5,
    documentation: 4,
    presentation: 4,
    leadership: 3,
    created_at: new Date().toISOString(),
    email: "maria.demo@email.com",
    looking_for_team: true,
    events: {
      id: 1,
      name: "Hackathon Web 2026",
    },
  },
  {
    id: 2,
    full_name: "Carlos Méndez",
    career: "Ingeniería en Software",
    semester: 7,
    preferred_role: "Backend",
    interests: ["Node.js", "APIs", "Database"],
    event_id: 1,
    frontend: 3,
    backend: 5,
    database_design: 5,
    ui_design: 2,
    documentation: 4,
    presentation: 3,
    leadership: 4,
    created_at: new Date().toISOString(),
    email: "carlos.demo@email.com",
    looking_for_team: true,
    events: {
      id: 1,
      name: "Hackathon Web 2026",
    },
  },
  {
    id: 3,
    full_name: "Ana Torres",
    career: "Diseño Digital",
    semester: 6,
    preferred_role: "UI/UX",
    interests: ["Diseño", "Prototipos", "Presentación"],
    event_id: 2,
    frontend: 3,
    backend: 1,
    database_design: 2,
    ui_design: 5,
    documentation: 5,
    presentation: 5,
    leadership: 4,
    created_at: new Date().toISOString(),
    email: "ana.demo@email.com",
    looking_for_team: false,
    events: {
      id: 2,
      name: "Reto Mobile UX",
    },
  },
]

export async function createParticipant(
  participant: CreateParticipantData,
): Promise<ParticipantData> {
  if (DEMO_MODE) {
    return {
      id: demoParticipants.length + 1,
      ...participant,
      email: participant.email.trim().toLowerCase(),
      created_at: new Date().toISOString(),
      looking_for_team: true,
      events: {
        id: participant.event_id,
        name: "Evento Demo",
      },
    }
  }

  const { data, error } = await supabase
    .from("participants")
    .insert({
      ...participant,
      email: participant.email.trim().toLowerCase(),
    })
    .select(participantSelect)
    .single()

  if (error) throw new Error(error.message)

  return data as unknown as ParticipantData
}

export async function getParticipants(): Promise<ParticipantData[]> {
  if (DEMO_MODE) return demoParticipants

  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .order("id", { ascending: true })

  if (error) throw new Error(error.message)

  return (data ?? []) as unknown as ParticipantData[]
}

export async function getParticipantByID(
  id: number,
): Promise<ParticipantData | null> {
  if (DEMO_MODE) {
    return demoParticipants.find((participant) => participant.id === id) ?? null
  }

  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .eq("id", id)
    .single()

  if (error) throw new Error(error.message)

  return data as unknown as ParticipantData
}

export async function getLastParticipant(): Promise<ParticipantData | null> {
  if (DEMO_MODE) return demoParticipants[demoParticipants.length - 1] ?? null

  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .order("id", { ascending: false })
    .limit(1)
    .single()

  if (error) throw new Error(error.message)

  return data as unknown as ParticipantData
}

export async function loginParticipant(
  email: string,
  password: string,
): Promise<ParticipantData | null> {
  if (DEMO_MODE) {
    return (
      demoParticipants.find(
        (participant) =>
          participant.email === email.trim().toLowerCase() &&
          password.length > 0,
      ) ?? demoParticipants[0]
    )
  }

  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .eq("email", email.trim().toLowerCase())
    .eq("password", password)
    .single()

  if (error) return null

  return data as unknown as ParticipantData
}

export async function getParticipantsByEvent(
  eventId: number,
): Promise<ParticipantData[]> {
  if (DEMO_MODE) {
    return demoParticipants.filter((participant) => participant.event_id === eventId)
  }

  const { data, error } = await supabase
    .from("participants")
    .select(participantSelect)
    .eq("event_id", eventId)
    .order("id", { ascending: true })

  if (error) throw new Error(error.message)

  return (data ?? []) as unknown as ParticipantData[]
}

export async function updateLookingForTeam(
  participantId: number,
  lookingForTeam: boolean,
): Promise<void> {
  if (DEMO_MODE) return

  const { error } = await supabase
    .from("participants")
    .update({ looking_for_team: lookingForTeam })
    .eq("id", participantId)

  if (error) throw new Error(error.message)
}