<template>
  <v-btn @click="api.get('user/external/160e1605-22a7-400a-86bc-0e0b31aecd0a')">Войти</v-btn>
</template>

<script setup lang="ts">
import { api } from '@/plugins/axios'
</script>
