<template>
  <v-layout class="h-screen">
    <slot name="header" />
    <slot name="drawer" />

    <v-main>
      <v-container
        fluid
        class="h-100 pa-0"
      >
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
