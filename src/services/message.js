import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


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
    let query = baseUrl + `/message/delete?id=${id}`
    console.log(query)
    try {
        const request = await axios.put(query)
        return request
    } catch (error) {
        console.log(error)
    }
}