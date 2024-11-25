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
      hide-default-footer
      @click:row="handleRowClick"
    >
      <template
        v-if="userType === 'teacher'"
        #item.type="{ item }"
      >
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
          v-for="btnAction in buttonActions"
          :key="btnAction.id"
          icon
          variant="text"
          elevation="0"
          :title="btnAction.icon"
          :ripple="false"
          :disabled="btnAction.disabled(item)"
          @click="btnAction.onClick?.(item)"
        >
          <v-icon
            :size="28"
            :disabled="btnAction.disabled(item)"
            :icon="btnAction.icon"
          />
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getAllStudentSurveys, getAllSurveys, publishSurvey } from '@/api/survey'
import { SurveyStatus, SurveyType, type Survey } from '@/api/survey/survey.types'
import { canAccept } from '@/utils/checkSurveyCreateUser'

enum Align {
  CENTER = 'center',
  START = 'start',
  END = 'end'
}

const isCanAccept = await canAccept()
const router = useRouter()

const userType = computed(() => {
  return isCanAccept ? 'teacher' : 'student'
})

const surveyFn = computed<typeof getAllSurveys | typeof getAllStudentSurveys>(() => {
  return userType.value === 'teacher' ? getAllSurveys : getAllStudentSurveys
})

const { isLoading: loading, data: items } = useQuery({
  queryKey: ['surveys'],
  queryFn: surveyFn.value
})

const formattedItems = computed(() => {
  return (
    (items.value?.map(item => ({
      ...item,
      dateStart: new Intl.DateTimeFormat('ru-RU').format(new Date(item.dateStart)),
      dateEnd: new Intl.DateTimeFormat('ru-RU').format(new Date(item.dateEnd))
    })) as unknown as Survey.BaseSurvey[] | Survey.SurveyMeta[]) || []
  )
})

const commonHeaders = [
  { key: 'name', title: 'Название', align: Align.CENTER, sortable: false },
  { key: 'status', title: 'Статус', align: Align.CENTER, sortable: false },
  { key: 'dateStart', title: 'Дата начала', align: Align.CENTER, sortable: false },
  { key: 'dateEnd', title: 'Дата окончания', align: Align.CENTER, sortable: false }
]

const teacherSpecificHeaders = [
  { key: 'type', title: 'Тип', align: Align.CENTER, sortable: false },
  { key: 'actions', title: 'Опции', align: Align.CENTER, sortable: false }
]

const headers = computed(() => {
  if (userType.value === 'teacher') {
    return [...commonHeaders, ...teacherSpecificHeaders]
  }
  return commonHeaders
})

const buttonActions = [
  {
    id: 1,
    icon: 'edit',
    disabled: (item: Survey.BaseSurvey) => item.status !== SurveyStatus.Enum.DRAFT
  },
  {
    id: 2,
    icon: 'download',
    disabled: (item: Survey.BaseSurvey) =>
      ![SurveyStatus.Enum.FINISHED, SurveyStatus.Enum.EXPIRED, SurveyStatus.Enum.CLOSED].includes(
        item.status
      )
  },
  {
    id: 3,
    icon: 'trash',
    disabled: (item: Survey.BaseSurvey) => item.status !== SurveyStatus.Enum.DRAFT
  },
  {
    id: 4,
    icon: 'publish',
    disabled: (item: Survey.BaseSurvey) => item.status !== SurveyStatus.Enum.DRAFT,
    onClick: (item: Survey.BaseSurvey) =>
      item.status === SurveyStatus.Enum.PUBLISHED || publishSurvey(item.id)
  }
]
const handleRowClick = (_event: Event, { item }: { item: Survey.BaseSurvey }) => {
  if (item.status !== SurveyStatus.Enum.IN_PROGRESS) return
  router.push(`/surveys/${item.id}`)
}
</script>
