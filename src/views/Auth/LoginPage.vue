<template>
  <v-card
    width="617"
    class="mx-auto"
    rounded="xl"
    elevation="1"
  >
    <v-img
      class="mx-auto mb-10 mt-10"
      width="120"
      :src="logo"
    />
    <v-form
      v-model="formValid"
      class="d-flex flex-column align-center justify-center w-100"
      @submit.prevent="login"
    >
      <v-card-title class="text-h3 font-weight-thin mb-3"> Авторизация</v-card-title>
      <v-text-field
        v-model="DTO.login"
        class="elevation-0"
        :rules="[rules.required]"
        density="compact"
        placeholder="Логин"
        variant="outlined"
        max-width="360"
        min-width="290"
      />

      <v-text-field
        v-model="DTO.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        :rules="[rules.required]"
        density="compact"
        placeholder="Пароль"
        variant="outlined"
        max-width="360"
        min-width="290"
        @click:append-inner="visible = !visible"
      />

      <v-btn
        :disabled="!formValid"
        type="submit"
        class="mt-6 mb-8 text-h5 font-weight-bold"
        max-width="360"
        min-width="290"
        color="blue"
        size="large"
        rounded="lg"
      >
        Войти
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logo from '@/assets/img/logo.svg'

const DTO = ref({
  login: '',
  password: ''
})
const formValid = ref(false)
const visible = ref(false)

const login = () => {
  if (!formValid.value) return
  console.log('login')
}

const rules = {
  required: (value: string) => !!value || 'Обязательное поле'
}
</script>
