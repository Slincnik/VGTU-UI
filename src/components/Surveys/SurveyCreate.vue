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
      :disabled="isDisabled"
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
      :items="surveyTypes"
      :item-title="item => SurveyType.getValue(item)"
      :item-value="item => item"
      class="flex-1-1-0"
      :style="{ 'min-width': '290px' }"
      :rules="[v => v.length > 0 || 'Нужно выбрать хотя бы один тип']"
      :disabled="isDisabled"
    >
      <template #selection="{ item }">
        <span class="text-subtitle-2">
          {{ SurveyType.getValue(item.raw) }}
        </span>
      </template>
    </v-select>
    <date-picker
      v-model="surveyData.startDate"
      text="Дата начала"
      required
      class="flex-1-1-0"
      :style="{ 'min-width': '200px' }"
      :disabled="isDisabled"
    />
    <date-picker
      v-model="surveyData.endDate"
      text="Дата окончания"
      required
      class="flex-1-1-0"
      :style="{ 'min-width': '200px' }"
      :disabled="isDisabled"
    />
  </div>

  <v-autocomplete
    v-model="surveyData.filters"
    class="mt-5"
    label="Выберите группу"
    variant="outlined"
    density="comfortable"
    item-title="title"
    multiple
    hide-details
    required
    :item-value="item => item"
    :loading="isLoadingDictionary"
    :items
    :width="425"
    :rules="[v => v.length > 0 || 'Нужно выбрать хотя бы одну группу']"
    :disabled="isDisabled"
    @update:search="val => (search = val)"
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
        (+{{ surveyData.filters.length - 2 }} еще)
      </span>
    </template>
  </v-autocomplete>

  <question-chips
    :questions="surveyData.questions"
    :disabled="isDisabled"
  />

  <div class="mt-5 d-flex ga-4">
    <v-btn
      :ripple="false"
      :elevation="0"
      size="large"
      text="Назад"
      color="#ECEFF4"
      :loading="isDisabled"
      @click="$router.back()"
    />
    <v-btn
      :ripple="false"
      :elevation="0"
      :disabled="!isFormValid"
      :text="!isSurveyExist ? 'Создать опрос' : 'Изменить опрос'"
      color="#5E81AC"
      size="large"
      :loading="isDisabled"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { SurveyType } from '@/api/survey/survey.types'
import { useSurveyForm } from '@/composables/useSurveyForm'
import QuestionChips from './SurveyCreate/SurveyCreateChips.vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'

const {
  surveyData,
  search,
  items,
  isLoadingDictionary,
  isSurveyExist,
  isFormValid,
  isDisabled,
  handleClick
} = useSurveyForm()

const surveyTypes = SurveyType.values()
</script>
