import { type ResponseEntity, api } from '@/service/api/api.service'
import { getStudentId } from '../student'
import { type Survey } from './survey.types'

export const getAllStudentSurveys = async () => {
  const userId = await getStudentId()

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
