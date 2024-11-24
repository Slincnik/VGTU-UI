<template>
  <div class="d-flex justify-space-between">
    <span class="text-h5 font-weight-bold">Создание опроса</span>
  </div>

  <div class="mt-5">
    <v-text-field
      v-model="surveyData.name"
      variant="outlined"
      aria-autocomplete="none"
      placeholder="Введите название опроса"
      density="comfortable"
      hide-details="auto"
      :rules="[v => !!v || 'Название обязательно']"
      required
      :disabled="isPending"
    />
  </div>

  <div
    class="d-flex flex-wrap align-center mt-5 ga-4"
    :style="{ 'max-width': '800px' }"
  >
    <v-select
      v-model="surveyData.type"
      label="Выберите тип"
      variant="outlined"
      density="comfortable"
      hide-details
      required
      :items="SurveyType.values()"
      :item-title="item => SurveyType.getValue(item)"
      :item-value="item => item"
      class="flex-1-1-0"
      :style="{ 'min-width': '290px' }"
      :rules="[v => v.length > 0 || 'Нужно выбрать хотя бы один тип']"
      :disabled="isPending"
    >
      <template #selection="{ item }">
        <span class="text-subtitle-2">
          {{ SurveyType.getValue(item.raw) }}
        </span>
      </template>
    </v-select>
    <date-picker
      v-model="surveyData.dateStart"
      text="Дата начала"
      required
      class="flex-1-1-0"
      :style="{ 'min-width': '200px' }"
      :disabled="isPending"
    />
    <date-picker
      v-model="surveyData.dateEnd"
      text="Дата окончания"
      required
      class="flex-1-1-0"
      :style="{ 'min-width': '200px' }"
      :disabled="isPending"
    />
  </div>

  <v-autocomplete
    v-model="surveyData.groups"
    class="mt-5"
    label="Выберите группу"
    variant="outlined"
    density="comfortable"
    multiple
    hide-details
    required
    :item-value="item => item"
    item-title="title"
    :loading="isLoadingDictionary"
    :items="transformedItems"
    :width="425"
    :hide-no-data="isLoadingDictionary"
    :rules="[v => v.length > 0 || 'Нужно выбрать хотя бы одну группу']"
    :disabled="isPending"
    @update:menu="onMenuUpdate"
  >
    <template #selection="{ item, index }">
      <v-chip
        v-if="index < 2"
        color="#5E81AC"
        variant="flat"
        class="mr-2"
      >
        <span>{{ item.value.title }}</span>
      </v-chip>
      <span
        v-if="index === 2"
        class="text-grey text-subtitle-2 align-self-center"
      >
        (+{{ surveyData.groups.length - 2 }} еще)
      </span>
    </template>
  </v-autocomplete>

  <question-chips :questions="surveyData.questions" />

  <div class="mt-5 d-flex ga-4">
    <v-btn
      :ripple="false"
      :elevation="0"
      size="large"
      text="Назад"
      color="#ECEFF4"
      :loading="isPending"
      @click="$router.back()"
    />
    <v-btn
      :ripple="false"
      :elevation="0"
      :disabled="!isFormValid"
      text="Создать опрос"
      color="#5E81AC"
      size="large"
      :loading="isPending"
      @click="createSurvey"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import QuestionChips from './SurveyCreate/SurveyCreateChips.vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { getAllDictionary } from '@/api/dictionary'
import type { Dictionary } from '@/api/dictionary/dictionary.types'
import { SurveyMeta, SurveyType } from '@/api/survey/survey.types'
import { createSurveyMeta } from '@/api/survey'

// Данные опроса
const surveyData = reactive<SurveyMeta.Base>({
  name: '',
  type: null,
  dateStart: undefined,
  dateEnd: undefined,
  groups: [],
  questions: []
})

const router = useRouter()

const items = ref<Dictionary.StructureGroup[]>([])

const transformedItems = computed(() =>
  items.value.map(item => ({
    filterId: item.id,
    title: item.name
  }))
)

// Проверка, что все обязательные поля заполнены
const isFormValid = computed(() => {
  return (
    surveyData.name &&
    surveyData.dateStart &&
    surveyData.dateEnd &&
    surveyData.groups.length > 0 &&
    surveyData.questions.length > 0 &&
    new Date(surveyData.dateStart) < new Date(surveyData.dateEnd)
  )
})

// Загрузка данных словаря
const {
  data,
  isLoading: isLoadingDictionary,
  refetch
} = useQuery({
  queryKey: ['dictionaryGroups'],
  queryFn: getAllDictionary,
  enabled: false
})

const { isPending, mutate } = useMutation({
  mutationFn: (newSurvey: SurveyMeta.Base) => createSurveyMeta(newSurvey),
  onSuccess: () => {
    router.push('/surveys')
  }
})

const onMenuUpdate = async (isOpen: boolean) => {
  if (isOpen && !items.value.length) {
    refetch().then(() => {
      if (!data.value) return
      items.value = data.value
    })
  }
}

// Метод создания опроса
const createSurvey = () => {
  if (!isFormValid.value) return
  mutate(surveyData)
}
</script>
