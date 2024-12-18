import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL

/*
  Connection with backend
  Use services for easier editing
*/


export const getTopUsers = async(id) => {
    let query = baseUrl + `/server-stats/top-users?id=${id}`

    try {
        const request = await axios.get(query)

        return request.data
    }catch(error) {
        console.log(error)
    }
}

export const getRoleCount = async(id) => {
    let query = baseUrl + `/server-stats/role-counts?id=${id}`

    try {
        const request = await axios.get(query)

        return request.data
    }catch(error) {
        console.log(error)
    }
}

export const getMemberGrowth = async(id) =>  {
    let query = baseUrl + `/server-stats/member-growth?id=${id}`

    try {
        const request = await axios.get(query)

        return request.data
    }catch(error) {
        console.log(error)
    }
}