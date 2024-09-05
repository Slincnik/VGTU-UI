<template>
  <div class="d-flex">
    <v-avatar
      color="info"
      size="120"
    >
      {{ getInitials(user) }}
    </v-avatar>
    <div class="ml-5 d-flex flex-column justify-center profile-text-info">
      <span>{{ user?.lastName }}</span>
      <span class="font-weight-light">{{ user?.firstName }}</span>
      <span class="font-weight-light">{{ user?.middleName }}</span>
    </div>
  </div>
  <div>
    <v-list
      density="compact"
      class="px-0 py-0"
    >
      <v-list-item
        class="px-0"
        min-height="26"
        prepend-icon="custom:phone"
        :title="userKeycloak?.profile.phone_number ?? 'Не указано'"
      />
      <v-list-item
        class="px-0"
        min-height="26"
        prepend-icon="custom:email_open"
        :title="user?.email ?? 'Не указано'"
      />
    </v-list>
  </div>
</template>

<script setup lang="ts">
import type { Student } from '@/api/student/student.types'
import { authManager } from '@/service/keycloak/auth.config'
import { getInitials } from '@/utils/getInitials'

type Props = {
  user: Student.User | null
}

defineProps<Props>()

const userKeycloak = await authManager.getUser()
</script>

<style scoped>
.profile-text-info {
  gap: 6px;
}
</style>
