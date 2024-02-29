import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react"
import { setAuthTokenLogin, API } from '../../../libs/api'
import { RootState } from "../../../store/types/rootStates"
import { useSelector, useDispatch } from "react-redux"
import { IUserUpdate } from "../../../interface/UserInterface"
import { AUTH_UPDATE } from "../../../store/rootReducer"

export function useEditProfile() {

    const user = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const fileInputRef = useRef<HTMLInputElement>(null);
    setAuthTokenLogin(localStorage.token)

    const [form, setForm] = useState<IUserUpdate>({
        full_name: user.data.full_name,
        description: user.data.description,
        photo_profile: '',
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
        formData.append("photo_profile", form.photo_profile as File)

        console.log("data", form)
        console.log("formData", formData)

        try {
            const response = await API.patch("/user/detail", formData);
            console.log("Success edit profile :", response);
            dispatch(AUTH_UPDATE(form))
        } catch (error) {
            console.error("Error posting thread:", error);
        }

    }

    useEffect(() => {
        user
    }, [dispatch])

    return {
        handleUpdateUser, handleChange, fileInputRef, form, user
    }
}
