import { api } from '@/plugins/axios'
import { useAuthStore, type UserStore } from '@/stores/authStore'
import { getDecodedToken } from '@/service/keycloak/auth.config'
import type { BaseSortedResponse, GradeBook, UserEducation } from '@/plugins/axios.types'

interface AxiosGradeBook extends BaseSortedResponse {
  content: GradeBook[]
}

const authStore = useAuthStore()

export const getUser = async () => {
  const decodedToken = await getDecodedToken()
  const response = await api.get<UserStore>(`user/student/external/${decodedToken?.user_id}`)

  const transformedData: UserStore = {
    id: response.data.id,
    user: response.data.user,
    gradeBooksIds: response.data.gradeBooks.map(gradebook => gradebook.id),
    gradeBooks: response.data.gradeBooks,
    educations: []
  }

  authStore.setStore(transformedData)
  return response.data
}

export const getGrandbooks = async () => {
  const gradeBooks = authStore.getGradeBooksIds
  const response = await api.get<AxiosGradeBook>(`statement/grade/book/all?${gradeBooks}`)

  authStore.setGradebooks(response.data.content)
  return response.data
}

export const getUserEducations = async () => {
  const decodedToken = await getDecodedToken()
  const response = await api.get<UserEducation[]>(
    `user/student/education?externalUserId=${decodedToken?.user_id}`
  )

  authStore.setUserEducations(response.data)
  return response.data
}
