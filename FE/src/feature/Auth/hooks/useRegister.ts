import { IUserRegister } from "../../../interface/UserInterface"
import { useState, ChangeEvent } from "react"
import axios, { AxiosError } from "axios"
import { API } from "../../../libs/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


export function useRegister() {
    const navigate = useNavigate()
    const [data, setData] = useState<IUserRegister>({
        full_name: "",
        username: "",
        email: "",
        password: ""
    })


    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    async function handleRegister() {
        try {
            const response = await API.post("/auth/register", data)
            console.log(response)
            toast.success("Register success !")
            navigate("/login")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ error: string }>;
                const errorMessage = axiosError.response?.data?.error;
                toast.error(errorMessage)
                throw axiosError;
            } else {
                toast.error("An unexpected error occurred");
                throw error;
            }
        }
    }

    return { handleChange, handleRegister }
}