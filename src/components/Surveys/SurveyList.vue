<template>
  <div class="d-flex justify-space-between">
    <span class="text-h5 font-weight-bold">Опросы</span>
    <v-btn
      v-show="isCanAccept"
      :ripple="false"
      :elevation="0"
      text="Создание опроса"
      color="#5E81AC"
      @click="$router.push('/surveys/create')"
    />
  </div>
  <div class="mt-5">
    <v-data-table-server
      :items="formattedItems"
      :headers
      :loading
      :items-length="items?.length ?? 0"
      hide-default-footer
    >
      <template #item.status="{ item }">
        <v-chip
          color="#8FBCBB"
          size="large"
          variant="flat"
          :text="SurveyStatus.getValue(item.status)"
        />
      </template>
      <template #item.actions>
        <v-btn
          v-for="btnAction in buttonActions"
          :key="btnAction.id"
          icon
          elevation="0"
          :ripple="false"
        >
          <v-icon
            :size="28"
            :icon="btnAction.icon"
          />
        </v-btn>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllStudentSurveys } from '@/api/survey'
import { SurveyStatus } from '@/api/survey/survey.types'
import { canAccept } from '@/utils/checkSurveyCreateUser'

const isCanAccept = await canAccept()

const { isLoading: loading, data: items } = useQuery({
  queryKey: ['surveys'],
  queryFn: getAllStudentSurveys
})

const formattedItems = computed(() => {
  return (
    items.value?.map(item => ({
      ...item,
      dateStart: new Intl.DateTimeFormat('ru-RU').format(new Date(item.dateStart)),
      dateEnd: new Intl.DateTimeFormat('ru-RU').format(new Date(item.dateEnd))
    })) || []
  )
})

// @ts-ignore
const headers = [
  {
    key: 'name',
    title: 'Название',
    sortable: false
  },
  {
    key: 'status',
    title: 'Статус',
    sortable: false
  },
  {
    key: 'dateStart',
    title: 'Дата начала',
    sortable: false
  },
  {
    key: 'dateEnd',
    title: 'Дата окончания',
    sortable: false
  },
  {
    key: 'actions',
    title: 'Опции',
    sortable: false
  }
]
const buttonActions = [
  {
    id: 1,
    icon: 'custom:edit'
  },
  {
    id: 2,
    icon: 'custom:download'
  },
  {
    id: 3,
    icon: 'custom:trash'
  }
]
</script>
