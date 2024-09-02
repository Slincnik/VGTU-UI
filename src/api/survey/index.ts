import { api } from '@/plugins/axios'
import type { BaseSortedResponse, Survey } from '@/plugins/axios.types'
import { useAuthStore } from '@/stores/authStore'

interface AxiosSurvey extends BaseSortedResponse {
  content: Survey[]
}

const authStore = useAuthStore()

export const getAllSurveys = async () => {
  const user = authStore.getUser
  const response = await api.get<AxiosSurvey>(`survey/student?studentRecipient=${user?.id}`)

  return response.data.content
}
