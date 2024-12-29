<template>
  <div>
    <span>Образовательная программа</span>
    <div class="mt-2 d-flex flex-wrap">
      <v-sheet
        v-for="(education, idx) in programData"
        :key="idx"
        class="pa-4 mb-0 fill-sheet"
        elevation="0"
        color="#ECEFF4"
      >
        <v-row
          v-for="(item, index) in education"
          :key="index"
        >
          <v-col
            class="py-2 px-2"
            cols="5"
          >
            <strong>{{ item.label }}</strong>
          </v-col>
          <v-col class="py-2 px-2">
            {{ item.value ?? 'Не указано' }}
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Student } from '@/api/student/student.types'

type Props = {
  educations: Student.Education[]
}

const { educations } = defineProps<Props>()

const programData = computed(() => {
  return educations.map(education => {
    const educationDateStart = new Date(education.dateStart).getUTCFullYear()

    return [
      { label: 'Программа', value: education.educationLevel },
      { label: 'Наименование программы', value: education.educationProfile },
      { label: 'Направление подготовки', value: education.educationDirection },
      { label: 'Курс', value: education.course },
      { label: 'Статус', value: education.educationStatus },
      { label: 'Форма обучения', value: education.educationForm },
      { label: 'Основание обучения', value: education.trainingBasis },
      { label: 'Год начала обучения', value: educationDateStart },
      { label: 'Зачетная книжка', value: education.gradeBook }
    ]
  })
})
</script>

<style scoped>
.fill-sheet {
  max-width: 500px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
