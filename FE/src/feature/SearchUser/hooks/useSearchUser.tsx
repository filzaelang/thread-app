import { useEffect, useState } from 'react'
import { setAuthTokenLogin } from '../../../libs/api';
import { API } from '../../../libs/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { RootState } from '../../../store/types/rootStates';

export default function useSearchUser() {

    const [searchQuery, setSearchQuery] = useState<any>("");
    const [searchResults, setSearchResults] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth)

    setAuthTokenLogin(localStorage.token);

    // const getUser = async () => {
    //     const response = await API.get(`/user`)
    //     setUsers(response.data)
    // }

    // useEffect(() => {
    //     getUser()
    // }, [searchResults])

    async function handleSearch(query: any) {
        try {
            const response = await API.post(`/user`, { username: query });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }

    const handleChange = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);

        // if (query === "") {
        //     setSearchResults(users.filter((user: any) => user.id !== auth?.data.id))
        //     // setSearchResults(null)
        // } else if (auth) {
        //     const filteredUsers = users.filter((user: any) => {
        //         return user.id !== auth?.data.id && Object.values(user).join("").toLowerCase().includes(searchQuery.toLowerCase());
        //     });
        //     setSearchResults(filteredUsers);
        // } else {
        //     setSearchResults(users);
        // }
        if (query === " ") {
            setSearchResults(null)
        } else {
            handleSearch(query);
        }

    };

    const handleNavigate = async (id: number | undefined) => {
        const newUrl = `/profile/${id}`;
        navigate(newUrl);
    }

    async function handleFollow(id: number | undefined, isFollowed: boolean | undefined) {
        try {
            console.log(id, isFollowed);
            if (isFollowed === false) {
                await API.post("/follow", { following_id: id });
                const updatedResults = searchResults.map((result: any) => {
                    if (result.id === id) {
                        return { ...result, is_followed: true };
                    }
                    return result;
                });
                setSearchResults(updatedResults);
            } else if (isFollowed === true) {
                await API.delete(`/follow/${id}`);
                const updatedResults = searchResults.map((result: any) => {
                    if (result.id === id) {
                        return { ...result, is_followed: false };
                    }
                    return result;
                });
                setSearchResults(updatedResults);
            }
        } catch (error) {
            console.error("Error following user", error);
        }
    }

    return {
        handleChange,
        setSearchQuery,
        searchQuery,
        setSearchResults,
        searchResults,
        handleFollow,
        handleNavigate
    };
}
