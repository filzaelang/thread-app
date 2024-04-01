import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react"
import { setAuthTokenLogin, API } from '../../../libs/api'
import { RootState } from "../../../store/types/rootStates"
import { useSelector, useDispatch } from "react-redux"
import { IUserUpdate } from "../../../interface/UserInterface"
import { AUTH_UPDATE, GET_THREADS } from "../../../store/rootReducer"
import { toast } from "react-toastify"

export function useEditProfile() {

    const user = useSelector((state: RootState) => state.auth.data)
    const dispatch = useDispatch()

    const fileInputRef = useRef<HTMLInputElement>(null);
    setAuthTokenLogin(localStorage.token)

    const [form, setForm] = useState<IUserUpdate>({
        full_name: user.full_name,
        description: user.description,
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target

        if (files) {
            setForm({
                ...form,
                [name]: files[0],
            })
        } else {
            setForm({
                ...form,
                [name]: value,
            })
        }
    }

    async function handleUpdateUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("full_name", form.full_name || '')
        formData.append("description", form.description || '')

        console.log("data", form)
        console.log("formData", formData)

        try {
            const response = await API.patch("/user/detail", formData);
            console.log("Success edit profile :", response);
            dispatch(AUTH_UPDATE(form))
            const refreshThreadsUser = await API.get(`/thread/user`)
            dispatch(GET_THREADS(refreshThreadsUser.data))
            toast.success("Profile updated !")
        } catch (error) {
            console.error("Error posting thread:", error);
        }

    }

    useEffect(() => {
        user
    }, [dispatch])

    return {
        handleUpdateUser, handleChange, fileInputRef, form, user, dispatch
    }
}
