import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

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