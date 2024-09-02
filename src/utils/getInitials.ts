import type { User as UserClient } from 'oidc-client-ts'
import { computed } from 'vue'
import type { User as UserStore } from '@/plugins/axios.types'

export const getInitials = (user: UserClient | UserStore | null) =>
  computed(() => {
    if (!user) return ''

    if ('profile' in user) {
      return `${user.profile.family_name?.charAt(0)}${user.profile.given_name?.charAt(0)}`
    }

    if ('lastName' in user && 'firstName' in user) {
      return `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
    }

    return ''
  }).value
