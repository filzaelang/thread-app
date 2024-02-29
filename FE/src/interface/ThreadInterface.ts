import { IUser } from "./UserInterface";
import { ILike } from "./LikeInterface";
import { IReply } from "./ReplyInterface";

export interface IThreadPost {
    content: string;
    image: Blob | MediaSource | string;
}

export interface IThreadCard {
    id: number;
    content: string;
    image: string;
    number_of_likes?: number;
    number_of_replies?: number;
    created_at: string;
    created_by: IUser | null;
    updated_at: string;
    updated_by: IUser | null;
    is_liked: boolean;
}