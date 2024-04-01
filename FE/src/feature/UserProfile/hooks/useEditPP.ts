import { useState, ChangeEvent, FormEvent, useRef } from "react"
import { setAuthTokenLogin, API } from '../../../libs/api'
import { IUserPPUpdate } from "../../../interface/UserInterface"
import { toast } from "react-toastify"
import { AUTH_CHECK, GET_THREADS } from "../../../store/rootReducer"
import { useDispatch } from "react-redux"

export function useEditPP() {
    setAuthTokenLogin(localStorage.token)
    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<IUserPPUpdate>({
        photo_profile: '',
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, files } = event.target

        setForm({
            ...form,
            [name]: files!![0],
        })
    }

    async function handleUpdatePP(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("photo_profile", form.photo_profile as File)

        console.log("data", form)
        console.log("formData", formData)

        try {
            await API.patch("/user/detail/photo-profile", formData);
            const response = await API.get("/auth/check");
            dispatch(AUTH_CHECK(response.data));
            const refreshThreadsUser = await API.get(`/thread/user`)
            dispatch(GET_THREADS(refreshThreadsUser.data))
            toast.success("Success updating profile picture")
        } catch (error) {
            toast.error("Error updating profile picture ", error!!);
        }
    }


    return {
        fileInputRef, handleChange, handleUpdatePP
    }
}
