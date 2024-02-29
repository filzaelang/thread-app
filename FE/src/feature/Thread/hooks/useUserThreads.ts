import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/types/rootStates";
import { GET_THREADS } from "../../../store/rootReducer";
import { API, setAuthTokenLogin } from "../../../libs/api";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


export function useUserThreads() {
    const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.auth)
    const userThreads = useSelector((state: RootState) => state.threads)
    const [otherUserThreads, setOtherUserThreads] = useState<any>([])
    setAuthTokenLogin(localStorage.token)
    const { id } = useParams();

    async function getUserThreads() {
        try {
            const response = await API.get(`/thread/user`)
            dispatch(GET_THREADS(response.data))
        } catch (error) {
            throw error
        }
    }

    async function getOtherUserThreads() {
        try {
            const response = await API.get(`/thread/user/${id}`)
            setOtherUserThreads(response.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getUserThreads()
        getOtherUserThreads()
    }, [])

    return {
        userThreads, otherUserThreads
    }
}