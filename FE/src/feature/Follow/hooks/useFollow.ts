import { useEffect } from "react";
import { API } from "../../../libs/api";
import { setAuthTokenLogin } from "../../../libs/api";
import { useDispatch, useSelector } from "react-redux"
import { GET_FOLLOWS, SET_FOLLOW_FOLLOW, SET_FOLLOWING_COUNT } from "../../../store/rootReducer";
import { RootState } from "../../../store/types/rootStates";

export default function useFollow() {
    const follow = useSelector((state: RootState) => state.follow.data)
    const followState = useSelector((state: RootState) => state.follow.followState)
    setAuthTokenLogin(localStorage.token);
    const dispatch = useDispatch();

    async function getFollow() {
        try {
            const response = await API.get(`/follows?type=${followState}`)
            console.log(response.data)
            dispatch(GET_FOLLOWS(response.data))
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }

    async function handleFollow(id: number | undefined, user_id: number | undefined, is_followed: boolean | undefined) {
        try {
            if (is_followed == false) {
                await API.post("/follow", { following_id: user_id })
                // console.log(response.data.data)
                dispatch(SET_FOLLOW_FOLLOW({ user_id: user_id, is_followed: is_followed }))
                dispatch(SET_FOLLOWING_COUNT({ is_followed: is_followed }))
            } else if (is_followed) {
                await API.delete(`/follow/${user_id}`)
                // console.log(response)
                dispatch(SET_FOLLOW_FOLLOW({ user_id: user_id, is_followed: is_followed }))
                dispatch(SET_FOLLOWING_COUNT({ is_followed: is_followed }))
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFollow()
    }, [followState])


    return {
        follow, handleFollow
    }
}

