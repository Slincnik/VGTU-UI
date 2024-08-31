<template>
  <div class="px-5 py-5">
    <span class="text-size">Профиль пользователя</span>
    <profile-tabs />
    <router-view class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs.vue'
</script>
