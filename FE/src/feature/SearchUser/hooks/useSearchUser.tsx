import { useState } from 'react'
import { setAuthTokenLogin } from '../../../libs/api';
import { API } from '../../../libs/api';

export default function useSearchUser() {

    const [searchQuery, setSearchQuery] = useState<any>("");
    const [searchResults, setSearchResults] = useState<any>([]);

    setAuthTokenLogin(localStorage.token);

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
        handleSearch(query);
    };

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
    };
}
