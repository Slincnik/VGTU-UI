<template>
  <div class="mt-5">
    <v-sheet
      tile
      min-width="200"
    >
      <v-card color="#ECEFF4">
        <v-card-title class="mt-3">
          <v-chip
            color="#5E81AC"
            variant="flat"
            :text="`${index + 1} вопрос`"
          />
          <span class="card-title-subtitle"> из {{ questionsLength }} </span>
        </v-card-title>
        <v-card-text class="mt-3">
          <span>{{ actualQuestion?.title }}</span>
          <template v-if="isTextQuestion">
            <v-text-field
              v-model="textResponse"
              class="mt-4"
              variant="outlined"
              placeholder="Ваш ответ"
              required
            />
          </template>
          <template v-else-if="isChoiceQuestion">
            <v-radio-group
              v-model="choiceResponse"
              class="mt-4"
              required
              hide-details
            >
              <v-radio
                v-for="choice in actualQuestion?.choices"
                :key="choice.id"
                :label="choice.title"
                :value="choice.id"
                density="comfortable"
              />
            </v-radio-group>
          </template>
          <template v-else-if="isMultiChoiceQuestion">
            <div class="mt-5">
              <v-checkbox-btn
                v-for="choice in actualQuestion?.choices"
                :key="choice.id"
                v-model="multiChoiceResponse"
                hide-details
                required
                density="comfortable"
                :label="choice.title"
                :value="choice.id"
              />
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-sheet>
    <div class="d-flex ga-4 mt-5">
      <v-btn
        :ripple="false"
        :elevation="0"
        variant="flat"
        :text="renderTextBtn"
        color="#5E81AC"
        :disabled="checkDisabledBtn"
        @click="nextQuestion"
      />
      <v-btn
        :ripple="false"
        :elevation="0"
        variant="flat"
        text="Назад"
        color="#ECEFF4"
        :disabled="index === 0"
        @click="previousQuestion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { SurveyQuestionType, type Survey } from '@/api/survey/survey.types'

const emits = defineEmits<{
  (
    e: 'updateQuestion',
    data: {
      isLast: boolean
      textResponse: string
      choiceResponse: string
      multiChoiceResponse: string[]
      question: Survey.Question
    }
  ): void
}>()

const index = defineModel<number>('index', { required: true })
const questionsLength = defineModel<number>('questionsLength', { required: true })
const actualQuestion = defineModel<Survey.Question>('actualQuestion', { required: true })

const textResponse = ref<string>('')
const choiceResponse = ref<string>('')
const multiChoiceResponse = ref<string[]>([])

const isLastQuestion = computed(() => index.value + 1 === questionsLength.value)
const isTextQuestion = computed(() => actualQuestion.value?.type === SurveyQuestionType.Enum.TEXT)
const isChoiceQuestion = computed(
  () => actualQuestion.value?.type === SurveyQuestionType.Enum.CHOICE
)
const isMultiChoiceQuestion = computed(
  () => actualQuestion.value?.type === SurveyQuestionType.Enum.MULTI_CHOICE
)

const renderTextBtn = computed(() => {
  if (isLastQuestion.value) return 'Завершить'
  return 'Следующий вопрос'
})

watchEffect(() => {
  if (!actualQuestion.value) return
  const { answer } = actualQuestion.value

  textResponse.value = answer?.text || ''
  choiceResponse.value =
    answer?.answerChoices?.find(choice => choice.selected)?.questionChoiceId || ''
  multiChoiceResponse.value = answer?.answerChoices?.map(choice => choice.questionChoiceId) || []
})

const resetResponses = () => {
  textResponse.value = ''
  choiceResponse.value = ''
  multiChoiceResponse.value = []
}

const checkDisabledBtn = computed(() => {
  if (actualQuestion.value?.type === SurveyQuestionType.Enum.TEXT) {
    return !textResponse.value || textResponse.value.trim() === ''
  }
  if (actualQuestion.value?.type === SurveyQuestionType.Enum.CHOICE) {
    return !choiceResponse.value || choiceResponse.value.trim() === ''
  }
  return multiChoiceResponse.value.length === 0
})

const previousQuestion = () => {
  if (index.value === 0) return
  index.value--
  emits('updateQuestion', {
    isLast: false,
    textResponse: textResponse.value,
    choiceResponse: choiceResponse.value,
    multiChoiceResponse: multiChoiceResponse.value,
    question: actualQuestion.value
  })
  resetResponses()
}

const nextQuestion = () => {
  const dataObject = {
    isLast: false,
    textResponse: textResponse.value,
    choiceResponse: choiceResponse.value,
    multiChoiceResponse: multiChoiceResponse.value,
    question: actualQuestion.value
  }

  if (isLastQuestion.value) {
    emits('updateQuestion', {
      ...dataObject,
      isLast: true
    })
    resetResponses()
    return
  }

  index.value++
  emits('updateQuestion', dataObject)
  resetResponses()
}
</script>

<style scoped>
.card-title-subtitle {
  font-size: 14px !important;
  font-weight: 400;
  line-height: 1.667;
  letter-spacing: 0.0333333333em !important;
  text-transform: none !important;
}
</style>
