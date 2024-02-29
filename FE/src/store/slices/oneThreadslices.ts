import { IThreadCard } from "../../interface/ThreadInterface";
import { createSlice } from "@reduxjs/toolkit/react";

const initialOneThread: { data: IThreadCard } = {
    data: {
        id: 0,
        content: "",
        image: "",
        number_of_likes: 0,
        number_of_replies: 0,
        created_at: "",
        created_by: null,
        updated_at: "",
        updated_by: null,
        is_liked: false,
    }
}

export const oneThreadsSlice = createSlice({
    name: "thread",
    initialState: initialOneThread,
    reducers: {
        GET_ONE_THREAD: (state, action) => {
            const payload = action.payload.data

            const oneThread: IThreadCard = {
                id: payload.id,
                content: payload.content,
                image: payload.image,
                number_of_likes: payload.number_of_likes,
                number_of_replies: payload.number_of_replies,
                created_at: payload.created_at,
                created_by: payload.created_by,
                updated_at: payload.updated_at,
                updated_by: payload.updated_by,
                is_liked: payload.is_liked,
            }

            state.data = oneThread
        },
        SET_ONE_THREAD_LIKES: (state, action) => {
            const { is_liked } = action.payload

            state.data.number_of_likes = is_liked
                ? (state.data.number_of_likes ?? 0) - 1
                : (state.data.number_of_likes ?? 0) + 1
            state.data.is_liked = !is_liked
        }
    }
})

export default oneThreadsSlice.reducer