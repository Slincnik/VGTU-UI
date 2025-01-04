<template>
  <v-select
    v-model="selectedGradebook"
    :items="gradebooks"
    item-title="number"
    item-value="id"
    density="comfortable"
    variant="outlined"
    placeholder="Выберите зачетку"
    hide-details
  />
</template>

<script setup lang="ts">
import { gradeBookTypes } from '@/features/schedule'

defineProps<{
  gradebooks?: gradeBookTypes.GradeBook[]
}>()

const selectedGradebook = defineModel<string | null>('selectedGradebook', {
  default: null,
  required: true
})
</script>
