<template>
  <div class="profile-info">
    <profile-base-info :user />
    <profile-roles />
    <profile-program :educations />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import ProfileProgram from './ProfileInfoTabs/ProfileProgram.vue'
import ProfileRoles from './ProfileInfoTabs/ProfileRoles.vue'
import ProfileBaseInfo from './ProfileInfoTabs/ProfileBaseInfo.vue'

const authStore = useAuthStore()
const { user, educations } = storeToRefs(authStore)
</script>

<style>
.profile-info > * {
  margin-top: 20px;
}
</style>
