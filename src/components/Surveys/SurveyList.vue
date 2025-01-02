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
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { getAllStudentSurveys } from '@/api/survey/survey.base'
import {
  closeSurveyMeta,
  copySurveyMeta,
  deleteSurveyMeta,
  downloadSurveyMeta,
  getAllSurveysMeta,
  publishSurveyMeta
} from '@/api/survey/survey.meta'
import { type CommonSurveyType, SurveyStatus, SurveyType } from '@/api/survey/survey.types'
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

const surveyFn = computed<typeof getAllSurveysMeta | typeof getAllStudentSurveys>(() => {
  return userType.value === 'teacher' ? getAllSurveysMeta : getAllStudentSurveys
})

const { isLoading: loading, data: items } = useQuery<CommonSurveyType[]>({
  queryKey: ['surveys'],
  queryFn: surveyFn.value
})

const formattedItems = computed(() => {
  return (
    (items.value?.map(item => ({
      ...item,
      startDate: new Intl.DateTimeFormat('ru-RU').format(new Date(item.startDate)),
      endDate: new Intl.DateTimeFormat('ru-RU').format(new Date(item.endDate))
    })) as unknown as CommonSurveyType[]) || []
  )
})

const commonHeaders = [
  { key: 'name', title: 'Название', align: Align.CENTER, sortable: false },
  { key: 'type', title: 'Тип', align: Align.CENTER, sortable: false },
  { key: 'status', title: 'Статус', align: Align.CENTER, sortable: false },
  { key: 'startDate', title: 'Дата начала', align: Align.CENTER, sortable: false },
  { key: 'endDate', title: 'Дата окончания', align: Align.CENTER, sortable: false }
]

const teacherSpecificHeaders = [
  { key: 'actions', title: 'Опции', align: Align.CENTER, sortable: false }
]

const headers = computed(() => {
  if (userType.value === 'teacher') {
    return [...commonHeaders, ...teacherSpecificHeaders]
  }
  return commonHeaders
})

const surveyIsDraft = (item: CommonSurveyType) => {
  return item.status !== SurveyStatus.Enum.DRAFT
}

const buttonActions = [
  {
    id: 1,
    icon: 'copy',
    disabled: (item: CommonSurveyType) => item.status === SurveyStatus.Enum.DRAFT,
    onClick: (item: CommonSurveyType) => {
      copySurveyMeta(item.id).then(it => {
        queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) => [...old, it])
      })
    }
  },
  {
    id: 2,
    icon: 'edit',
    disabled: (item: CommonSurveyType) => surveyIsDraft(item),
    onClick: (item: CommonSurveyType) => {
      if (surveyIsDraft(item)) return
      router.push(`/surveys/create?id=${item.id}`)
    }
  },
  {
    id: 3,
    icon: 'download',
    disabled: (item: CommonSurveyType) =>
      ![SurveyStatus.Enum.FINISHED, SurveyStatus.Enum.EXPIRED, SurveyStatus.Enum.CLOSED].includes(
        item.status
      ),
    onClick: async (item: CommonSurveyType) => {
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
    disabled: (item: CommonSurveyType) => surveyIsDraft(item),
    onClick: (item: CommonSurveyType) => {
      if (surveyIsDraft(item)) return
      deleteSurveyMeta(item.id).then(() => {
        queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) =>
          old.filter(it => it.id !== item.id)
        )
      })
    }
  },
  {
    id: 5,
    icon: 'publish',
    disabled: (item: CommonSurveyType) => item.status !== SurveyStatus.Enum.DRAFT,
    onClick: (item: CommonSurveyType) => {
      if (item.status === SurveyStatus.Enum.PUBLISHED) return
      publishSurveyMeta(item.id).then(() => {
        queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) =>
          old.map(it => (it.id === item.id ? { ...it, status: SurveyStatus.Enum.PUBLISHED } : it))
        )
      })
    }
  },
  {
    id: 6,
    icon: 'close',
    disabled: (item: CommonSurveyType) => item.status !== SurveyStatus.Enum.PUBLISHED,
    onClick: (item: CommonSurveyType) => {
      closeSurveyMeta(item.id).then(() => {
        queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) =>
          old.map(it => (it.id === item.id ? { ...it, status: SurveyStatus.Enum.CLOSED } : it))
        )
      })
    }
  }
]
const handleRowClick = (_event: Event, { item }: { item: CommonSurveyType }) => {
  if (![SurveyStatus.Enum.IN_PROGRESS, SurveyStatus.Enum.NOT_STARTED].includes(item.status)) return
  router.push(`/surveys/${item.id}`)
}
</script>
