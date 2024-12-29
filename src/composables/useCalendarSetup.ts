import { computed, reactive, type ComputedRef } from 'vue'
import { CalendarApp, createCalendar, createViewDay, createViewWeek } from '@schedule-x/calendar'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'

export enum Views {
  DAY = 'day',
  WEEK = 'week'
}

interface CalendarState {
  selectedDate: Date
  selectedView: Views
}

const state = reactive<CalendarState>({
  selectedDate: new Date(),
  selectedView: Views.WEEK
})

export const useCalendarSetup = (): {
  calendarApp: CalendarApp
  state: CalendarState
  formattedSelectedDate: ComputedRef<string>
  calendarControls: ReturnType<typeof createCalendarControlsPlugin>
  calendarEvents: ReturnType<typeof createEventsServicePlugin>
  setSelectedView: (view: Views) => void
  setSelectedDate: (date: Date) => void
} => {
  const formattedSelectedDate = computed(() => {
    const date = state.selectedDate
    return date.toISOString().split('T')[0]
  })

  const viewWeek = createViewWeek()

  const calendarControls = createCalendarControlsPlugin()
  const calendarEvents = createEventsServicePlugin()

  const calendarApp = createCalendar({
    selectedDate: formattedSelectedDate.value,
    locale: 'ru-RU',
    dayBoundaries: {
      start: '08:00',
      end: '20:00'
    },
    views: [createViewDay(), viewWeek],
    plugins: [calendarControls, calendarEvents],
    defaultView: viewWeek.name,
    weekOptions: {
      gridHeight: 823,
      timeAxisFormatOptions: { hour: 'numeric', minute: '2-digit' }
    }
  })

  const setSelectedView = (view: Views) => {
    state.selectedView = view
  }

  const setSelectedDate = (date: Date) => {
    state.selectedDate = date
  }

  return {
    calendarApp,
    state,
    formattedSelectedDate,
    calendarControls,
    calendarEvents,
    setSelectedView,
    setSelectedDate
  }
}
