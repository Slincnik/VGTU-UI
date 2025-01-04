import type { ComputedRef } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { userApi } from '@/entities/User'

export const getUserEducations = (enabled: ComputedRef<boolean>) => {
  return useQuery({
    queryKey: ['studentEducation'],
    queryFn: userApi.getUserEducations,
    enabled,
    retry: 0
  })
}

export const getUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUser,
    retry: 0
  })
}
