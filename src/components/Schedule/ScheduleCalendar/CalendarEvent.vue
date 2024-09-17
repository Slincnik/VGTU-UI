<template>
  <div class="date-time-event">
    <span>{{ event.title }}</span>
    <span class="description">{{ event.description }}</span>
    <span
    >{{
      new Intl.DateTimeFormat('ru-RU', {
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date(event.start))
    }}
      -
      {{
        new Intl.DateTimeFormat('ru-RU', {
          hour: 'numeric',
          minute: '2-digit'
        }).format(new Date(event.end))
      }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { type CalendarEvent } from '@schedule-x/calendar'

defineProps<{
  event: CalendarEvent
}>()
</script>

<style scoped>
.date-time-event {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent-nord7);
  text-align: center;
  gap: 2px;
  border-radius: 8px;
  cursor: auto;
  > span {
    font-size: 12px;
    font-weight: 700;
  }
  .description {
    font-size: 11px;
    font-weight: 500;
  }
}
</style>
