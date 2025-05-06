<template>
  <v-layout class="h-screen">
    <slot name="header" />
    <slot name="drawer" />

    <v-main>
      <v-container
        fluid
        class="h-100 pa-0 my-container"
      >
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<style>
.my-container {
  overflow-y: auto;
}
</style>
