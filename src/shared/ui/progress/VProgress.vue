<template>
  <div class="d-flex justify-center align-center">
    <v-progress-circular
      class="mx-auto"
      indeterminate
      :size
    />
  </div>
</template>

<script setup lang="ts">
const { size = 36 } = defineProps<{
  size?: number
}>()
</script>
