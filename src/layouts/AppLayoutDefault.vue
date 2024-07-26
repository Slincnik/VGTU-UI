<script setup lang="ts">
import { ref } from 'vue'

const rail = ref(true)
</script>

<template>
  <v-app>
    <v-navigation-drawer
      :rail="rail"
      @click="rail = false"
    />

    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="rail = !rail" />

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
