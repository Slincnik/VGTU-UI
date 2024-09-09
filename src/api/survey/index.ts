import { api, type ResponseEntity } from '@/service/api/api.service'
import { type Survey, type SurveyMeta } from './survey.types'
import { getStudentId } from '../student'

export const fakeApiFunction = async (callback: () => void): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = callback()
      resolve(result)
    }, 1000)
  })
}

export const getAllStudentSurveys = async () => {
  const userId = await getStudentId()

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
  const userId = await getStudentId()

  const response = await api.get<Survey.BaseSurvey>(`survey/${id}/${userId}`)

  return response.data
}

export const saveAnswerResponse = async (id: string, answer: Survey.SurveyAnswer) => {
  const studentId = await getStudentId()

  if (!studentId) return null

  answer.student = studentId

  const response = await api.post<Survey.SurveyAnswer>(`survey/answer/${id}`, answer)

  return response.data
}

export const finishingPassingSurvey = async (id: string, answer: Survey.SurveyAnswer) => {
  const studentId = await getStudentId()

  if (!studentId) return null

  answer.student = studentId

  const response = await api.put(`survey/answer/${id}/finished`, answer)

  return response.data
}
