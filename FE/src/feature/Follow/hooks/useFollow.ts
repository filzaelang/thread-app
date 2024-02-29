import { useState, useEffect } from "react";
import { API } from "../../../libs/api";
import { setAuthTokenLogin } from "../../../libs/api";
import { useDispatch } from "react-redux"
import { SET_FOLLOW } from "../../../store/rootReducer";

export default function useFollow() {

    const [followers, setFollowers] = useState<any>([]);
    const [followings, setFollowings] = useState<any>([]);
    setAuthTokenLogin(localStorage.token);
    const dispatch = useDispatch();

    async function getFollowers() {
        try {
            const response = await API.get("/follows?type=followers")
            setFollowers(response.data)
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }

    async function getFollowings() {
        try {
            const response = await API.get("/follows?type=followings")
            setFollowings(response.data)
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }

    async function handleFollowFollowers(id: number | undefined, is_followed: boolean | undefined) {
        try {
            if (is_followed == false) {
                const response = await API.post("/follow", { following_id: id })
                // Update local state without making an API call
                setFollowers((prevFollowers: any) => [...prevFollowers, response.data]);
            } else if (is_followed) {
                await API.delete(`/follow/${id}`)
                // Update local state without making an API call
                setFollowers((prevFollowers: any) => prevFollowers.filter((follower: any) => follower.id !== id));
            }
            dispatch(SET_FOLLOW({ id: id }))
        } catch (error) {
            console.error(error);
        }
    }

    async function handleFollowFollowings(id: number | undefined, is_followed: boolean | undefined) {
        try {
            console.log(id, is_followed)
            if (!is_followed) {
                await API.post("/follow", { following_id: id })
            } else if (is_followed) {
                await API.delete(`/follow/${id}`)
            }
            getFollowings()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFollowers()
        getFollowings()
    }, [followers,])

    return {
        followers, followings, handleFollowFollowers, handleFollowFollowings
    }
}

