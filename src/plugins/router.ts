import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { loadLayoutMiddleware } from './middlewares/loadLayout'
import { checkAuthKeycloak } from './middlewares/checkAuth'
import { AppLayoutsEnum } from '@/layouts/layouts.types'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/TestView.vue')
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: () => import('@/views/TestView.vue')
  },
  {
    path: '/surveys',
    name: 'SurveysPage',
    component: () => import('@/views/Surveys/SurveysView.vue')
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/views/Profile/ProfileView.vue'),
    children: [
      {
        path: 'main',
        name: 'ProfileMain',
        component: () => import('@/components/ProfileInfo/ProfileInfo.vue')
      },
      {
        path: 'orders',
        name: 'ProfileOrders',
        component: () => import('@/components/ProfileInfo/ProfileInfo.vue')
      },
      {
        path: 'payments',
        name: 'ProfilePayments',
        component: () => import('@/components/ProfileInfo/ProfileInfo.vue')
      }
    ],
    redirect: () => {
      return { name: 'ProfileMain' }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound/NotFound.vue'),
    meta: {
      layout: AppLayoutsEnum.notdefault
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(loadLayoutMiddleware)
router.beforeEach(checkAuthKeycloak)

export default router
