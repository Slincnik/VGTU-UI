<template>
  <div class="d-flex justify-space-between">
    <span class="text-h5 font-weight-bold">Опросы</span>
    <v-btn
      v-if="isCanAccept"
      :ripple="false"
      :elevation="0"
      text="Создание опроса"
      color="#5E81AC"
      @click="$router.push('/surveys/create')"
    />
  </div>
  <div class="mt-5">
    <v-data-table
      :items="formattedItems"
      :headers
      :loading
      :items-length="items?.length ?? 0"
      no-data-text="Ничего не найдено"
      loading-text="Загрузка..."
      hide-default-footer
      @click:row="handleRowClick"
    >
      <template #item.type="{ item }">
        <v-chip
          v-if="'type' in item"
          color="#8FBCBB"
          size="large"
          variant="flat"
          :text="SurveyType.getValue(item.type)"
        />
      </template>
      <template #item.status="{ item }">
        <v-chip
          color="#8FBCBB"
          size="large"
          variant="flat"
          :text="SurveyStatus.getValue(item.status)"
        />
      </template>
      <template
        v-if="userType === 'teacher'"
        #item.actions="{ item }"
      >
        <v-btn
          v-for="btnAction in actions"
          :key="btnAction.id"
          icon
          variant="text"
          elevation="0"
          :title="btnAction.title"
          :ripple="false"
          :disabled="btnAction.isDisabled(item.status)"
          @click="btnAction.onClick(item)"
        >
          <v-icon
            :size="28"
            :disabled="btnAction.isDisabled(item.status)"
            :icon="btnAction.icon"
          />
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { type CommonSurveyType, SurveyStatus, SurveyType } from '@/entities/Survey'
import { useSurveyList } from '../model/useSurveyList'
import { useSurveysActions } from '../model/useSurveysActions'

const router = useRouter()
const { surveyFn, userType, headers, isCanAccept } = await useSurveyList()
const { actions } = useSurveysActions()

const { isLoading: loading, data: items } = useQuery<CommonSurveyType[]>({
  queryKey: ['surveys'],
  queryFn: surveyFn.value
})

const formattedItems = computed(() => {
  if (!items.value) return []
  return items.value.map(item => ({
    ...item,
    startDate: new Intl.DateTimeFormat('ru-RU').format(new Date(item.startDate)),
    endDate: new Intl.DateTimeFormat('ru-RU').format(new Date(item.endDate))
  })) as unknown as CommonSurveyType[]
})

const handleRowClick = (_event: Event, { item }: { item: CommonSurveyType }) => {
  if (![SurveyStatus.Enum.IN_PROGRESS, SurveyStatus.Enum.NOT_STARTED].includes(item.status)) return
  router.push(`/surveys/${item.id}`)
}
</script>
