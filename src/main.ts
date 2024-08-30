import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/main.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { vueKeycloak } from '@josempgon/vue-keycloak'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './plugins/router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

app.use(createPinia())

await vueKeycloak.install(app, {
  initOptions: {
    onLoad: 'check-sso',
    checkLoginIframe: true,
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
  },
  config: {
    url: import.meta.env.VITE_KEYCLOAK_CLIENT_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
  }
})

app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false
      }
    }
  }
})
app.mount('#app')
