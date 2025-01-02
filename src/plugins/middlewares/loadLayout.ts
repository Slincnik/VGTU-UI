import type { RouteLocationNormalized } from 'vue-router'
import { AppLayoutToFileMap, AppLayoutsEnum } from '@/layouts/layouts.types'

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const { layout } = route.meta
  const normalizedLayoutName = layout || AppLayoutsEnum.default
  const fileName = AppLayoutToFileMap[normalizedLayoutName]
  const [fileNameWithoutExtension] = fileName.split('.vue')

  const component = await import(`../../layouts/${fileNameWithoutExtension}.vue`)
  route.meta.layoutComponent = component.default
}
