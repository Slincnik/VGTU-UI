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
          <span class="card-title-subtitle"> из {{ data?.questions?.length }} </span>
        </v-card-title>
        <v-card-text class="mt-3">
          <span>{{ actualQuestion?.title }}</span>
          <template v-if="actualQuestion?.type === SurveyQuestionType.Enum.TEXT">
            <v-text-field
              v-model="textResponse"
              class="mt-4"
              variant="outlined"
              placeholder="Ваш ответ"
              required
            />
          </template>
          <template v-else-if="actualQuestion?.type === SurveyQuestionType.Enum.CHOICE">
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
          <template v-else-if="actualQuestion?.type === SurveyQuestionType.Enum.MULTI_CHOICE">
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
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { SurveyQuestionType, type Survey } from '@/api/survey/survey.types'
import { finishingPassingSurvey, saveAnswerResponse } from '@/api/survey/survey.base'

const emits = defineEmits<{
  (e: 'updateQuestion'): void
}>()

const route = useRoute()

const index = defineModel<number>('index', { required: true })
const data = defineModel<Survey.Base>('data')
const actualQuestion = defineModel<Survey.Question>('actualQuestion')

const textResponse = ref<string>(actualQuestion.value?.answer?.text || '')
const choiceResponse = ref<string>(
  actualQuestion.value?.answer?.answerChoices?.filter(choice => choice.selected)[0]
    ?.questionChoiceId || ''
)
const multiChoiceResponse = ref<string[]>(
  actualQuestion.value?.answer?.answerChoices?.map(choice => choice.questionChoiceId!) || []
)

const isLastQuestion = computed(() => index.value + 1 === data.value?.questions?.length)

const renderTextBtn = computed(() => {
  if (isLastQuestion.value) return 'Завершить'
  return 'Следующий вопрос'
})

const checkDisabledBtn = computed(() => {
  if (actualQuestion.value?.type === SurveyQuestionType.Enum.TEXT) {
    return !textResponse.value || textResponse.value.trim() === ''
  }
  if (actualQuestion.value?.type === SurveyQuestionType.Enum.CHOICE) {
    return !choiceResponse.value || choiceResponse.value.trim() === ''
  }
  return multiChoiceResponse.value.length === 0
})

const saveAnswer = (isLast: boolean = false) => {
  const answer = reactive<Survey.Answer>({
    id: '',
    answerChoices: [],
    question: '',
    text: ''
  })
  const question = actualQuestion.value

  if (!question) return

  const baseAnswerData = {
    id: question.answer?.id,
    question: question.id
  }

  switch (question.type) {
    case SurveyQuestionType.Enum.TEXT:
      Object.assign(answer, {
        ...baseAnswerData,
        text: textResponse.value
      })
      break

    case SurveyQuestionType.Enum.CHOICE:
      Object.assign(answer, {
        ...baseAnswerData,
        answerChoices: question.choices?.map(choice => ({
          questionChoiceId: choice.id,
          selected: choiceResponse.value === choice.id
        }))
      })
      break

    case SurveyQuestionType.Enum.MULTI_CHOICE:
      Object.assign(answer, {
        ...baseAnswerData,
        answerChoices: question.choices?.map(choice => ({
          questionChoiceId: choice.id,
          selected: multiChoiceResponse.value.includes(choice.id)
        }))
      })
      break

    default:
      console.warn('Неизвестный тип вопроса:', question.type)
      break
  }

  if (isLast) {
    useQuery({
      queryKey: ['finishAnswer'],
      queryFn: () => finishingPassingSurvey(String(route.params.id), answer),
      gcTime: 0
    })
  }

  useQuery({
    queryKey: ['answer', route.params.id],
    queryFn: () => saveAnswerResponse(String(route.params.id), answer),
    gcTime: 0
  })
}

const previousQuestion = () => {
  if (index.value === 0) return
  index.value--
  emits('updateQuestion')
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    saveAnswer(true)
    return
  }

  index.value++
  emits('updateQuestion')
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
