import { useKeycloak } from '@josempgon/vue-keycloak'
import { useQuery } from '@tanstack/vue-query'
import { api } from '@/plugins/axios'
import { useAuthStore, type User } from '@/stores/authStore'

export const getUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { decodedToken } = useKeycloak()
      const authStore = useAuthStore()
      const response = await api.get<User>(`user/external/${decodedToken.value.user_id}`)

      authStore.setUser(response.data)
      return response
    }
  })
