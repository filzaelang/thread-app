import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlices";
import { threadsSlice } from "./slices/threadsSlices";
import { oneThreadsSlice } from "./slices/oneThreadslices";
import { repliesSlices } from "./slices/repliesSlices";
import { followSlice } from "./slices/followSlices";
import { userSlice } from "./slices/userSlices";

export const { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_UPDATE, SET_FOLLOWING_COUNT } =
    authSlice.actions;
export const { GET_THREADS, SET_THREADS_LIKES } = threadsSlice.actions;
export const { GET_ONE_THREAD, SET_ONE_THREAD_LIKES } = oneThreadsSlice.actions;
export const { GET_REPLIES } = repliesSlices.actions;
export const { GET_FOLLOWS, SET_FOLLOW_STATE, SET_FOLLOW_FOLLOW } = followSlice.actions;
export const { GET_ALL_USERS } = userSlice.actions;

export const authReducer = authSlice.reducer;
export const threadReducer = threadsSlice.reducer;
export const oneThreadReducer = oneThreadsSlice.reducer;
export const repliesReducer = repliesSlices.reducer;
export const followReducer = followSlice.reducer;
export const userReducer = userSlice.reducer;

const rootReducer = combineReducers({
    auth: authReducer,
    threads: threadReducer,
    oneThreads: oneThreadReducer,
    replies: repliesReducer,
    follow: followReducer,
    user: userReducer,
    // other reducer
});

export default rootReducer;
