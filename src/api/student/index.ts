import { useQueryClient } from '@tanstack/vue-query'
import { api } from '@/service/api/api.service'
import { getDecodedToken } from '@/service/keycloak/auth.config'
import { type UserStore, useAuthStore } from '@/stores/authStore'
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

export const getStudent = async () => {
  const student = authStore.getUser
  const queryClient = useQueryClient()

  if (!student) {
    const stud = await queryClient.fetchQuery({ queryKey: ['user'], queryFn: getUser })
    return stud
  }

  return student
}

export const getStudentId = async () => {
  const studentId = authStore.id
  if (!studentId) {
    const { id } = await getStudent()
    return id
  }
  return studentId
}

export const getUserEducations = async () => {
  const decodedToken = await getDecodedToken()
  const response = await api.get<Student.Education[]>(
    `user/student/education?externalUserId=${decodedToken?.user_id}`
  )

  authStore.setUserEducations(response.data)
  return response.data
}
