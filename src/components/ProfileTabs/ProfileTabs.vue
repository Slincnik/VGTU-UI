<template>
  <v-tabs
    class="mt-5"
    height="30"
    slider-color="#8FBCBB"
  >
    <v-tab
      variant="text"
      to="main"
    >Общие сведения</v-tab
    >
    <v-tab
      variant="text"
      to="orders"
    >Приказы</v-tab
    >
    <v-tab
      variant="text"
      to="payments"
    >Оплата обучения</v-tab
    >
  </v-tabs>
</template>

<script setup lang="ts"></script>

<style scoped>
.v-btn {
  padding: 0;
  margin-right: 20px;
}
.v-btn:last-child {
  margin-right: 0;
}

.text-size {
  font-size: 20px;
}
</style>
