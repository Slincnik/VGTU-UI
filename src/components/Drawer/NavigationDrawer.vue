<template>
  <v-navigation-drawer
    :rail
    :temporary="mobile"
    v-model="drawer"
    :disable-resize-watcher="true"
    border="0"
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :prepend-icon="item.icon"
        :key="item.id"
        link
        rounded="lg"
        :active="item.link === $route.path"
        active-class="list-active"
        @click="$router.push(item.link)"
      >
        <v-list-item-title class="list-font-text">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const items = ref([
  { id: 1, title: 'Главная', icon: 'mdi-home', link: '/' },
  { id: 2, title: 'Расписание', icon: 'mdi-calendar-month-outline', link: '/schedule' },
  { id: 3, title: 'Обучение', icon: 'mdi-school', link: '/education' },
  { id: 4, title: 'Портфолио', icon: 'mdi-certificate', link: '/portfolio' },
  { id: 5, title: 'Заявки', icon: 'mdi-export-variant', link: '/requests' },
  { id: 6, title: 'Опросы', icon: 'mdi-help-box', link: '/surveys' },
  { id: 7, title: 'Информация', icon: 'mdi-information', link: '/info' }
])

const drawer = defineModel<boolean>('drawer', {
  required: true
})
const rail = defineModel<boolean>('rail', {
  required: true,
  default: false
})

const { mobile } = useDisplay()
</script>

<style scoped>
.list-font-text {
  font-family: 'Fira Sans', sans-serif;
  font-weight: 400;
  font-size: 16;
}
.list-active {
  background-color: #39476a !important;
  color: white !important;
}
</style>
