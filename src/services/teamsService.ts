import { supabase } from "../database/supabaseClient"



export type Team = {
    id: number
    name: string | null
    event_id: number
    balance_score: number
    created_at?: string
}

export type CreateTeamData = {
    name: string
    event_id: number
    balance_score: number
    created_at?: string
}


export async function getTeams(): Promise<Team[]>{
    const {data, error} = await supabase
        .from("teams")
        .select("*")
        .order("id", {ascending: true});

    if(error){
        throw new Error(error.message)
    }

    return data ?? [];

}
export async function getTeam(){}
export async function createTeam(team: CreateTeamData): Promise<void>{
    const {error} = await supabase.from("teams").insert(team)

    if(error){
        throw new Error(error.message)
    }
}