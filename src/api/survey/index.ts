import { useQueryClient } from '@tanstack/vue-query'
import { api, type ResponseEntity } from '@/service/api/api.service'
import { useAuthStore } from '@/stores/authStore'
import { type Survey, type SurveyMeta } from './survey.types'
import { getUser } from '../student'

const authStore = useAuthStore()

export const getStudentId = async () => {
  const studentId = authStore.id
  const queryClient = useQueryClient()

  if (!studentId) {
    const { id } = await queryClient.fetchQuery({ queryKey: ['user'], queryFn: getUser })
    return id
  }
  return studentId
}

export const getAllStudentSurveys = async () => {
  const userId = await getStudentId()

  const response = await api.get<ResponseEntity<Survey.BaseSurvey[]>>(
    `survey/student?studentRecipient=${userId}`
  )

  return response.data.content
}

export const getAllSurveys = async () => {
  const response = await api.get<ResponseEntity<Survey.SurveyMeta[]>>('survey/metadata/all')

  return response.data.content
}

export const getSurveyById = async (id: string) => {
  const response = await api.get<SurveyMeta.Base>(`survey/metadata/${id}`)
  return response.data
}

export const createSurveyMeta = async (dto: SurveyMeta.Base) => {
  const response = await api.post('survey/metadata', dto)
  return response.data
}

export const updateSurveyMeta = async (dto: SurveyMeta.Base) => {
  const response = await api.put('survey/metadata', dto)
  return response.data
}

export const deleteSurveyMeta = async (id: string) => {
  await api.delete(`survey/metadata/${id}`)
}

export const downloadSurveyMeta = async (id: string) => {
  const response = await api.get<Blob>(`survey/metadata/download/${id}`, { responseType: 'blob' })
  return response.data
}

export const copySurveyMeta = async (id: string) => {
  const response = await api.put<SurveyMeta.Base>(`survey/metadata/copy/${id}`)
  return response.data
}

export const closeSurveyMeta = async (id: string) => {
  await api.put(`survey/metadata/close/${id}`)
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

export const publishSurvey = async (id: string) => {
  const response = await api.put(`survey/metadata/published/${id}`)

  return response.data
}
