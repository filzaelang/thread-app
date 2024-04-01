import { useEffect } from 'react'
import { API } from '../../../libs/api'
import { GET_SUGESTED_ACCOUNT, SET_FOLLOWING_COUNT, SET_FOLLOW_FOLLOW } from '../../../store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/types/rootStates'
import { AUTH_LOGOUT } from '../../../store/rootReducer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function useSugestedAccount() {

    const sugestedAccount = useSelector((state: RootState) => state.user.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function getSugestedAccount() {
        try {
            const response = await API.get(`/user/sugestedAccount`)
            // console.log(response.data)
            dispatch(GET_SUGESTED_ACCOUNT(response.data))
        } catch (error) {
            console.error("Error getting sugestion error:", error)
            dispatch(AUTH_LOGOUT());
            navigate("/login")
        }
    }

    async function handleFollow(id: number | undefined, is_followed: boolean | undefined) {
        try {
            if (is_followed == false) {
                await API.post("/follow", { following_id: id })
                // console.log(response.data.data)
                dispatch(SET_FOLLOW_FOLLOW({ user_id: id, is_followed: is_followed }))
                dispatch(SET_FOLLOWING_COUNT({ is_followed: is_followed }))
            } else if (is_followed) {
                await API.delete(`/follow/${id}`)
                // // console.log(response)
                dispatch(SET_FOLLOW_FOLLOW({ user_id: id, is_followed: is_followed }))
                dispatch(SET_FOLLOWING_COUNT({ is_followed: is_followed }))
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSugestedAccount()
    }, [useSugestedAccount, handleFollow])

    useEffect(() => {
        // Lakukan pemantauan terhadap respons dari setiap request ke server
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                // Token invalid, lakukan logout otomatis
                dispatch(AUTH_LOGOUT());
                // Redirect ke halaman login
                navigate("/login")
            }
            return Promise.reject(error);
        });
    }, []);

    return {
        sugestedAccount, handleFollow
    }
}
