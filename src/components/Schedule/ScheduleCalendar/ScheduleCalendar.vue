<template>
  <div class="d-flex">
    <span class="text-h5">Расписание</span>
  </div>
  <div
    v-if="isLoading"
    class="d-flex justify-center align-center"
  >
    <v-progress-circular
      indeterminate
      size="36"
    />
  </div>
  <div
    v-else
    class="mt2-5"
  >
    <v-select
      v-model="selectedGradebook"
      :items="gradebooks"
      item-title="number"
      item-value="id"
      density="comfortable"
      placeholder="Выберите зачетку"
    />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { getGradebooks } from '@/api/gradebook'
import { getScheduleByGradeBookId } from '@/api/schedule'

const selectedGradebook = ref<string | null>(null)

const isGradebookSelected = computed(() => selectedGradebook.value !== null)

const { data: gradebooks, isLoading } = useQuery({
  queryKey: ['gradebooks'],
  queryFn: () => getGradebooks(),
  select(data) {
    return data?.content.filter(gradebook => !gradebook.isDummy)
  },
  retry: 0
})

useQuery({
  queryKey: ['schedule', selectedGradebook],
  queryFn: () => getScheduleByGradeBookId(selectedGradebook.value!),
  enabled: isGradebookSelected,
  retry: 0
})
</script>

<style scoped>
.mt2-5 {
  margin-top: 10px;
}
</style>
