import { Category } from "./Category"

export interface Project {
    uuid_project: string
    name_project: string
    total_tasks: number
    total_tasks_completed: number
    categories: Category[]
    date_project?: Date | string
    created_at?: Date
}

export interface NewProject {
    uuid?: string
    name_project: string
    categories: Category[]
    date_project: string | null
}

export interface EditProject {
    uuid?: string
    name_project: string
    categories: Category[]
    date_project: Date | string | null
}