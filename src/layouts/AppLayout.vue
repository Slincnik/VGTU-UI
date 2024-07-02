<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isRouterReady = ref(false)

const route = useRoute()
const router = useRouter()

router.isReady().finally(() => (isRouterReady.value = true))
</script>

<template>
  <v-app>
    <template v-if="!isRouterReady">
      <v-progress-circular class="mx-auto h-100" indeterminate :size="36"></v-progress-circular>
    </template>
    <template v-else>
      <component :is="route.meta.layoutComponent">
        <slot />
      </component>
    </template>
  </v-app>
</template>
