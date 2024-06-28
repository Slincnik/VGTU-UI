<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isRouterReady = ref(false)

const route = useRoute()
const router = useRouter()

router.isReady().finally(() => (isRouterReady.value = true))
</script>

<template>
  <div v-if="!isRouterReady">
    <v-progress-circular indeterminate :size="36"></v-progress-circular>
  </div>
  <template v-else>
    <component :is="route.meta.layoutComponent">
      <slot />
    </component>
  </template>
</template>
