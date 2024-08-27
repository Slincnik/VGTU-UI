import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/main.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { vueKeycloak } from '@josempgon/vue-keycloak'
import App from './App.vue'
import { initRouter } from './plugins/router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

app.use(createPinia())

await vueKeycloak.install(app, {
  initOptions: {
    flow: 'hybrid'
  },
  config: {
    url: import.meta.env.VITE_KEYCLOAK_CLIENT_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
  }
})

app.use(initRouter())
app.use(vuetify)
app.mount('#app')
