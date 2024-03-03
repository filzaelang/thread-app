import React, { useState, useEffect } from 'react'
import { API } from '../../../libs/api'

export function useSugestedAccount() {

    const [sugestedAccount, setSugestedAcount] = useState<any>([])

    async function getSugestedAccount() {
        try {
            const response = await API.get(`/user/sugestedAccount`)
            console.log(response)
            setSugestedAcount(response.data)
        } catch (error) {
            console.error("Error getting sugestion error:", error)
        }
    }

    useEffect(() => {
        getSugestedAccount()
    }, [])

    return {
        sugestedAccount
    }
}
