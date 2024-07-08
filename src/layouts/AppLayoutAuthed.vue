<template>
  <header-layout
    v-model:drawer="drawer"
    v-model:rail="rail"
  />

  <navigation-drawer
    v-model:drawer="drawer"
    v-model:rail="rail"
  />

  <v-main>
    <v-container
      fluid
      class="h-100"
    >
      <slot />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderLayout from '@/components/Header/HeaderLayout.vue'
import NavigationDrawer from '@/components/Drawer/NavigationDrawer.vue'

const drawer = ref(true)
const rail = ref(true)
</script>
