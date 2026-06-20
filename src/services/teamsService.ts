import { supabase } from "../database/supabaseClient";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const demoTeams = [
  {
    id: 1,
    name: 'Equipo Alpha',
    event_id: 1,
    balance_score: 92,
    status: 'active',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Equipo Beta',
    event_id: 1,
    balance_score: 87,
    status: 'active',
    created_at: new Date().toISOString(),
  },
];

export async function getTeams() {
  if (DEMO_MODE) {
    return demoTeams;
  }

  const { data, error } = await supabase
    .from('teams')
    .select('id,name,event_id,balance_score,status,created_at')
    .order('id', { ascending: true });

  if (error) throw error;

  return data || [];
}
export type CreateTeamWithMembersData = {
  name: string
  event_id: number
  member_ids: number[]
}


export async function createTeamWithMembers(
  teamData: CreateTeamWithMembersData,
): Promise<void> {
  if (DEMO_MODE) return

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      name: teamData.name,
      event_id: teamData.event_id,
      balance_score: 0,
      status: "active",
    })
    .select("id")
    .single()

  if (teamError) throw new Error(teamError.message)

  const members = teamData.member_ids.map((participantId) => ({
    team_id: team.id,
    participant_id: participantId,
  }))

  const { error: membersError } = await supabase
    .from("team_members")
    .insert(members)

  if (membersError) throw new Error(membersError.message)
}
// --- AGREGAR AL FINAL DE src/services/teamsService.ts ---

export type TeamInvitation = {
  id: number;
  team_id: number;
  participant_id: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  teams?: {
    id: number;
    name: string;
    event_id: number;
  };
};

export async function getPendingInvitationsByParticipant(participantId: number): Promise<TeamInvitation[]> {
  if (DEMO_MODE) return [];

  const { data, error } = await supabase
    .from('team_invitations')
    .select('*, teams(id, name, event_id)')
    .eq('participant_id', participantId)
    .eq('status', 'pending');

  if (error) throw error;
  return data || [];
}

export async function respondToTeamInvitation(
  invitationId: number,
  status: 'Aceptado' | 'Rechazado'
): Promise<void> {
  if (DEMO_MODE) return;

  // Normalizar el estado para la base de datos
  const dbStatus = status === 'Aceptado' ? 'accepted' : 'rejected';

  const { error } = await supabase
    .from('team_invitations')
    .update({ status: dbStatus })
    .eq('id', invitationId);

  if (error) throw error;
}