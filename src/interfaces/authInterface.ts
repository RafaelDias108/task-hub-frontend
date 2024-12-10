import { User } from "./userInterface"

export interface Auth {
    user: User | null
    refresh_token: string | null
    access_token: string | null
}