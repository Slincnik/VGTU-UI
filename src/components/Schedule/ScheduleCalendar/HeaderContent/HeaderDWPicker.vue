<template>
  <div class="dw-picker">
    <v-btn-toggle
      v-model="selectedView"
      :ripple="false"
      selected-class="dw-picker--selected"
      class="dw-picker"
      @click="selectView"
    >
      <v-btn value="day">День</v-btn>
      <v-btn
        v-if="!isMobileView"
        value="week"
      >Неделя</v-btn
      >
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { width } = useDisplay()

const emit = defineEmits<{
  (e: 'update-view', view: string): void
}>()

const selectedView = defineModel<string>('selectedView', {
  default: 'week'
})

const isMobileView = computed(() => {
  return width.value < 757
})

watch(
  isMobileView,
  newValue => {
    if (newValue) {
      selectedView.value = 'day'
      emit('update-view', 'day')
    }
  },
  { immediate: true }
)

const selectView = () => {
  emit('update-view', selectedView.value)
}
</script>

<style scoped>
.dw-picker {
  display: flex;
  gap: 12px;
  > button {
    border: 2px solid var(--color-accent-nord7);
    border-radius: 8px;
  }
}
.dw-picker--selected {
  background-color: var(--color-accent-nord7);
}
</style>
