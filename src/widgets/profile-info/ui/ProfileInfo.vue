<template>
  <div class="profile-info">
    <profile-base-info :user />
    <profile-roles />
    <profile-program :educations />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/entities/User'
import { ProfileBaseInfo, ProfileProgram, ProfileRoles } from '@/features/profile'

const userStore = useUserStore()
const { user, educations } = storeToRefs(userStore)
</script>

<style>
.profile-info > * {
  margin-top: 19px;
}
</style>
