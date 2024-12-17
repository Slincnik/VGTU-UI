<template>
  <div class="d-flex justify-space-between">
    <span class="text-h5 font-weight-bold">Опрос</span>
  </div>
  <div
    v-if="isSurveyLoading"
    class="d-flex justify-center align-center"
  >
    <v-progress-circular indeterminate />
  </div>

  <survey-passing-card
    v-else-if="actualQuestion && data"
    v-model:index="index"
    :questions-length="data.questions.length"
    :actual-question="actualQuestion"
    @update-question="saveAnswer"
  />
  <div v-else>
    <v-sheet
      class="pa-12 mx-auto"
      tile
      max-width="600"
    >
      <v-card
        class="mx-auto px-6 py-8"
        :elevation="0"
        color="#ECEFF4"
      >
        <v-card-title class="text-center mb-4"> Опрос недоступен </v-card-title>
        <v-card-text class="text-center">
          Возможно, опрос уже завершен или еще не начался.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            :ripple="false"
            :elevation="0"
            variant="flat"
            text="Назад"
            color="#5E81AC"
            @click="$router.back()"
          />
        </v-card-actions>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { finishingPassingSurvey, getSurveyById, saveAnswerResponse } from '@/api/survey/survey.base'
import SurveyPassingCard from './SurveyPassingCard.vue'
import { SurveyQuestionType, SurveyStatus, type Survey } from '@/api/survey/survey.types'

type EmitData = {
  isLast: boolean
  textResponse: string
  choiceResponse: string
  multiChoiceResponse: string[]
  question: Survey.Question
}

const route = useRoute()
const router = useRouter()
const index = ref(0)
const client = useQueryClient()

const { isLoading: isSurveyLoading, data } = useQuery({
  queryKey: ['surveyQuestion', route.params.id],
  queryFn: () => getSurveyById(route.params.id as string),
  retry: 1
})
const actualQuestion = computed(() => data.value?.questions?.[index.value] ?? null)

const saveAnswer = async (object: EmitData) => {
  if (object.question.answer) return

  const answer = {
    id: '',
    answerChoices: [],
    question: '',
    text: ''
  }

  const baseAnswerData = {
    question: object.question.id
  }

  const buildAnswerChoices = (choices: Survey.QuestionChoices[], selectedIds: string[] | string) =>
    choices?.map(choice => ({
      questionChoiceId: choice.id,
      selected: Array.isArray(selectedIds)
        ? selectedIds.includes(choice.id)
        : selectedIds === choice.id
    }))

  switch (object.question.type) {
    case SurveyQuestionType.Enum.TEXT:
      Object.assign(answer, { ...baseAnswerData, text: object.textResponse })
      break
    case SurveyQuestionType.Enum.CHOICE:
      Object.assign(answer, {
        ...baseAnswerData,
        answerChoices: buildAnswerChoices(object.question.choices, object.choiceResponse)
      })
      break
    case SurveyQuestionType.Enum.MULTI_CHOICE:
      Object.assign(answer, {
        ...baseAnswerData,
        answerChoices: buildAnswerChoices(object.question.choices, object.multiChoiceResponse)
      })
      break
    default:
      console.warn('Неизвестный тип вопроса:', object.question.type)
  }

  if (object.isLast) {
    finishingPassingSurvey(answer)
    router.push('/surveys')
    client.setQueryData(['surveys'], (oldData: Survey.Base[]) =>
      oldData.map(s => (s.id === data.value?.id ? { ...s, status: SurveyStatus.Enum.FINISHED } : s))
    )
  }

  const answerResponse = await saveAnswerResponse(answer)

  client.setQueryData(['surveyQuestion', route.params.id], (oldData: Survey.Base) => {
    if (!oldData) return null // На случай, если данные отсутствуют
    const newQuestions = oldData.questions.map(q =>
      q.id === object.question?.id ? { ...q, answer: answerResponse } : q
    )
    return {
      ...oldData,
      questions: newQuestions
    }
  })
}
</script>
