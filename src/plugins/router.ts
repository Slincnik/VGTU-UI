import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { loadLayoutMiddleware } from './middlewares/loadLayout'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/TestView.vue')
  }
]

const initRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })
  router.beforeEach(loadLayoutMiddleware)

  return router
}

export { initRouter }
