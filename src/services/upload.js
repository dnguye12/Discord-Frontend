import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


export const getFile = async (name) => {
    let query = baseUrl + `/upload/files/${name}`

    try {
        const request = await axios.get(query)
        return request
    } catch (error) {
        console.log(error)
        return null
    }
}