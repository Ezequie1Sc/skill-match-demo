import { supabase } from "../database/supabaseClient"



export type Category = {
    id: number
    name: string | null
    description: string | null
    skills: string[]
    created_at: string
}

export type CreateCategoryData = {
    name: string | null
    description: string | null
    skills: string[]
    created_at: string
}


export async function getCategories(): Promise<Category[]>{
    const {data, error} = await supabase
        .from("categories")
        .select("*")
        .order("id", {ascending: true});

    if(error){
        throw new Error(error.message)
    }
    return data ?? [];


export async function createCategory(category: CreateCategoryData): Promise<void>{
    const {error} = await supabase.from("categories").insert(category)

    if(error){
        throw new Error(error.message)
    }
}