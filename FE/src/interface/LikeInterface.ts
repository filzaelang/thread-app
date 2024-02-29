import { IUser } from "./UserInterface"
import { IThreadCard } from "./ThreadInterface"

export interface ILike {
    id?: number,
    user_id?: IUser | null,
    thread_id?: IThreadCard | null,
    created_at?: string,
    created_by?: IUser | null,
    updated_at?: string,
    updated_by?: IUser | null,
}