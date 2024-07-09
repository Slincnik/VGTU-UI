<template>
  <v-navigation-drawer
    :rail
    :temporary="mobile"
    :location="mobile ? 'top' : undefined"
    v-model="drawer"
    border="0"
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :prepend-icon="item.icon"
        :title="item.title"
        :key="item.id"
        link
        rounded="lg"
        :active="item.id === 2"
        active-class="list-active"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const items = ref([
  { id: 1, title: 'Главная', icon: 'mdi-home', link: '/home' },
  { id: 2, title: 'Расписание', icon: 'mdi-calendar', link: '/schedule' },
  { id: 3, title: 'Зачётная книжка', icon: 'mdi-book', link: '/gradebook' },
  { id: 4, title: 'Получить справку', icon: 'mdi-file-document', link: '/documents' },
  { id: 5, title: 'Опросы', icon: 'mdi-comment-question', link: '/surveys' }
])

const drawer = defineModel('drawer', {
  required: true,
  default: false
})
const rail = defineModel('rail', {
  required: true,
  default: false
})

const { mobile } = useDisplay()
</script>

<style scoped>
.list-active {
  background-color: #39476a !important;
  color: white !important;
}
</style>
