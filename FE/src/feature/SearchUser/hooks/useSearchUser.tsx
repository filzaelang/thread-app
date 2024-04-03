import { useState } from 'react'
import { setAuthTokenLogin } from '../../../libs/api';
import { API } from '../../../libs/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_FOLLOWING_COUNT } from '../../../store/rootReducer';

export default function useSearchUser() {

    const [searchQuery, setSearchQuery] = useState<any>("");
    const [searchResults, setSearchResults] = useState<any>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    setAuthTokenLogin(localStorage.token);

    const handleChange = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === " ") {
            setSearchResults(null)
        } else {
            handleSearch(query);
        }

    };

    async function handleSearch(query: any) {
        try {
            const response = await API.post(`/user`, { username: query });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    }

    const handleNavigate = async (id: number | undefined) => {
        const newUrl = `/profile/${id}`;
        navigate(newUrl);
    }

    async function handleFollow(id: number | undefined, isFollowed: boolean | undefined) {
        try {
            if (isFollowed === false) {
                await API.post("/follow", { following_id: id });
                dispatch(SET_FOLLOWING_COUNT({ is_followed: isFollowed }))
                const updatedResults = searchResults.map((result: any) => {
                    if (result.id === id) {
                        return { ...result, is_followed: true };
                    }
                    return result;
                });
                setSearchResults(updatedResults);
            } else if (isFollowed === true) {
                await API.delete(`/follow/${id}`);
                dispatch(SET_FOLLOWING_COUNT({ is_followed: isFollowed }))
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

    // useEffect(() => {
    //     getUser()
    // }, [])

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
