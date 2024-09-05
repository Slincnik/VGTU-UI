import { useQueryClient } from '@tanstack/vue-query'
import { api, type ResponseEntity } from '@/service/api/api.service'
import { useAuthStore } from '@/stores/authStore'
import type { Survey } from './survey.types'
import { getUser } from '../student'

const authStore = useAuthStore()

export const getAllStudentSurveys = async () => {
  let userId = authStore.id
  const queryClient = useQueryClient()

  if (!userId) {
    const { id } = await queryClient.fetchQuery({ queryKey: ['user'], queryFn: getUser })
    userId = id
  }

  const response = await api.get<ResponseEntity<Survey.BaseSurvey[]>>(
    `survey/student?studentRecipient=${userId}`
  )

  return response.data.content
}
