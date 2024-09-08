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
      class="h-100 pa-0"
    >
      <slot />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import HeaderLayout from '@/components/Header/HeaderLayout.vue'
import NavigationDrawer from '@/components/Drawer/NavigationDrawer.vue'

const drawer = ref(false)
const rail = ref(false)

const { mobile } = useDisplay()

onMounted(() => {
  if (!mobile.value) {
    drawer.value = true
    rail.value = true
  }
})

watch(mobile, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    if (!drawer.value && !rail.value) {
      drawer.value = true
      rail.value = true
    }
  } else if (newVal && !oldVal) {
    if (rail.value) {
      drawer.value = false
      rail.value = false
    }
    if (!rail.value && drawer.value) {
      drawer.value = true
    }
  }
})
</script>
