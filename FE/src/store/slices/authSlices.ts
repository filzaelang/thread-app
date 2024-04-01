import { IUser } from '../../interface/UserInterface'
import { setAuthToken } from '../../libs/api';
import { createSlice } from '@reduxjs/toolkit'

const initialAuthState: { data: IUser } = {
    data: {
        id: 0,
        username: "",
        full_name: "",
        email: "",
        photo_profile: "",
        background_image: "",
        description: "",
        followers_count: 0,
        following_count: 0,
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (state, action) => {
            const payload = action.payload;
            const { token } = action.payload;
            setAuthToken(token);
            localStorage.setItem("token", token);
            const user: IUser = {
                id: payload.obj.id,
                username: payload.obj.username,
                full_name: payload.obj.full_name,
                email: payload.obj.email,
                photo_profile: payload.obj.photo_profile,
                background_image: payload.obj.background_image,
                description: payload.obj.description,
                followers_count: payload.obj.followers_count,
                following_count: payload.obj.following_count,
            };

            state.data = user
        },
        AUTH_CHECK: (state, action) => {
            const payload = action.payload;
            const user: IUser = {
                id: payload.check.id,
                username: payload.check.username,
                full_name: payload.check.full_name,
                email: payload.check.email,
                photo_profile: payload.check.photo_profile,
                background_image: payload.obj.background_image,
                description: payload.check.description,
                followers_count: payload.check.followers_count,
                following_count: payload.check.following_count,
            };

            state.data = user
        },
        AUTH_UPDATE: (state, action) => {
            const { description, full_name, photo_profile } = action.payload;

            state.data.description = description
            state.data.full_name = full_name
            if (photo_profile && typeof photo_profile === 'string' && photo_profile.trim() !== '') {
                state.data.photo_profile = photo_profile
            }
        },
        SET_FOLLOWING_COUNT: (state, action) => {
            const { is_followed } = action.payload
            if (!is_followed) {
                state.data.following_count = (state.data.following_count ?? 0) + 1
            } else {
                state.data.following_count = (state.data.following_count ?? 0) - 1
            }
        },
        AUTH_LOGOUT: (state) => {
            setAuthToken(null);
            localStorage.removeItem('token');

            state.data = {
                id: 0,
                username: '',
                full_name: '',
                email: '',
                photo_profile: '',
                background_image: '',
                description: '',
                followers_count: 0,
                following_count: 0,
            };
        },
    },
});