<template>
  <div class="dw-picker">
    <v-btn-toggle
      v-model="state.selectedView"
      :ripple="false"
      selected-class="dw-picker--selected"
      class="dw-picker"
    >
      <v-btn value="day">День</v-btn>
      <v-btn
        v-if="!isMobileView"
        value="week"
        >Неделя</v-btn
      >
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { Views, useCalendarSetup } from '@/features/schedule'

const emit = defineEmits<{
  (e: 'update-view', view: Views): void
}>()

const { width } = useDisplay()

const { setSelectedView, state } = useCalendarSetup()

const isMobileView = computed(() => {
  return width.value < 757
})

watch(
  isMobileView,
  newValue => {
    if (newValue) {
      setSelectedView(Views.DAY)
      emit('update-view', Views.DAY)
    }
  },
  { immediate: true }
)

watch(
  () => state.selectedView,
  (newValue, oldValue) => {
    if (newValue === oldValue) return
    if (!newValue) return
    emit('update-view', newValue)
  }
)
</script>

<style scoped>
.dw-picker {
  display: flex;
  gap: 12px;
  > button {
    border: 2px solid var(--color-accent-nord7);
    border-radius: 8px;
  }
}
.dw-picker--selected {
  background-color: var(--color-accent-nord7);
}
</style>
