import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { canAccept } from '@/utils/checkSurveyCreateUser'

export async function checkSurveyUser(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (!to.meta.surveyCheck) {
    next()
    return
  }

  const isAllowed = await canAccept()

  if (isAllowed) {
    next()
  } else {
    next({ path: from.path })
  }
}
