import { h } from 'vue'

import type { IconProps, IconSet } from 'vuetify'

import iconEducation from '@/assets/svg/icon-education.svg'
import iconHome from '@/assets/svg/icon-home.svg'
import iconInfo from '@/assets/svg/icon-info.svg'
import iconLogout from '@/assets/svg/icon-logout.svg'
import iconMenu from '@/assets/svg/icon-menu.svg'
import iconPortfolio from '@/assets/svg/icon-portfolio.svg'
import iconRequest from '@/assets/svg/icon-request.svg'
import iconSchedule from '@/assets/svg/icon-schedule.svg'
import iconSurvey from '@/assets/svg/icon-survey.svg'
import iconTrash from '@/assets/svg/icon-trash.svg'
import iconDownload from '@/assets/svg/icon-download.svg'
import iconEdit from '@/assets/svg/icon-edit.svg'

const customSvgNameToComponent: Record<string, string> = {
  iconEducation,
  iconHome,
  iconInfo,
  iconLogout,
  iconMenu,
  iconPortfolio,
  iconRequest,
  iconSchedule,
  iconSurvey,
  iconTrash,
  iconDownload,
  iconEdit
}

const customSVGs: IconSet = {
  // @ts-ignore
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon])
}

export { customSVGs }
