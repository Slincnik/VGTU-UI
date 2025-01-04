import { useQueryClient } from '@tanstack/vue-query'
import { api } from '@/shared/api'
import { getDecodedToken } from '@/shared/service/auth'
import { useUserStore } from '../model/useUserStore'
import type { IUser } from './user.typing'

export const getUser = async () => {
  const userStore = useUserStore()
  const decodedToken = await getDecodedToken()
  const response = await api.get<IUser.Base>(`user/student/external/${decodedToken?.user_id}`)

  userStore.$patch({
    id: response.data.id,
    user: response.data.user,
    educations: [],
    gradeBooks: response.data.gradeBooks
  })

  return response.data
}

export const getStudent = async () => {
  const userStore = useUserStore()
  const queryClient = useQueryClient()

  if (!userStore.id) {
    const student = await queryClient.fetchQuery({ queryKey: ['user'], queryFn: getUser })
    return student
  }
  return userStore
}

export const getStudentId = async () => {
  const { id } = await getStudent()

  return id
}

export const getUserEducations = async () => {
  const userStore = useUserStore()
  const decodedToken = await getDecodedToken()
  const response = await api.get<IUser.Education[]>(
    `user/student/education?externalUserId=${decodedToken?.user_id}`
  )

  userStore.setUserEducations(response.data)
  return response.data
}
