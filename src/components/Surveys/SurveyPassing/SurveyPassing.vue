<template>
  <div class="d-flex justify-space-between">
    <span class="text-h5 font-weight-bold">Опрос</span>
  </div>
  <div
    v-if="isSurveyLoading || isQuestionLoading"
    class="d-flex justify-center align-center"
  >
    <v-progress-circular indeterminate />
  </div>

  <survey-passing-card
    v-else-if="actualQuestion"
    v-model:index="index"
    :data
    :actual-question="actualQuestion"
    @update-question="refetch()"
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
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getSurveyByIdAndStudent } from '@/api/survey/survey.base'
import { getQuestionById } from '@/api/question'
import SurveyPassingCard from './SurveyPassingCard.vue'

const route = useRoute()
const index = ref(0)

const { isLoading: isSurveyLoading, data } = useQuery({
  queryKey: ['surveyQuestion', route.params.id],
  queryFn: () => getSurveyByIdAndStudent(route.params.id as string)
})

const enabled = computed(() => !!data.value?.id)
const questionId = computed(() => {
  if (!data.value?.questions) return null
  return data.value.questions[index.value].id
})

const {
  isLoading: isQuestionLoading,
  data: actualQuestion,
  refetch
} = useQuery({
  queryKey: ['question', index],
  queryFn: () => getQuestionById(questionId.value),
  enabled,
  gcTime: 0
})
</script>
