<template>
  <v-card width="617" class="mx-auto" rounded="xl" elevation="1">
    <v-img class="mx-auto mb-10 mt-10" width="120" :src="logo"></v-img>
    <v-form
      v-model="formValid"
      class="d-flex flex-column align-center justify-center w-100"
      @submit.prevent="login"
    >
      <v-card-title class="text-h3 font-weight-thin mb-3"> Авторизация</v-card-title>
      <v-text-field
        class="elevation-0"
        v-model="DTO.login"
        :rules="[rules.required]"
        density="compact"
        placeholder="Логин"
        variant="outlined"
        max-width="360"
        min-width="290"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        v-model="DTO.password"
        :rules="[rules.required]"
        density="compact"
        placeholder="Пароль"
        variant="outlined"
        @click:append-inner="visible = !visible"
        max-width="360"
        min-width="290"
      ></v-text-field>

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

const login = () => {
  if (!formValid.value) return
  console.log('login')
}
const DTO = ref({
  login: '',
  password: ''
})
const formValid = ref(false)
const visible = ref(false)

const rules = {
  required: (value: string) => !!value || 'Обязательное поле'
}
</script>
