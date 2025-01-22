<template>
  <v-app-bar
    :elevation="0"
    class="border-b-sm"
    height="89"
  >
    <v-container
      class="d-flex align-center justify-space-between pa-0"
      fluid
    >
      <!-- Левая часть с текстом -->
      <div class="d-flex align-center ml-4">
        <v-btn
          :elevation="0"
          style="background-color: #8fbcbb"
          :ripple="false"
          icon
          size="55"
          @click.stop="mobile ? (drawer = !drawer) : (rail = !rail)"
        >
          <v-icon
            icon="menu"
            size="30"
            color="#2E3440"
          />
        </v-btn>
        <v-app-bar-title class="ml-5">
          <div class="d-flex flex-column">
            <span class="logo-text-title">ВГТУ</span>
            <span class="logo-text-subtitle">цифровая среда</span>
          </div>
        </v-app-bar-title>
      </div>

      <!-- Поле ввода с flexbox -->
      <v-text-field
        hide-details
        placeholder="Поиск по сайту"
        variant="outlined"
        base-color="#ECEFF4"
        color="#ECEFF4"
        bg-color="#ECEFF4"
        density="comfortable"
        class="search-bar"
        prepend-inner-icon="magnify"
        style="max-width: 250px"
      />

      <!-- Правая часть с аватаром и кнопкой выхода -->
      <div class="d-flex align-center mr-5">
        <v-avatar
          color="info"
          class="mr-5 cursor-pointer"
          :size="48"
          @click.stop="$router.push('/profile')"
        >
          {{ getInitials(user) }}
        </v-avatar>
        <v-btn
          variant="tonal"
          size="48"
          icon="logout"
          :ripple="false"
          @click.prevent="authManager.signoutRedirect()"
        />
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { getInitials } from '@/entities/User'
import { useGlobalSettings } from '@/shared/model/useGlobalSetting'
import { authManager } from '@/shared/service/auth'

const store = useGlobalSettings()
const { drawer, rail } = storeToRefs(store)

const { mobile } = useDisplay()

const user = await authManager.getUser()
</script>

<style scoped>
.logo-text-title {
  font-family: 'GothamPro', sans-serif !important;
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  text-transform: none !important;
  color: #2e3440;
}
.logo-text-subtitle {
  font-family: 'GothamPro', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400;
  text-transform: none !important;
  line-height: 1.6;
  color: #2e3440;
}
.search-bar {
  flex: 0 1 250px; /* Поле поиска имеет фиксированную ширину 250px */
}

@media (max-width: 768px) {
  .search-bar {
    display: none; /* Скрыть поле поиска на маленьких экранах */
  }
}
</style>
