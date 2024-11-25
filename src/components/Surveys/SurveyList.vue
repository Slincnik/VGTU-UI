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
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  closeSurveyMeta,
  copySurveyMeta,
  deleteSurveyMeta,
  downloadSurveyMeta,
  getAllStudentSurveys,
  getAllSurveys,
  publishSurvey
} from '@/api/survey'
import { SurveyStatus, SurveyType, type Survey } from '@/api/survey/survey.types'
import { canAccept } from '@/utils/checkSurveyCreateUser'

enum Align {
  CENTER = 'center',
  START = 'start',
  END = 'end'
}

const isCanAccept = await canAccept()
const router = useRouter()
const queryClient = useQueryClient()

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

const surveyIsDraft = (item: Survey.BaseSurvey) => {
  return item.status !== SurveyStatus.Enum.DRAFT
}

const buttonActions = [
  {
    id: 1,
    icon: 'copy',
    disabled: (item: Survey.BaseSurvey) => item.status === SurveyStatus.Enum.DRAFT,
    onClick: (item: Survey.BaseSurvey) => {
      copySurveyMeta(item.id).then(it => {
        queryClient.setQueryData(['surveys'], (old: Survey.BaseSurvey[] | Survey.SurveyMeta[]) => [
          ...old,
          it
        ])
      })
    }
  },
  {
    id: 2,
    icon: 'edit',
    disabled: (item: Survey.BaseSurvey) => surveyIsDraft(item),
    onClick: (item: Survey.BaseSurvey) => {
      if (surveyIsDraft(item)) return
      router.push(`/surveys/create?id=${item.id}`)
    }
  },
  {
    id: 3,
    icon: 'download',
    disabled: (item: Survey.BaseSurvey) =>
      ![SurveyStatus.Enum.FINISHED, SurveyStatus.Enum.EXPIRED, SurveyStatus.Enum.CLOSED].includes(
        item.status
      ),
    onClick: async (item: Survey.BaseSurvey) => {
      if (
        ![SurveyStatus.Enum.FINISHED, SurveyStatus.Enum.EXPIRED, SurveyStatus.Enum.CLOSED].includes(
          item.status
        )
      )
        return
      const file = await downloadSurveyMeta(item.id)
      window.open(URL.createObjectURL(file))
    }
  },
  {
    id: 4,
    icon: 'trash',
    disabled: (item: Survey.BaseSurvey) => surveyIsDraft(item),
    onClick: (item: Survey.BaseSurvey) => {
      if (surveyIsDraft(item)) return
      deleteSurveyMeta(item.id).then(() => {
        queryClient.setQueryData(['surveys'], (old: Survey.BaseSurvey[] | Survey.SurveyMeta[]) =>
          old.filter(it => it.id !== item.id)
        )
      })
    }
  },
  {
    id: 5,
    icon: 'publish',
    disabled: (item: Survey.BaseSurvey) => item.status !== SurveyStatus.Enum.DRAFT,
    onClick: (item: Survey.BaseSurvey) => {
      if (item.status === SurveyStatus.Enum.PUBLISHED) return
      publishSurvey(item.id).then(() => {
        queryClient.setQueryData(['surveys'], (old: Survey.BaseSurvey[] | Survey.SurveyMeta[]) =>
          old.map(it => (it.id === item.id ? { ...it, status: SurveyStatus.Enum.PUBLISHED } : it))
        )
      })
    }
  },
  {
    id: 6,
    icon: 'close',
    disabled: (item: Survey.BaseSurvey) => item.status !== SurveyStatus.Enum.PUBLISHED,
    onClick: (item: Survey.BaseSurvey) => {
      closeSurveyMeta(item.id).then(() => {
        queryClient.setQueryData(['surveys'], (old: Survey.BaseSurvey[] | Survey.SurveyMeta[]) =>
          old.map(it => (it.id === item.id ? { ...it, status: SurveyStatus.Enum.CLOSED } : it))
        )
      })
    }
  }
]
const handleRowClick = (_event: Event, { item }: { item: Survey.BaseSurvey }) => {
  if (item.status !== SurveyStatus.Enum.IN_PROGRESS) return
  router.push(`/surveys/${item.id}`)
}
</script>
