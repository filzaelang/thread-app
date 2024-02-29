import { ChangeEvent, FormEvent, useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { API } from '../../../libs/api';
import { IReplyPost } from '../../../interface/ReplyInterface';
import { setAuthTokenLogin } from '../../../libs/api';
import { GET_REPLIES } from '../../../store/rootReducer';
import { RootState } from '../../../store/types/rootStates';

export function useReply(id: number) {
    const dispatch = useDispatch();
    const replies = useSelector((state: RootState) => state.replies)
    const [isLiked, setIsLiked] = useState<boolean>(false);
    setAuthTokenLogin(localStorage.token)

    const [data, setData] = useState<any>({
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

    async function handlePostReply(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("content", data.content)
        formData.append("image", data.image as File)

        try {
            const response = await API.post("/reply", formData);
            console.log("Success posting reply : ", response);
            getReply(id);
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    }

    async function getReply(id: number) {
        try {
            const response = await API.get(`/reply/${id}`)
            console.log(response.data.data)
            dispatch(GET_REPLIES(response.data.data))
        } catch (error) {
            throw error
        }
    }

    async function updateLikesCount(id: number | undefined, isLiked: boolean) {
        try {
            if (!isLiked) {
                isLiked = true
            } else if (isLiked) {
                isLiked = false
            }
            // dispatch(SET_THREADS_LIKES({ id: id, is_liked: is_liked }))
        } catch (error) {
            console.error("Error updating likes count:", error);
            throw error
        }
    }

    useEffect(() => {
        getReply(id)
    }, [dispatch])

    return {
        updateLikesCount, handleChange, handlePostReply, fileInputRef, replies, isLiked
    }
}
