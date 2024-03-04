import { IUserSugested } from "../../interface/UserInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialUsersState: { data: IUserSugested[] } = {
    data: []
}

export const userSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {
        GET_SUGESTED_ACCOUNT: (state, action) => {
            const payload = action.payload
            // console.log(payload)
            state.data = payload
        },
    }
})

export default userSlice.reducer