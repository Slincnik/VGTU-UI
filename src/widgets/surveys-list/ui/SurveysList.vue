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
import { type CommonSurveyType, SurveyStatus, SurveyType } from '@/entities/Survey'
import { surveyApi } from '@/features/surveys'
import { useSurveyList } from '../model/useSurveyList'

const router = useRouter()
const queryClient = useQueryClient()
const { surveyFn, userType, headers, isCanAccept, surveyIsDraft } = await useSurveyList()

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

const buttonActions = [
  {
    id: 1,
    icon: 'copy',
    disabled: (item: CommonSurveyType) => item.status === SurveyStatus.Enum.DRAFT,
    onClick: (item: CommonSurveyType) => {
      surveyApi.copySurveyMeta(item.id).then(it => {
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
      const file = await surveyApi.downloadSurveyMeta(item.id)
      window.open(URL.createObjectURL(file))
    }
  },
  {
    id: 4,
    icon: 'trash',
    disabled: (item: CommonSurveyType) => surveyIsDraft(item),
    onClick: (item: CommonSurveyType) => {
      if (surveyIsDraft(item)) return
      surveyApi.deleteSurveyMeta(item.id).then(() => {
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
      surveyApi.publishSurveyMeta(item.id).then(() => {
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
      surveyApi.closeSurveyMeta(item.id).then(() => {
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
