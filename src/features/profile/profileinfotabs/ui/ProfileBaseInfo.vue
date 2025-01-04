<template>
  <div class="d-flex">
    <v-avatar
      color="info"
      size="120"
    >
      {{ getInitials(user) }}
    </v-avatar>
    <div class="ml-5 d-flex flex-column justify-center profile-text-info">
      <span>{{ user?.lastName ?? 'Не указано' }}</span>
      <span class="font-weight-light">{{ user?.firstName ?? 'Не указано' }}</span>
      <span class="font-weight-light">{{ user?.middleName ?? 'Не указано' }}</span>
    </div>
  </div>
  <div>
    <v-list
      density="compact"
      class="pa-0"
    >
      <v-list-item
        class="px-0"
        min-height="26"
        prepend-icon="phone"
        :title="userKeycloak?.profile.phone_number ?? 'Не указано'"
      />
      <v-list-item
        class="px-0"
        min-height="26"
        prepend-icon="email_open"
        :title="user?.email ?? 'Не указано'"
      />
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { User } from 'oidc-client-ts'
import type { IUser } from '@/entities/User'
import { getInitials } from '@/entities/User'
import { authManager } from '@/shared/service/auth'

type Props = {
  user: IUser.User | null
}

defineProps<Props>()

const userKeycloak = ref<User | null>(null)

onMounted(async () => {
  userKeycloak.value = await authManager.getUser()
})
</script>

<style scoped>
.profile-text-info {
  gap: 6px;
}
</style>
