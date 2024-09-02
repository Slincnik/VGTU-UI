<template>
  <div
    v-if="isUserLoading || isEducationLoading"
    class="d-flex justify-center flex-column h-100"
  >
    <v-progress-circular
      class="mx-auto"
      indeterminate
      :size="36"
    />
  </div>
  <div
    v-else
    class="px-5 py-5"
  >
    <span class="text-size">Профиль пользователя</span>
    <profile-tabs />
    <router-view class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { getUserEducations, getUser } from '@/api/student'
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs.vue'

const { data: user, isLoading: isUserLoading } = useQuery({
  queryKey: ['user'],
  queryFn: getUser,
  retry: 0
})

const enabled = computed(() => !!user.value?.id)

const { isLoading: isEducationLoading } = useQuery({
  queryKey: ['studentEducation'],
  queryFn: getUserEducations,
  enabled,
  retry: 0
})
</script>
