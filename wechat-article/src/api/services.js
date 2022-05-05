import Axios from 'axios'

const axios = Axios.create({
    // baseURL: 'http://localhost:3004'
    baseURL: "/"
})


axios.interceptors.response.use((response) => {
    return response.data
})

const get = (url, params) => {
    return axios.get(url, params)
}

const post = (url, data) => axios.post(url, data)


export {
    get,
    post
}

