import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { AppLayoutsEnum } from '@/layouts/layouts.types'
import { checkAuthKeycloak } from './middlewares/checkAuth'
import { checkSurveyUser } from './middlewares/checkSurveyUser'
import { loadLayoutMiddleware } from './middlewares/loadLayout'

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
    component: () => import('@/views/Surveys/SurveysView.vue'),
    children: [
      {
        path: '',
        name: 'SurveyList',
        component: () => import('@/components/Surveys/SurveyList.vue')
      },
      {
        path: 'create',
        name: 'CreateSurvey',
        component: () => import('@/components/Surveys/SurveyCreate.vue'),
        meta: {
          surveyCheck: true
        }
      },
      {
        path: ':id',
        name: 'SurveyPage',
        component: () => import('@/components/Surveys/SurveyPassing/SurveyPassing.vue')
      }
    ]
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
    redirect: { name: 'ProfileMain' }
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
router.beforeEach(checkSurveyUser)

export default router
