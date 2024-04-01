import { API, setAuthTokenLogin } from "../../../libs/api";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


export function useOtherUserThreads() {
    const [otherUserThreads, setOtherUserThreads] = useState<any>([])
    setAuthTokenLogin(localStorage.token)
    const { id } = useParams();

    async function getOtherUserThreads() {
        try {
            const response = await API.get(`/thread/user/${id}`)
            setOtherUserThreads(response.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getOtherUserThreads()
    }, [])

    return {
        otherUserThreads
    }
}