import { createApp } from 'vue'
import DateFnsAdapter from '@date-io/date-fns'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { ru } from 'date-fns/locale'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { aliases } from 'vuetify/iconsets/mdi-svg'
// Vuetify
import 'vuetify/styles'
import '@/app/assets/main.css'
import { custom } from '@/shared/service/icons'
import App from './App.vue'
import { router } from './providers/router'

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

export const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .use(VueQueryPlugin, {
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
