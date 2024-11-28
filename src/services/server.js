import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

export const getOneServerByProfile = async (id) => {
    let query = baseUrl + `/server/one-by-profile?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllServersByProfile = async (id) => {
    let query = baseUrl + `/server/all-by-profile?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createServer = async (name, imageUrl, profileId) => {
    let query = baseUrl + `/server`

    try {
        const request = await axios.post(query, {
            name,
            imageUrl,
            profileId
        })
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}