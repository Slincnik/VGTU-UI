import { api, type ResponseEntity } from '@/service/api/api.service'
import type { Dictionary } from './dictionary.types'

export const getDictionaryByName = async (name: string) => {
  const response = await api.get<ResponseEntity<Dictionary.StructureGroup[]>>(
    `dictionary/structure/group/all?name=${name}`
  )
  return response.data
}
