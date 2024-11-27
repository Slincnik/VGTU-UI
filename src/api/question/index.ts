import { api } from '@/service/api/api.service'
import { getStudentId } from '../student'
import { type Survey } from '../survey/survey.types'

export const getQuestionById = async (id: string | null) => {
  if (!id) return null

  const userId = await getStudentId()
  const { data } = await api.get<Survey.SurveyQuestion>(`survey/question/${id}/${userId}`)
  return data
}
