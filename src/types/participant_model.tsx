export type Participant = {
    id: number
    fullName: string
    career: string
    semester: number
    preferredRole: string
    interests: string[]
    skills: SkillSet
    createdAt: string
}

export type SkillSet = {
    frontend: number
    backend: number
    database: number
    uiDesign: number
    documentation: number
    presentation: number
    leadership: number
}