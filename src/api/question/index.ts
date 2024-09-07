import { api } from '@/service/api/api.service'
import { getUserId } from '../survey'
import type { QuestionTemplate } from '../survey/survey.types'

export const getQuestionById = async (id: string | null) => {
  if (!id) return null
  const userId = await getUserId()
  const { data } = await api.get<QuestionTemplate>(`survey/question/${id}/${userId}`)
  return data
}
