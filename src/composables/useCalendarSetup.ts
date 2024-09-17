import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { CalendarApp, createCalendar, createViewDay, createViewWeek } from '@schedule-x/calendar'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'

export const useCalendarSetup = (): {
  calendarApp: CalendarApp
  selectedDate: Ref<Date>
  formattedSelectedDate: ComputedRef<string>
  selectedView: Ref<'day' | 'week'>
  calendarControls: ReturnType<typeof createCalendarControlsPlugin>
} => {
  const selectedDate = ref<Date>(new Date())
  const selectedView = ref<'day' | 'week'>('week')

  const formattedSelectedDate = computed(() => {
    const date = selectedDate.value
    return date.toISOString().split('T')[0]
  })

  const viewWeek = createViewWeek()

  const calendarControls = createCalendarControlsPlugin()

  const calendarApp = createCalendar({
    selectedDate: formattedSelectedDate.value,
    locale: 'ru-RU',
    dayBoundaries: {
      start: '08:00',
      end: '20:00'
    },
    views: [createViewDay(), viewWeek],
    plugins: [calendarControls],
    defaultView: viewWeek.name,
    weekOptions: {
      gridHeight: 823,
      timeAxisFormatOptions: { hour: 'numeric', minute: '2-digit' }
    },
    events: [
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
    ]
  })

  return {
    calendarApp,
    selectedDate,
    formattedSelectedDate,
    selectedView,
    calendarControls
  }
}
