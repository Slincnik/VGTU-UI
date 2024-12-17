import { api, type ResponseEntity } from '@/service/api/api.service'
import { type SurveyMeta, type SurveyMetaDTO } from './survey.types'

export const getAllSurveysMeta = async () => {
  const response = await api.get<ResponseEntity<SurveyMeta.Base[]>>('survey/metadata/all')

  return response.data.content
}

export const getSurveyMetaById = async (id: string) => {
  const response = await api.get<SurveyMeta.Base>(`survey/metadata/${id}`)
  return response.data
}

export const createSurveyMeta = async (dto: SurveyMetaDTO) => {
  const response = await api.post<SurveyMeta.Base>('survey/metadata', dto)
  return response.data
}

export const updateSurveyMeta = async (dto: SurveyMetaDTO) => {
  const response = await api.put<SurveyMeta.Base>('survey/metadata', dto)
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

export const publishSurveyMeta = async (id: string) => {
  await api.put(`survey/metadata/published/${id}`)
}
