import { userApi } from '@/entities/User'
import { type ResponseEntity, api } from '@/shared/api'
import type { GradeBook } from './gradebook.types'

export const getGradebooks = async () => {
  const student = await userApi.getStudent()

  if (!student.gradeBooks.length) return null

  const uniqueGradeBooks = Array.from(new Set(student.gradeBooks.map(({ gradeBook }) => gradeBook)))
  const idParams = new URLSearchParams(
    uniqueGradeBooks.map(gradeBook => ['ids', gradeBook])
  ).toString()

  const response = await api.get<ResponseEntity<GradeBook[]>>(
    `statement/grade/book/all?${idParams}`
  )
  return response.data
}
