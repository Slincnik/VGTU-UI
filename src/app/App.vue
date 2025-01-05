<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DefaultLayout } from '@/shared/ui/layouts'
import { DrawerWidget } from '@/widgets/drawer-widget'
import { HeaderWidget } from '@/widgets/header-widget'

const route = useRoute()
const router = useRouter()

const isRouterReady = ref(false)
const layout = computed(() => route.meta.layoutComponent || DefaultLayout)

router.isReady().finally(() => {
  isRouterReady.value = true
})
</script>

<template>
  <v-app>
    <template v-if="!isRouterReady">
      <div class="d-flex justify-center align-center h-screen">
        <v-progress-circular
          class="mx-auto"
          indeterminate
          :size="36"
        />
      </div>
    </template>
    <component
      :is="layout"
      v-else
    >
      <template #header>
        <header-widget />
      </template>

      <template #drawer>
        <drawer-widget />
      </template>

      <template #default>
        <router-view />
      </template>
    </component>
  </v-app>
</template>
