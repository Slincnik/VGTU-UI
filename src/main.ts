import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/main.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases } from 'vuetify/iconsets/mdi-svg'

import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './plugins/router'
import { custom } from './service/icons/icon.service'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      custom
    }
  }
})

const app = createApp(App)

app.use(createPinia())

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
