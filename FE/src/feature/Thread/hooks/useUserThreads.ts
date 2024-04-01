import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store/types/rootStates";
import { GET_THREADS } from "../../../store/rootReducer";
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

    useEffect(() => {
        getUserThreads()
    }, [])

    return {
        userThreads, getUserThreads
    }
}