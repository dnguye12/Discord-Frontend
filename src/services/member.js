import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


export const getMember = async (id) => {
    let query = baseUrl + `/member?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
    }
}

export const getMembersByServerId = async (id) => {
    let query = baseUrl + `/member/by-server-id?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateMemberRole = async (id, newRole) => {
    let query = baseUrl + `/member/update-role?id=${id}`

    try {
        const request = await axios.put(query, {
            newRole
        })
        return request.data
    } catch (error) {
        console.log(error)
    }
}