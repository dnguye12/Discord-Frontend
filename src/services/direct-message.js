import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


export const getDirectMessages = async (userId, conversationId, cursor) => {
    let query = baseUrl + `/direct-message?userId=${userId}&conversationId=${conversationId}&cursor=${cursor}`

    try {
        const request = await axios.get(query)
        return request
    } catch (error) {
        console.log(error)
    }
}

export const updateDirectContent = async (id, newContent, conversationId) => {
    let query = baseUrl + `/direct-message/edit-content?id=${id}`

    try {
        const request = await axios.patch(query, { newContent, conversationId })
        return request
    } catch (error) {
        console.log(error)
    }
}

export const deleteDirectMessage = async (id) => {
    let query = baseUrl + `/direct-message/delete?id=${id}`
    console.log(query)
    try {
        const request = await axios.put(query)
        return request
    } catch (error) {
        console.log(error)
    }
}