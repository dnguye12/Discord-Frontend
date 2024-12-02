import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

export const getServerById = async (id) => {
    let query = baseUrl + `/server?id=${id}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
        return null
    }
}

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

export const generateNewInviteCode = async (id, userId) => {
    let query = baseUrl + `/server/invite-code?id=${id}`

    try {
        const request = await axios.put(query, {
            userId
        })
        return request.data
    } catch (error) {
        console.log(error)
    }
}

export const getServerByInviteCode = async (invite) => {
    let query = baseUrl + `/server/one-by-invite-code?invite=${invite}`

    try {
        const request = await axios.get(query)
        return request.data
    } catch (error) {
        console.log(error)
    }
}

export const addMember = async (id, role, profileId) => {
    let query = baseUrl + `/server/add-member?id=${id}`

    try {
        const request = await axios.put(query, {
            role,
            profileId
        })
        return request.data
    } catch (error) {
        console.log(error)
    }
}

export const updateSettings = async (id, name, imageUrl) => {
    let query = baseUrl + `/server/update-settings?id=${id}`

    try {
        const request = await axios.put(query, {
            name,
            imageUrl
        })

        return request.data
    } catch (error) {
        console.log(error)
    }
}