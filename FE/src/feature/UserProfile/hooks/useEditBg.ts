import { useState, ChangeEvent, FormEvent, useRef } from "react"
import { setAuthTokenLogin, API } from '../../../libs/api'
import { IUserBackgroundUpdate } from "../../../interface/UserInterface"
import { toast } from "react-toastify"
import { AUTH_CHECK, GET_THREADS } from "../../../store/rootReducer"
import { useDispatch } from "react-redux"

export function useEditBg() {
    setAuthTokenLogin(localStorage.token)
    const dispatch = useDispatch()
    const fileBgInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<IUserBackgroundUpdate>({
        background_image: '',
    })

    function handleBgChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, files } = event.target

        setForm({
            ...form,
            [name]: files!![0],
        })
    }

    async function handleUpdateBg(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("background_image", form.background_image as File)

        console.log("data", form)
        console.log("formData", formData)

        try {
            await API.patch("/user/detail/backgound-image", formData);
            const response = await API.get("/auth/check");
            dispatch(AUTH_CHECK(response.data));
            const refreshThreadsUser = await API.get(`/thread/user`)
            dispatch(GET_THREADS(refreshThreadsUser.data))
            toast.success("Success updating background picture")
        } catch (error) {
            toast.error("Error updating profile picture ", error!!);
        }
    }


    return {
        fileBgInputRef, handleBgChange, handleUpdateBg
    }
}
