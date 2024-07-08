<template>
  <v-btn @click="keycloakLogin">Войти</v-btn>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import keycloakInstance from '@/plugins/keycloak'

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
