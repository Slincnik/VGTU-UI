import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from './middlewares/loadLayout'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/TestView.vue')
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)

export default router
