import { api } from '@/service/api/api.service'

export const getScheduleByGradeBookId = async (gradeBookId: string) => {
  const response = await api.get(`schedule/study/schedule/semester/${gradeBookId}`)
  return response.data
}
