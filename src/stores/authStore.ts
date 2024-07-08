import { defineStore } from 'pinia'

import type { KeycloakProfile } from 'keycloak-js'

export type UserStore = {
  user: KeycloakProfile | null
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): UserStore => ({
    accessToken: null,
    user: null,
    refreshToken: null
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!this.accessToken && !!this.refreshToken
    }
  },
  actions: {}
})
