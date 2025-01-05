<template>
  <v-progress
    v-if="isLoading || isEducationLoading"
    class="h-100"
  />
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
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/entities/User'
import { ProfileTabs } from '@/features/profile'
import VProgress from '@/shared/ui/progress'
import { getUser, getUserEducations } from '../api'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const { isLoading } = getUser()

const enabled = computed(() => !!user.value?.id)

const { isLoading: isEducationLoading } = getUserEducations(enabled)
</script>
