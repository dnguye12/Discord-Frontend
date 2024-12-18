import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


export const getProfile = async (id) => {
    let query = baseUrl + `/profile?id=${id}`

    try {
        const request = await axios.get(query)
        return request
    } catch (error) {
        console.log(error)
        return null
    }
}

export const postProfile = async (id, name, imageUrl, email) => {
    let query = baseUrl + '/profile'
    try {
        const request = await axios.post(query, {
            id,
            name,
            imageUrl,
            email
        })
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const setProfileStatus = async(id, status, lastActive) => {
    let query = baseUrl + `/profile/status?id=${id}`
    try {
        const request = await axios.patch(query, {
            status,
            lastActive
        })

        return request.data
    }catch(error) {
        console.log(error)
    }
}