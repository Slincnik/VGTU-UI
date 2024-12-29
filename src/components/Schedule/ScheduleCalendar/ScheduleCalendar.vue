<template>
  <div>
    <schedule-x-calendar :calendar-app="calendarApp">
      <template #headerContent>
        <header-backward-navigation @update-date="updateDate" />
        <header-d-w-picker @update-view="updateView" />
      </template>
      <template #timeGridEvent="{ calendarEvent }">
        <calendar-event
          class="event"
          :event="calendarEvent"
        />
      </template>
    </schedule-x-calendar>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ScheduleXCalendar } from '@schedule-x/vue'
import HeaderBackwardNavigation from './HeaderContent/HeaderBackwardNavigation.vue'
import HeaderDWPicker from './HeaderContent/HeaderDWPicker.vue'
import CalendarEvent from './CalendarEvent.vue'
import { useCalendarSetup } from '@/composables/useCalendarSetup'
import '@schedule-x/theme-default/dist/index.css'

const { calendarApp, calendarEvents, calendarControls } = useCalendarSetup()

const updateDate = (date: string) => calendarControls.setDate(date)
const updateView = (view: string) => calendarControls.setView(view)
onMounted(() => {
  calendarEvents.set([
    {
      id: 1,
      title: 'Предмет с очень очень очень очень длинным названием',
      description: 'Лекция',
      start: '2024-09-09 08:00',
      end: '2024-09-09 09:35',
      location: 'Аудитория 101'
    },
    {
      id: 2,
      title: 'Предмет с очень очень очень очень длинным названием',
      description: 'Лекция',
      start: '2024-09-09 09:45',
      end: '2024-09-09 11:20',
      location: 'Аудитория 101'
    }
  ])
})
</script>

<style>
:root {
  --sx-border: none;
}

.sx__time-grid-event {
  user-select: auto;
  -webkit-user-select: auto;
}

.sx__calendar-header {
  margin: 20px 0 20px 0;
  padding: 0;
}

.schedule-x-event-content {
  white-space: normal;
  word-wrap: break-word;
  max-width: 200px;
}

.sx__calendar {
  border: none;
}

.sx__week-grid__date {
  flex-flow: row;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-bottom: 6px;

  > div {
    font-size: 16px;
    color: #000;
  }
}

.sx__week-grid__hour {
  font-size: 16px;
  > span {
    color: #000;
  }
}

.sx__week-grid__date--is-today {
  font-weight: 700;
  > .sx__week-grid__date-number {
    background-color: var(--color-accent-nord7);
    color: #000;
    border-radius: 50%;
  }
  > .sx__week-grid__day-name {
    color: #000;
  }
}
</style>
