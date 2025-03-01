import { User } from "./userInterface"

export interface Auth {
    user: User | null
    access_token: string | null
}