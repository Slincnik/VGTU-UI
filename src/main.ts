import { createApp } from 'vue'
import { createPinia } from 'pinia'
import DateFnsAdapter from '@date-io/date-fns'
import { ru } from 'date-fns/locale'

import '@/assets/main.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { aliases } from 'vuetify/iconsets/mdi-svg'
import App from './App.vue'
import router from './plugins/router'
import { custom } from './service/icons/icon.service'

const dateAdapted = new DateFnsAdapter({
  locale: ru
})
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom
    }
  },
  date: {
    adapter: dateAdapted
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
