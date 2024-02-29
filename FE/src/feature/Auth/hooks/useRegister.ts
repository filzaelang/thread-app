import { IUserRegister } from "../../../interface/UserInterface"
import { useState, ChangeEvent } from "react"
import axios, { AxiosError } from "axios"
import { API } from "../../../libs/api"


export function useRegister() {
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
            alert(response.data.message)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ error: string }>;
                const errorMessage = axiosError.response?.data?.error;
                alert(errorMessage)
                throw axiosError;
            } else {
                alert("An unexpected error occurred");
                throw error;
            }
        }
    }

    return { handleChange, handleRegister }
}