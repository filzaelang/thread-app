import { IUser } from "./UserInterface";
import { IThreadCard } from "./ThreadInterface";

export interface IReply {
    id?: number,
    user_id?: IUser | null,
    thread_id?: IThreadCard | null,
    image?: string,
    content?: string,
    created_at?: string,
    created_by?: IUser | null,
    updated_at?: string,
    updated_by?: IUser | null,
}

export interface IReplyPost {
    content?: string,
    image?: string,
}