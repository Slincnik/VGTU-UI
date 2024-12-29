<template>
  <div class="calendar-header">
    <v-btn
      icon
      elevation="0"
      size="small"
      :ripple="false"
      @click="changeDate(-1)"
    >
      <v-icon
        icon="custom:chevron_left"
        color="var(--color-accent-nord7)"
        size="36"
      />
    </v-btn>

    <span class="calendar-title">{{ formattedDate }}</span>

    <v-btn
      icon
      elevation="0"
      size="small"
      :ripple="false"
      @click="changeDate(1)"
    >
      <v-icon
        icon="custom:chevron_right"
        color="var(--color-accent-nord7)"
        size="36"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarSetup, Views } from '@/composables/useCalendarSetup'

const { state, setSelectedDate } = useCalendarSetup()

const emits = defineEmits<{
  (e: 'update-date', date: string): void
}>()

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
  const dateString = state.selectedDate.toLocaleDateString('ru-RU', options)
  return dateString.charAt(0).toUpperCase() + dateString.slice(1)
})

const changeDate = (increment: number) => {
  const newDate = new Date(state.selectedDate)
  if (state.selectedView === Views.DAY) {
    newDate.setDate(newDate.getDate() + increment)
  } else {
    // eslint-disable-next-line no-mixed-operators
    newDate.setDate(newDate.getDate() + increment * 7)
  }
  setSelectedDate(newDate)
  emits('update-date', newDate.toISOString().split('T')[0])
}
</script>

<style scoped>
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid var(--color-accent-nord7);
  border-radius: 8px;
}

.calendar-title {
  font-size: 16px;
  font-family: 'Fira Sans', sans-serif;
  font-weight: 400;
}
</style>
