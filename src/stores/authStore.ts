import { defineStore } from 'pinia'
import type { GradeBook, User, UserEducation } from '@/plugins/axios.types'

export type UserStore = {
  id: string | null
  user: User | null
  gradeBooksIds: Array<string>
  gradeBooks: GradeBook[]
  educations: UserEducation[]
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): UserStore => ({
    id: null,
    user: null,
    gradeBooksIds: [],
    gradeBooks: [],
    educations: []
  }),
  getters: {
    getUser: state => state.user,
    getGradeBooksIds: state =>
      state.gradeBooksIds.map(studentGradeBook => `ids=${studentGradeBook}`).join('&')
  },
  actions: {
    setStore(store: UserStore) {
      this.$patch(store)
    },
    setGradebooks(gradeBooks: GradeBook[]) {
      this.gradeBooks = gradeBooks
    },
    setUserEducations(educations: UserEducation[]) {
      this.educations = educations
    }
  }
})
