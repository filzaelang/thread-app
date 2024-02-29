import { createSlice } from "@reduxjs/toolkit"
import { IReply } from "../../interface/ReplyInterface"

const initialReplyState: { data: IReply[] } = {
    data: []
}

export const repliesSlices = createSlice({
    name: "replies",
    initialState: initialReplyState,
    reducers: {
        GET_REPLIES: (state, action) => {
            const payload = action.payload
            console.log(payload)

            // const replies = payload.map((data: IReply) => {
            //     return {
            //         id: data.id,
            //         user_id: data.user_id,
            //         thread_id: data.thread_id,
            //         image: data.image,
            //         content: data.content,
            //         created_at: data.created_at,
            //         created_by: data.created_by,
            //         updated_at: data.updated_at,
            //         updated_by: data.updated_by,
            //     }
            // })

            const replies = payload.map((data: IReply) => {
                return {
                    id: data.id,
                    user_id: data.user_id,
                    thread_id: data.thread_id,
                    image: data.image,
                    content: data.content,
                    created_at: data.created_at,
                    created_by: data.created_by,
                    updated_at: data.updated_at,
                    updated_by: data.updated_by,
                }
            })

            console.log(replies)

            // state.data = replies
        },
    }
})

export default repliesSlices.reducer