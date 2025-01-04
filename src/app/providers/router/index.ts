import { createRouter, createWebHistory } from 'vue-router'
import { checkAuthKeycloak, checkSurveyUser, loadLayoutMiddleware } from './middlewares'
import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(loadLayoutMiddleware)
router.beforeEach(checkAuthKeycloak)
router.beforeEach(checkSurveyUser)
