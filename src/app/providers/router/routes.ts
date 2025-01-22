import type { RouteRecordRaw } from 'vue-router'
import { AppLayoutsEnum } from '@/shared/ui/layouts'

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home')
  },
  {
    path: '/schedule',
    name: 'SchedulePage',
    component: () => import('@/pages/schedule'),
    children: [
      {
        path: '',
        name: 'ScheduleCalendar',
        component: () => import('@/widgets/schedule-calendar')
      }
    ]
  },
  {
    path: '/surveys',
    name: 'SurveysPage',
    component: () => import('@/pages/surveys'),
    children: [
      {
        path: '',
        name: 'SurveyList',
        component: () => import('@/widgets/surveys-list')
      },
      {
        path: 'create',
        name: 'CreateSurvey',
        component: () => import('@/widgets/survey-create'),
        meta: {
          surveyCheck: true
        }
      },
      {
        path: ':id',
        name: 'SurveyPage',
        component: () => import('@/widgets/survey-passing')
      }
    ]
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('@/pages/profile'),
    children: [
      {
        path: 'main',
        name: 'ProfileMain',
        component: () => import('@/widgets/profile-info')
      },
      {
        path: 'orders',
        name: 'ProfileOrders',
        component: () => import('@/widgets/profile-info')
      },
      {
        path: 'payments',
        name: 'ProfilePayments',
        component: () => import('@/widgets/profile-info')
      }
    ],
    redirect: { name: 'ProfileMain' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/not-found'),
    meta: {
      layout: AppLayoutsEnum.HOME
    }
  }
]
