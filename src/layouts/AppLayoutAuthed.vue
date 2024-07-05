<template>
  <v-app-bar :elevation="0" extended extension-height="100">
    <v-avatar size="64" :image="logo"></v-avatar>
    <v-app-bar-title class="font-weight-bold ml-1 mt-2"> ВГТУ </v-app-bar-title>
    <template #extension>
      <div class="ml-2 opacity-60">
        Меню
        <v-btn
          @click.stop="mobile ? (drawer = !drawer) : (rail = !rail)"
          size="40"
          rounded="lg"
          icon="mdi-menu"
        ></v-btn>
      </div>
      <v-toolbar-title class="ml-4 text-h4 font-weight-bold">
        <div class="d-block d-sm-flex">
          Расписание
          <div class="ml-4 font-weight-regular opacity-60">бМП-211</div>
        </div>
      </v-toolbar-title>
    </template>
    <v-spacer v-if="width >= 627" />
    <v-text-field
      v-if="width >= 627"
      class="mt-4 mr-10"
      bg-color="grey-lighten-4"
      flat
      rounded
      placeholder="Поиск по порталу"
      variant="solo"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <template #append>
      <v-badge dot class="ml-5 mr-2">
        <v-icon icon="mdi-bell-outline" size="x-large"></v-icon>
      </v-badge>
      <v-badge dot class="mr-2">
        <v-icon icon="mdi-forum-outline" size="x-large"></v-icon>
      </v-badge>
      <v-list-item title="Игорь" subtitle="Студент">
        <template #prepend>
          <v-avatar style="background-color: lightgray" icon="mdi-account" />
        </template>
      </v-list-item>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    :rail
    :temporary="mobile"
    :location="mobile ? 'top' : undefined"
    v-model="drawer"
    border="0"
  >
    <!-- <v-icon
        v-if="!mobile"
        class="toggle-button rounded-circle"
        @click.stop="mobile ? (drawer = !drawer) : (rail = !rail)"
        :icon="rail ? 'mdi-chevron-right-circle' : 'mdi-chevron-left-circle'"
      ></v-icon> -->

    <v-list>
      <!-- <v-list-item title="Меню" append-icon="mdi-menu"></v-list-item> -->
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

  <v-main>
    <v-container fluid class="h-100">
      <slot />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import logo from '@/assets/img/logo.svg'
const drawer = ref(true)
const rail = ref(true)

const { mobile, width } = useDisplay()

const items = ref([
  { id: 1, title: 'Главная', icon: 'mdi-home', link: '/home' },
  { id: 2, title: 'Расписание', icon: 'mdi-calendar', link: '/schedule' },
  { id: 3, title: 'Зачётная книжка', icon: 'mdi-book', link: '/gradebook' },
  { id: 4, title: 'Получить справку', icon: 'mdi-file-document', link: '/documents' },
  { id: 5, title: 'Опросы', icon: 'mdi-comment-question', link: '/surveys' }
])

const navigate = (link: string) => {
  console.log(link)
  // Implement navigation logic
}
</script>

<style>
.toggle-button {
  position: absolute !important;
  right: -13px;
  top: 60px;
  z-index: 1;
}
.list-active {
  background-color: #39476a !important;
  color: white !important;
}
</style>
