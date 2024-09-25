<template>
  <v-btn
    v-bind="$attrs"
    color="grey"
    variant="outlined"
    :ripple="false"
    append-icon="schedule"
  >
    {{ date ? new Intl.DateTimeFormat().format(date) : text }}
    <v-menu
      activator="parent"
      location="top"
    >
      <v-date-picker
        v-model="date"
        hide-header
        show-adjacent-months
      />
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
const date = defineModel<Date>()
const text = defineModel<string>('text', { required: true })
</script>
