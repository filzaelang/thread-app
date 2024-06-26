import { useEffect, useState, useRef, ChangeEvent, FormEvent, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../../libs/api'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/types/rootStates'
import { setAuthToken } from '../../../libs/api'
import { GET_ONE_THREAD, SET_ONE_THREAD_LIKES } from '../../../store/rootReducer'
import { IThreadCard } from '../../../interface/ThreadInterface'
import { toast } from "react-toastify";

export function useDetailThreads() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    setAuthToken(localStorage.token)

    const { id } = useParams()
    const [replies, setReplies] = useState<IThreadCard[]>();
    const thread = useSelector((state: RootState) => state.oneThreads.data)
    const [isLiked, setIsLiked] = useState<boolean>(false);

    async function getOneThread() {
        try {
            const response = await API.get(`/thread/${id}`);
            // console.log(response.data.data)
            dispatch(GET_ONE_THREAD(response.data.data))
        } catch (err) {
            console.log("Failed to get thread : ", err);
        }
    }

    async function getReplies() {
        try {
            const response = await API.get(`/replies?thread_id=${id}`);
            setReplies(response.data);
            // console.log("ini reply untuk thread id", response.data);
        } catch (err) {
            console.log("Failed to get replies: ", err);
        }
    }

    //Post Reply
    const [data, setData] = useState<any>({
        content: "",
        image: "",
        thread_id: +(id as string),
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

    async function handlePostReply(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("content", data.content)
        formData.append("image", data.image as File)
        formData.append("thread_id", data.thread_id)

        try {
            const response = await API.post("/reply", formData);
            console.log("Success posting reply : ", response);
            toast.success("Success posting a reply")
            getReplies();
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    }
    //Post Reply

    async function updateLikesCount(id: number | undefined, is_liked: boolean | undefined) {
        try {
            if (!is_liked) {
                await API.post("/like", { thread_id: id })
            } else if (is_liked) {
                await API.delete(`/like/${id}`)
            }
            dispatch(SET_ONE_THREAD_LIKES({ id: id, is_liked: is_liked }))
            getOneThread()
        } catch (error) {
            console.error("Error updating likes count:", error);
            throw error
        }
    }

    const handleNavigate = async (id: number | undefined) => {
        const newUrl = `/profile/${id}`;
        navigate(newUrl);
    }

    useEffect(() => {
        getOneThread()
        getReplies()
    }, [])

    return {
        updateLikesCount,
        getOneThread,
        thread,
        fileInputRef,
        handleChange,
        handlePostReply,
        replies,
        isLiked,
        handleNavigate
    }
}