import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

export const getMessages = async (userId, channelId, cursor) => {
    let query = baseUrl + `/message?userId=${userId}&channelId=${channelId}&cursor=${cursor}`

    try {
        const request = await axios.get(query)
        return request
    } catch (error) {
        console.log(error)
    }
}

export const updateContent = async (id, newContent, channelId) => {
    let query = baseUrl + `/message/edit-content?id=${id}`

    try {
        const request = await axios.patch(query, { newContent, channelId })
        return request
    } catch (error) {
        console.log(error)
    }
}

export const deleteMessage = async (id) => {
    let query = baseUrl + `/message?id=${id}`
    console.log(query)
    try {
        const request = await axios.delete(query)
        return request
    } catch (error) {
        console.log(error)
    }
}