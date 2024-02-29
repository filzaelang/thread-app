import { IThreadCard } from "../../interface/ThreadInterface";
import { createSlice } from "@reduxjs/toolkit";


const initialThreadsState: { data: IThreadCard[] } = {
    data: []
}

export const threadsSlice = createSlice({
    name: "threads",
    initialState: initialThreadsState,
    reducers: {
        GET_THREADS: (state, action) => {
            const payload = action.payload

            const threads = payload.map((data: IThreadCard) => {
                return {
                    id: data.id,
                    content: data.content,
                    image: data.image,
                    number_of_likes: data.number_of_likes,
                    number_of_replies: data.number_of_replies,
                    created_at: data.created_at,
                    created_by: data.created_by,
                    updated_at: data.updated_at,
                    updated_by: data.updated_by,
                    is_liked: data.is_liked,
                }
            })

            state.data = threads
        },
        SET_THREADS_LIKES: (state, action) => {
            const { id, is_liked } = action.payload;

            // Update the state based on the thread ID
            const threads = state.data.map((data: IThreadCard) => {
                if (data.id === id) {
                    return {
                        ...data,
                        number_of_likes: is_liked
                            ? (data.number_of_likes ?? 0) - 1
                            : (data.number_of_likes ?? 0) + 1,
                        is_liked: !is_liked,
                    };
                }
                return data;
            });

            state.data = threads
        },
    },
})

export default threadsSlice.reducer;