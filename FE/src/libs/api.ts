import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:5000/api/v1"
})

export function setAuthToken(token: string | null) {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}

export function setAuthTokenLogin(token: string | null) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

API.interceptors.request.use((config) => {
    const token = localStorage.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})