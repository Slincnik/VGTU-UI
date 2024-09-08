import { api } from '@/service/api/api.service'
import { getStudentId } from '../survey'
import { type Survey } from '../survey/survey.types'

export const fakeApiFunction = async (callback: () => void): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = callback()
      resolve(result)
    }, 1000)
  })
}

export const getQuestionById = async (id: string | null) => {
  if (!id) return null

  const userId = await getStudentId()
  const { data } = await api.get<Survey.SurveyQuestion>(`survey/question/${id}/${userId}`)
  return data
}
