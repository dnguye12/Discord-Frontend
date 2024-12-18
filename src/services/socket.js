import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


export const createMessage = async (userId, channelId, content, fileUrl) => {
    let query = baseUrl + `/socket/message`

    try {
        const request = await axios.post(query, {
            userId, channelId, content, fileUrl
        })
        return request
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createDirectMessage = async(userId, conversationId, content, fileUrl) => {
    let query = baseUrl + `/socket/direct-message`

    try {
        const request = await axios.post(query, {
            userId, conversationId, content, fileUrl
        })
        return request
    } catch (error) {
        console.log(error)
        return null
    }
}