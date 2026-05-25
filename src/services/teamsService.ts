import { supabase } from "../database/supabaseClient"
import type { ParticipantData } from "./participantsService"

export type CreateTeamData = {
  name: string
  event_id: number
  balance_score: number
  members: ParticipantData[]
}

export type TeamInvitation = {
  id: number
  status: string
  team_id: number
  participant_id: number
  teams: {
    id: number
    name: string
    status: string
    balance_score: number
    event_id: number
  } | null
}

export async function getPendingInvitationsByParticipant(
  participantId: number,
): Promise<TeamInvitation[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select(`
      id,
      status,
      team_id,
      participant_id,
      teams (
        id,
        name,
        status,
        balance_score,
        event_id
      )
    `)
    .eq("participant_id", participantId)
    .eq("status", "Pendiente")

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as unknown as TeamInvitation[]
}




export async function createTeamWithMembers(
  team: CreateTeamData,
  creatorParticipantId: number,
): Promise<void> {
  const { data: createdTeam, error: teamError } = await supabase
    .from("teams")
    .insert({
      name: team.name,
      event_id: team.event_id,
      balance_score: team.balance_score,
      status: "Pendiente",
    })
    .select("id")
    .single()

  if (teamError) {
    throw new Error(teamError.message)
  }

  const membersPayload = team.members.map((member) => ({
    team_id: createdTeam.id,
    participant_id: member.id,
    status:
      member.id === creatorParticipantId
        ? "Aceptado"
        : "Pendiente",
  }))

  const { error: membersError } = await supabase
    .from("team_members")
    .insert(membersPayload)

  if (membersError) {
    throw new Error(membersError.message)
  }
}


export async function respondToTeamInvitation(
  teamMemberId: number,
  status: "Aceptado" | "Rechazado",
): Promise<void> {
  const { error } = await supabase
    .from("team_members")
    .update({ status })
    .eq("id", teamMemberId)

  if (error) {
    throw new Error(error.message)
  }
}



export type TeamData = {
  id: number
  name: string
  event_id: number | null
  balance_score: number | null
  status?: string | null
  created_at: string | null
}

export async function getTeams(): Promise<TeamData[]> {
  const { data, error } = await supabase
    .from("teams")
    .select(`
      id,
      name,
      event_id,
      balance_score,
      status,
      created_at
    `)
    .order("id", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as unknown as TeamData[]
}

export async function getTeam(id: number): Promise<TeamData | null> {
  const { data, error } = await supabase
    .from("teams")
    .select(`
      id,
      name,
      event_id,
      balance_score,
      status,
      created_at
    `)
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as unknown as TeamData
}