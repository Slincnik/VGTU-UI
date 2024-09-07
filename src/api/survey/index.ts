import { useQueryClient } from '@tanstack/vue-query'
import { api, type ResponseEntity } from '@/service/api/api.service'
import { useAuthStore } from '@/stores/authStore'
import type { Survey, SurveyMeta } from './survey.types'
import { getUser } from '../student'

const authStore = useAuthStore()

export const getUserId = async () => {
  let userId = authStore.id
  const queryClient = useQueryClient()

  if (!userId) {
    const { id } = await queryClient.fetchQuery({ queryKey: ['user'], queryFn: getUser })
    userId = id
  }
  return userId
}

export const getAllStudentSurveys = async () => {
  const userId = await getUserId()

  const response = await api.get<ResponseEntity<Survey.BaseSurvey[]>>(
    `survey/student?studentRecipient=${userId}`
  )

  return response.data.content
}

export const createSurveyMeta = async (dto: SurveyMeta.Base) => {
  const response = await api.post('survey/metadata', dto)
  return response.data
}

export const getSurveyByIdAndStudent = async (id: string) => {
  const userId = await getUserId()

  const response = await api.get<Survey.BaseSurvey>(`survey/${id}/${userId}`)

  return response.data
}
