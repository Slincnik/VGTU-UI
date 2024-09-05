import { api } from '@/service/api/api.service'
import { useAuthStore, type UserStore } from '@/stores/authStore'
import { getDecodedToken } from '@/service/keycloak/auth.config'
import type { Student } from './student.types'

const authStore = useAuthStore()

export const getUser = async () => {
  const decodedToken = await getDecodedToken()
  const response = await api.get<UserStore>(`user/student/external/${decodedToken?.user_id}`)

  const transformedData: UserStore = {
    id: response.data.id,
    user: response.data.user,
    educations: []
  }

  authStore.setStore(transformedData)
  return transformedData
}

export const getUserEducations = async () => {
  const decodedToken = await getDecodedToken()
  const response = await api.get<Student.Education[]>(
    `user/student/education?externalUserId=${decodedToken?.user_id}`
  )

  authStore.setUserEducations(response.data)
  return response.data
}
