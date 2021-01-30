import axios from 'axios'
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    // AUTH_LOGOUT,
    FIRST_AUTH_REQUEST,
    FIRST_AUTH_REQUEST_SUCCESS,
} from '@/store/action-types/user-info'

const actions = {
    [AUTH_REQUEST]: async ({ commit }) => {
        try {
            const response = await axios.get('/api/auth/signInByToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            commit(AUTH_SUCCESS, {
                ...response.data,
            })
        } catch (error) {
            localStorage.removeItem('token')
            throw error
        }
    },
    [FIRST_AUTH_REQUEST]: async ({ commit }, userCredentials) => {
        try {
            const response = await axios.post('/api/auth/signIn', {
                headers: {
                    'Content-Type': 'application/json',
                },
                email: userCredentials.email,
                password: userCredentials.password,
            })
            localStorage.setItem('token', response.data.accessToken)
            commit(FIRST_AUTH_REQUEST_SUCCESS, {
                ...response.data,
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default actions