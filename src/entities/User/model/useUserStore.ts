import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '../api/user.typing'

type UserStore = {
  id: string | null
  user: IUser.User | null
  educations: IUser.Education[]
  gradeBooks: IUser.GradeBook[]
}

export const useUserStore = defineStore('userStore', () => {
  const state = reactive<UserStore>({
    id: null,
    user: null,
    educations: [],
    gradeBooks: []
  })

  const getUser = () => state.user

  const setUserEducations = (educations: IUser.Education[]) => {
    state.educations = educations
  }

  return {
    ...toRefs(state),
    getUser,
    setUserEducations
  }
})
