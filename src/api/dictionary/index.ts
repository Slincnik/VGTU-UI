import { api, type ResponseEntity } from '@/service/api/api.service'
import type { Dictionary } from './dictionary.types'

export const getAllDictionary = async () => {
  const response = await api.get<ResponseEntity<Dictionary.StructureGroup[]>>(
    'dictionary/structure/group/all?size=999999'
  )

  return response.data
}
