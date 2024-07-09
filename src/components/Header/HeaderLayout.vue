<template>
  <v-app-bar
    :elevation="0"
    extended
    extension-height="100"
  >
    <v-avatar
      size="64"
      :image="logo"
    />
    <v-app-bar-title class="font-weight-bold ml-1 mt-2"> ВГТУ </v-app-bar-title>
    <template #extension>
      <div class="ml-2 opacity-60">
        Меню
        <v-btn
          @click.stop="mobile ? (drawer = !drawer) : (rail = !rail)"
          size="40"
          rounded="lg"
          icon="mdi-menu"
        />
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
    />
    <template #append>
      <v-badge
        dot
        class="ml-5 mr-2"
      >
        <v-icon
          icon="mdi-bell-outline"
          size="x-large"
        />
      </v-badge>
      <v-badge
        dot
        class="mr-2"
      >
        <v-icon
          icon="mdi-forum-outline"
          size="x-large"
        />
      </v-badge>
      <v-list-item
        title="Игорь"
        subtitle="Студент"
      >
        <template #prepend>
          <v-avatar
            style="background-color: lightgray"
            icon="mdi-account"
          />
        </template>
      </v-list-item>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import logo from '@/assets/img/logo.svg'

const drawer = defineModel<boolean>('drawer', {
  required: true
})
const rail = defineModel<boolean>('rail', {
  required: true
})

const { mobile, width } = useDisplay()
</script>
