import { defineStore } from 'pinia'
import type { Student } from '@/api/student/student.types'

export type UserStore = {
  id: string | null
  user: Student.User | null
  educations: Student.Education[]
  gradeBooks: Student.GradeBook[]
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: (): UserStore => ({
    id: null,
    user: null,
    educations: [],
    gradeBooks: []
  }),
  getters: {
    getUser: state => state.user
  },
  actions: {
    setStore(store: UserStore) {
      this.$patch(store)
    },
    setUserEducations(educations: Student.Education[]) {
      this.educations = educations
    }
  }
})
