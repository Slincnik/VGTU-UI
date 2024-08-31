<template>
  <v-app-bar
    :elevation="0"
    class="border-b-sm"
  >
    <v-btn
      :elevation="4"
      class="ml-5"
      base-color="#8FBCBB"
      :ripple="false"
      icon="custom:iconMenu"
      @click.stop="mobile ? (drawer = !drawer) : (rail = !rail)"
    />
    <v-app-bar-title class="ml-5">
      <div class="d-flex flex-column">
        <span class="font-weight-bold">ВГТУ</span>
        <span class="font-weight-bold text-subtitle-1">Цифровая среда</span>
      </div>
    </v-app-bar-title>
    <template #append>
      <v-avatar
        color="info"
        class="mr-5 cursor-pointer"
        :size="48"
        @click.stop="$router.push('/profile')"
      >
        CХ
      </v-avatar>
      <v-btn
        variant="tonal"
        size="48"
        class="mr-5"
        icon="custom:iconLogout"
        :ripple="false"
        @click.prevent="authManager.signoutRedirect()"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { authManager } from '@/service/keycloak/auth.config'

const drawer = defineModel<boolean>('drawer', {
  required: true
})
const rail = defineModel<boolean>('rail', {
  required: true
})

const { mobile } = useDisplay()
</script>
