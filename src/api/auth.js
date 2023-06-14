import axios from '@/api/axios.js'

const register = credentials => {
    return axios.post('/users', {user: credentials})
}
const login = credentials => {
    return axios.post('/users/login', {user: credentials})
}

const getCurrentUser = () => {
    return axios.get('/user')
}

const updateCurrentUser = (user) => {
    return axios.put('/user', {user})
    .then((response => response.data.user))
}

export default {
    register,
    login,
    getCurrentUser,
    updateCurrentUser
}