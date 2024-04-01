import { IUserLogin } from "../../../interface/UserInterface";
import { useState, ChangeEvent } from "react";
import { API } from "../../../libs/api";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "../../../store/rootReducer";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export function useLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState<IUserLogin>({
        username: "",
        password: ""
    })

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    async function handleLogin() {
        try {
            const response = await API.post("/auth/login", data)
            dispatch(AUTH_LOGIN(response.data))
            toast.success("Login success !")
            navigate("/")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ error: string }>;
                const errorMessage = axiosError.response?.data?.error;
                toast.error(errorMessage)
                throw axiosError;
            } else {
                alert("An unexpected error occurred");
                throw error;
            }
        }
    }

    async function handleForgotPassword() {
        toast.error("SUKURIN")
    }

    return { handleChange, handleLogin, handleForgotPassword }
}