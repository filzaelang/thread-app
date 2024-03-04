import { IUser } from "../../interface/UserInterface";
import { createSlice } from "@reduxjs/toolkit";

const initialUsersState: { data: IUser[] } = {
    data: []
}

export const userSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    reducers: {
        GET_ALL_USERS: (state, action) => {
            const payload = action.payload
            // console.log(payload)
            state.data = payload
        },
    }
})

export default userSlice.reducer