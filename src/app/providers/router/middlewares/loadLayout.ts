import type { RouteLocationNormalized } from 'vue-router'
import { AppLayoutToFileMap, AppLayoutsEnum } from '@/shared/ui/layouts'

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const { layout } = route.meta

  const normalizedLayoutName = layout || AppLayoutsEnum.DEFAULT
  const fileName = AppLayoutToFileMap[normalizedLayoutName]
  const [fileNameWithoutExtension] = fileName.split('.vue')

  const components = await import(`@/shared/ui/layouts`)
  // @ts-expect-error: fix sometime
  const component = components[fileNameWithoutExtension]
  route.meta.layoutComponent = component
}
