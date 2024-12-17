import { api, type ResponseEntity } from '@/service/api/api.service'
import { type Survey } from './survey.types'
import { getStudentId } from '../student'

export const getAllStudentSurveys = async () => {
  const userId = await getStudentId()

  const response = await api.get<ResponseEntity<Survey.Base[]>>(`survey/all?student=${userId}`)

  return response.data.content
}

export const getSurveyByIdAndStudent = async (id: string) => {
  const userId = await getStudentId()

  const response = await api.get<Survey.Base>(`survey/${id}/${userId}`)

  return response.data
}

export const saveAnswerResponse = async (id: string, answer: Survey.Answer) => {
  const response = await api.post<Survey.Answer>(`survey/answer/${id}`, answer)

  return response.data
}

export const finishingPassingSurvey = async (id: string, answer: Survey.Answer) => {
  const response = await api.put(`survey/answer/${id}/finished`, answer)

  return response.data
}
