import { useState, useEffect } from 'react'
import { API } from '../../../libs/api'
import { useParams } from 'react-router-dom'
import { IUser } from '../../../interface/UserInterface'

export function useProfileOthers() {
    const { id } = useParams()
    const [user, setUser] = useState<IUser>()


    async function getUser() {
        try {
            const response = await API.get(`/user/detail/${id}`)
            setUser(response.data)
        } catch (error) {
            console.error
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return {
        user
    }
}
