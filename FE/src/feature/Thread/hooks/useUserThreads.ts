import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/types/rootStates";
import { GET_THREADS, SET_THREADS_LIKES } from "../../../store/rootReducer";
import { API, setAuthTokenLogin } from "../../../libs/api";
import { useEffect } from "react"



export function useUserThreads() {
    const dispatch = useDispatch();
    const userThreads = useSelector((state: RootState) => state.threads)
    setAuthTokenLogin(localStorage.token)

    async function getUserThreads() {
        try {
            const response = await API.get(`/thread/user`)
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
        getUserThreads()
    }, [dispatch])

    return {
        userThreads, getUserThreads, updateLikesCount
    }
}