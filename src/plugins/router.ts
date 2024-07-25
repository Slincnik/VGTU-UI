import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from './middlewares/loadLayout'
import { AppLayoutsEnum } from '@/layouts/layouts.types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/TestView.vue'),
      meta: {
        layout: AppLayoutsEnum.authed
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/Auth/LoginPage.vue')
    },
    {
      path: '/schedule',
      name: 'SchedulePage',
      component: () => import('@/views/TestView.vue'),
      meta: {
        layout: AppLayoutsEnum.authed
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFound/NotFound.vue')
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)

export default router
