<template>
  <div class="profile-info">
    <div class="d-flex">
      <v-avatar
        color="info"
        size="120"
      >
        ПД
      </v-avatar>
      <div class="ml-5 d-flex flex-column justify-center profile-text-info">
        <span>Прищепа</span>
        <span class="font-weight-light">Даниил</span>
        <span class="font-weight-light">Анатольевич</span>
      </div>
    </div>
    <div>
      <v-list
        density="compact"
        class="px-0 py-0"
      >
        <v-list-item
          class="px-0"
          min-height="26"
          prepend-icon="mdi:mdi-phone"
          title="+0 (000) 000-00-00"
        />
        <v-list-item
          class="px-0"
          min-height="26"
          prepend-icon="mdi:mdi-email-open"
          title="test@cchgeu.ru"
        />
        <v-list-item
          class="px-0"
          min-height="26"
          prepend-icon="mdi:mdi-telegram"
          title="@test"
        />
      </v-list>
    </div>
    <div>
      <span>Роли пользователя</span>
      <div class="mt-2">
        <v-chip
          variant="flat"
          color="#81A1C1"
        >
          <strong>студент</strong>
        </v-chip>
      </div>
    </div>
    <div>
      <span>Образовательная программа</span>
      <div class="mt-2">
        <v-sheet
          class="pa-4 fill-sheet"
          elevation="0"
          color="#ECEFF4"
        >
          <v-row
            v-for="(item, index) in programData"
            :key="index"
          >
            <v-col
              class="py-2 px-2"
              cols="4"
            >
              <strong>{{ item.label }}</strong>
            </v-col>
            <v-col class="py-2 px-2">
              {{ item.value }}
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const programData = reactive([
  { label: 'Программа', value: 'магистратуры' },
  {
    label: 'Наименование программы',
    value: 'Разработка web-ориентированных информационных систем'
  },
  { label: 'Направление подготовки', value: '09.04.02 Информационные системы и технологии' },
  { label: 'Факультет', value: 'ФИТКБ' },
  { label: 'Кафедра', value: 'САПРИС' },
  { label: 'Форма обучения', value: 'очная' },
  { label: 'Основание обучения', value: 'бюджет' },
  { label: 'Группа', value: 'мРИС-000' },
  { label: 'Год начала обучения', value: '0000' },
  { label: 'Зачетная книжка', value: '00-мРИС-00' }
])
</script>
<style scoped>
.fill-sheet {
  max-width: fit-content;
}
.profile-text-info {
  gap: 6px;
}
.profile-info > *:not(:first-child) {
  margin-top: 20px;
}
</style>
