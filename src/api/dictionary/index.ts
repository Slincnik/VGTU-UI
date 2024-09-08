import { api } from '@/service/api/api.service'
import type { Dictionary } from './dictionary.types'

export const getAllDictionary = async () => {
  const response = await api.post<Dictionary.StructureGroup[]>('dictionary/structure/group/all', {
    isDummy: false
  })

  return response.data
}
