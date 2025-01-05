import { type Survey } from '@/entities/Survey'
import { userApi } from '@/entities/User'
import { type ResponseEntity, api } from '@/shared/api'

export const getAllStudentSurveys = async () => {
  const userId = await userApi.getStudentId()

  const response = await api.get<ResponseEntity<Survey.Base[]>>(`survey/all?student=${userId}`)

  return response.data.content
}

export const getSurveyById = async (id: string) => {
  const response = await api.get<Survey.Base>(`survey/${id}`)

  return response.data
}

export const saveAnswerResponse = async (answer: Survey.Answer) => {
  const response = await api.post<Survey.Answer>(`survey/answer`, answer)

  return response.data
}

export const finishingPassingSurvey = async (answer: Survey.Answer) => {
  const response = await api.post(`survey/answer/finished`, answer)

  return response.data
}
