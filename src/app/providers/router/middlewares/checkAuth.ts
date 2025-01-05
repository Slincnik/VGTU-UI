import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { authManager } from '@/shared/service/auth'

export async function checkAuthKeycloak(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const user = await authManager.getUser()

  if (to.path !== '/callback') {
    if (!user || user.expired) {
      await authManager.signinRedirect()
    }
    next()
  } else if (to.path === '/callback') {
    if (to.query.code) {
      await authManager.signinCallback()
    }
    next({ path: '/' })
  }
}
