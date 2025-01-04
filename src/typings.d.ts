import type { VueElement } from 'vue'
import type { AppLayoutsEnum } from '@/shared/ui/layouts'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: VueElement
    guest?: boolean
    surveyCheck?: boolean
  }
}
