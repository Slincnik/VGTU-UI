import axios, { AxiosError } from 'axios'
import { authManager, getToken } from '@/service/keycloak/auth.config'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

api.interceptors.request.use(async config => {
  const token = await getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  async config => {
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

export interface ResponseEntity<T> {
  content: T
  pageable: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}
