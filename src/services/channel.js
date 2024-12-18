import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/

export const getChannel = async(id) => {
    let query = baseUrl + `/channel?id=${id}`

    try {
        const request = await axios.get(query)

        return request.data
    }catch(error) {
        console.log(error)
    }
}

export const deleteChannel = async (id, userId) => {
    let query = baseUrl + `/channel?id=${id}`

    try {
        const request = await axios.put(query, {
            userId
        })
        return request.data
    } catch (error) {
        console.log(error)
    }
}

export const getChannelsByServerId = async (id) => {
    let query = baseUrl + `/channel/by-server-id?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const editChannelName = async(id, newName, userId) => {
    let query = baseUrl + `/channel/edit-name?id=${id}`

    try {
        const request = await axios.put(query, {
            newName,
            userId
        })

        return request.data
    }catch (error) {
        console.log(error)
    }
}