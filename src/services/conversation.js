import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

export const getConversation = async (id) => {
    let query = baseUrl + `/conversation?id=${id}`

    try {
        const request = await axios.get(query)

        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const findConversationWithMembers = async (profile) => {
    let query = baseUrl + `/conversation/find-with-profile`

    try {
        const request = await axios.get(query, {
            params: {
                profile
            }
        })
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createConversation = async(profileOne, profileTwo) => {
    let query = baseUrl + `/conversation`

    try {
        const request = await axios.post(query, {
            profileOne,
            profileTwo
        })
        return request.data
    }catch(error) {
        console.log(error)
    }
}