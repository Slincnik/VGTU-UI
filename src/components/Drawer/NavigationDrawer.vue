<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail
    :temporary="mobile"
    :disable-resize-watcher="true"
    width="274"
    rail-width="88"
  >
    <v-list class="mt-5 py-0">
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :active="item.link === $route.path"
        active-class="list-active"
        rounded="lg"
        :ripple="false"
        :disabled="item.disabled"
        @click="$router.push(item.link)"
      >
        <div class="d-flex align-center">
          <v-btn
            icon
            elevation="0"
            class="mr-5"
            color="#ECEFF4"
            :ripple="false"
          >
            <v-icon
              :icon="item.icon"
              color="#2E3440"
              size="26"
            />
          </v-btn>
          <v-list-item-title class="list-font-text"> {{ item.title }} </v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { shallowReadonly } from 'vue'
import { useDisplay } from 'vuetify'

const items = shallowReadonly([
  { id: 1, title: 'Главная', icon: 'home', link: '/' },
  { id: 2, title: 'Расписание', icon: 'schedule', link: '/schedule', disabled: true },
  { id: 3, title: 'Обучение', icon: 'education', link: '/education', disabled: true },
  { id: 4, title: 'Портфолио', icon: 'portfolio', link: '/portfolio', disabled: true },
  { id: 5, title: 'Заявки', icon: 'request', link: '/requests', disabled: true },
  { id: 6, title: 'Опросы', icon: 'survey', link: '/surveys' },
  { id: 7, title: 'Информация', icon: 'info', link: '/info', disabled: true }
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
  font-family: 'GothamPro', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
.list-active {
  background-color: #39476a !important;
  color: white !important;
}
</style>
