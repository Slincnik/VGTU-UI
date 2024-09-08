import type { VueElement } from 'vue'
import type { AppLayoutsEnum } from '@/layouts/layouts.types'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: VueElement
    guest?: boolean
    surveyCheck?: boolean
  }
}
