import { useEffect } from 'react'
import { API } from '../../../libs/api'
import { GET_SUGESTED_ACCOUNT, SET_FOLLOWING_COUNT, SET_FOLLOW_FOLLOW } from '../../../store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/types/rootStates'

export function useSugestedAccount() {

    const sugestedAccount = useSelector((state: RootState) => state.user.data)
    const dispatch = useDispatch()

    async function getSugestedAccount() {
        try {
            const response = await API.get(`/user/sugestedAccount`)
            // console.log(response.data)
            dispatch(GET_SUGESTED_ACCOUNT(response.data))
        } catch (error) {
            console.error("Error getting sugestion error:", error)
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

    return {
        sugestedAccount, handleFollow
    }
}
