import { createSlice } from "@reduxjs/toolkit";
import { IFollow } from "../../interface/FollowInterface";

const initialFollowState: { followState: string, data: IFollow[] } = {
    followState: "followers",
    data: []
}

export const followSlice = createSlice({
    name: "follow",
    initialState: initialFollowState,
    reducers: {
        GET_FOLLOWS: (state, action) => {
            const payload = action.payload
            // console.log(payload)
            state.data = payload
        },
        SET_FOLLOW_STATE: (state, action) => {
            state.followState = action.payload
        },
        SET_FOLLOW_FOLLOW: (state, action) => {
            const { user_id, is_followed } = action.payload

            const newFollow = state.data.map((data: IFollow) => {
                if (data.user_id === user_id) {
                    return {
                        ...data,
                        is_followed: !is_followed,
                    }
                }
                return data
            })

            state.data = newFollow
        }
    }
})

export default followSlice.reducer;