<template>
  <div class="mt-5">
    <v-data-table-server
      :items="serverItems"
      :headers
      :loading
      :items-length="totalItems"
      show-select
      hide-default-footer
      @update:options="loadItems"
    >
      <template #item.status="{ item }">
        <v-chip
          color="#8FBCBB"
          size="large"
          variant="flat"
          :text="item.status"
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
import { reactive, ref } from 'vue'

type Item = {
  name: string
  type: string
  status: string
  dateStart: string
  dateEnd: string
}

const loading = ref(false)

const items = [
  {
    name: '21421421',
    type: 'Преподаватель глазами студента',
    status: 'Опубликован',
    dateStart: Intl.DateTimeFormat().format(Date.now()),
    dateEnd: Intl.DateTimeFormat().format(Date.now())
  }
]

const serverItems = reactive<Item[]>([])
const totalItems = ref(0)

const FakeAPI = {
  async fetch(): Promise<{ items: Item[]; total: number }> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ items, total: items.length })
      }, 1000)
    })
  }
}

const loadItems = () => {
  loading.value = true
  FakeAPI.fetch().then(({ items: newItems, total }) => {
    Object.assign(serverItems, newItems)
    totalItems.value = total as number
    loading.value = false
  })
}

const headers = [
  {
    key: 'name',
    title: 'Имя',
    sortable: false
  },
  {
    key: 'type',
    title: 'Тип',
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
    align: 'center',
    sortable: false
  }
]
const buttonActions = [
  {
    id: 1,
    icon: 'custom:iconEdit'
  },
  {
    id: 2,
    icon: 'custom:iconDownload'
  },
  {
    id: 3,
    icon: 'custom:iconTrash'
  }
]
</script>
