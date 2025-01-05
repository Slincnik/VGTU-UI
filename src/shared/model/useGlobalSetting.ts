import { onMounted, reactive, toRefs, watch } from 'vue'
import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'

export const useGlobalSettings = defineStore('globalSettings', () => {
  const { mobile } = useDisplay()

  const state = reactive({
    drawer: false,
    rail: false
  })

  onMounted(() => {
    if (!mobile.value) {
      state.drawer = true
      state.rail = true
    }
  })

  watch(mobile, (newVal, oldVal) => {
    if (!newVal && oldVal) {
      if (!state.drawer && !state.rail) {
        state.drawer = true
        state.rail = true
      }
    } else if (newVal && !oldVal) {
      if (state.rail) {
        state.drawer = false
        state.rail = false
      }
      if (!state.rail && state.drawer) {
        state.drawer = true
      }
    }
  })

  return {
    ...toRefs(state)
  }
})
