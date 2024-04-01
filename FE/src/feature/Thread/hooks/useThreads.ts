import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/types/rootStates";
import { GET_THREADS, SET_THREADS_LIKES } from "../../../store/rootReducer";
import { API, setAuthTokenLogin } from "../../../libs/api";
import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react"
import { IThreadPost } from "../../../interface/ThreadInterface";
import { toast } from "react-toastify";


export function useThreads() {
    const dispatch = useDispatch();
    const threads = useSelector((state: RootState) => state.threads)
    setAuthTokenLogin(localStorage.token)
    // const [oneThread, setOneThread] = useState<IThreadPost>()

    const [data, setData] = useState<IThreadPost>({
        content: "",
        image: ""
    })

    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target

        if (files) {
            setData({
                ...data,
                [name]: files[0],
            })
        } else {
            setData({
                ...data,
                [name]: value,
            })
        }
    }

    async function handlePostThread(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("content", data.content)
        formData.append("image", data.image as File)

        try {
            const response = await API.post("/thread", formData);
            console.log("Success post thread :", response);
            toast.success("Success posting a thread")
            getThreads();
        } catch (error) {
            console.error("Error posting thread:", error);
        }
    }

    async function getThreads() {
        try {
            const response = await API.get("/thread")
            dispatch(GET_THREADS(response.data))
        } catch (error) {
            throw error
        }
    }

    async function updateLikesCount(id: number, is_liked: boolean) {
        try {
            if (!is_liked) {
                await API.post("/like", { thread_id: id })
            } else if (is_liked) {
                await API.delete(`/like/${id}`)
            }
            dispatch(SET_THREADS_LIKES({ id: id, is_liked: is_liked }))
        } catch (error) {
            console.error("Error updating likes count:", error);
            throw error
        }
    }

    useEffect(() => {
        getThreads()
    }, [dispatch])

    return {
        updateLikesCount, handleChange, handlePostThread, threads, fileInputRef,
    }
}