import axios, { AxiosError } from 'axios'
import { authManager, getToken } from '@/service/keycloak/auth.config'

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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        authManager.signinRedirect()
        break
      default:
        console.log(error)
        break
    }
    return Promise.reject(error)
  }
)
