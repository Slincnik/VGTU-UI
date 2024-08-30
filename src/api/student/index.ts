import { useQuery } from '@tanstack/vue-query'
import { api } from '@/plugins/axios'
import { useAuthStore, type User } from '@/stores/authStore'
import { getDecodedToken } from '@/service/keycloak/auth.config'

export const getUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const decodedToken = await getDecodedToken()
      const authStore = useAuthStore()
      const response = await api.get<User>(`user/external/${decodedToken?.user_id}`)

      authStore.setUser(response.data)
      return response
    }
  })
