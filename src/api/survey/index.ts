import { api } from '@/plugins/axios'
import type { BaseSortedResponse, Survey } from '@/plugins/axios.types'
import { useAuthStore } from '@/stores/authStore'

interface AxiosSurvey extends BaseSortedResponse {
  content: Survey[]
}

const authStore = useAuthStore()

export const getAllSurveys = async () => {
  const userId = authStore.id
  const response = await api.get<AxiosSurvey>(`survey/student?studentRecipient=${userId}`)

  return response.data.content
}
