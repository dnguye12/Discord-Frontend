import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

export const getMembersByServerId = async(id) => {
    let query = baseUrl + `/member/by-server-id?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    }catch(error) {
        console.log(error)
        return null
    }
}