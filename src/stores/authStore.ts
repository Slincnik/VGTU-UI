import { defineStore } from 'pinia'

export type User = {
  id: string
  externalId: string
  isDummy: true
  lastModifyDate: Date
  firstName: string
  lastName: string
  middleName: string
  username: string
  email: string
}

export type UserStore = {
  user: User | null
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): UserStore => ({
    user: null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    }
  }
})
