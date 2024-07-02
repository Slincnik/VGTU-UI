<template>
  <v-btn @click="keycloakLogin">Войти</v-btn>
</template>

<script setup lang="ts">
import keycloakInstance from '@/plugins/keycloak'
import { onMounted } from 'vue'

const keycloakLogin = async () => {
  const userProfile = keycloakInstance.createLogoutUrl()
  console.log(userProfile)
}

onMounted(() => {
  // keycloakInstance.init({
  //   onLoad: 'login-required',
  //   checkLoginIframe: false
  // })
})
</script>
