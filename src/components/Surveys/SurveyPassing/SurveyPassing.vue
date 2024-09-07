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
  <div
    v-else-if="actualQuestion"
    class="mt-5 mx-5"
  >
    <v-sheet
      tile
      min-width="200"
    >
      <v-card>
        <v-card-title> {{ actualQuestion?.title }} </v-card-title>
        <v-card-text>
          <template v-if="actualQuestion?.type === SurveyQuestionType.Enum.TEXT">
            <v-text-field
              v-model="response"
              class="mx-5"
              variant="outlined"
              placeholder="Ваш ответ"
            />
          </template>
          <template v-else-if="actualQuestion?.type === SurveyQuestionType.Enum.CHOICE">
            <v-radio-group v-model="response">
              <v-radio
                v-for="choice in actualQuestion?.choices"
                :key="choice.id"
                :label="choice.title"
                :value="choice.id"
              />
            </v-radio-group>
          </template>
          <template v-else-if="actualQuestion?.type === SurveyQuestionType.Enum.MULTI_CHOICE">
            <v-checkbox
              v-for="choice in actualQuestion?.choices"
              :key="choice.id"
              v-model="response"
              :label="choice.title"
              :value="choice.id"
            />
          </template>
        </v-card-text>
      </v-card>
    </v-sheet>
    <div class="d-flex ga-4">
      <v-btn
        :ripple="false"
        :elevation="0"
        variant="flat"
        text="Следующий вопрос"
        color="#ECEFF4"
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
import { getSurveyByIdAndStudent } from '@/api/survey'
import { getQuestionById } from '@/api/question'
import { SurveyQuestionType } from '@/api/survey/survey.types'

const route = useRoute()

const response = ref<string | string[] | null>(null)
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
  enabled
})

const previousQuestion = () => {
  if (index.value === 0) return
  index.value--
  refetch()
}

const nextQuestion = () => {
  index.value++
  refetch()
}
</script>
