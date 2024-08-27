import { defineStore } from 'pinia'

import KeyCloak, { type KeycloakTokenParsed } from 'keycloak-js'

export type UserStore = {
  keycloak: KeyCloak | null
  profile: KeycloakTokenParsed | null
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): UserStore => ({
    keycloak: null,
    profile: null
  }),
  actions: {
    setInstance(keycloak: KeyCloak) {
      this.keycloak = keycloak
    },
    setProfile(profile: KeycloakTokenParsed) {
      this.profile = profile
    }
  }
})
