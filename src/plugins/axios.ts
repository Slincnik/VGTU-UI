import { getToken } from '@josempgon/vue-keycloak'
import axios, { AxiosError } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.response.use(
  async config => {
    const token = await getToken()

    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      default:
        console.log(error)
        break
    }
    return Promise.reject(error)
  }
)
