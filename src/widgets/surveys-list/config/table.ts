import { SurveyStatus } from '@/entities/Survey'
import type { TableButtonAction } from '../model/types'

export const surveyIsDraft = (status: SurveyStatus.Enum) => {
  return status !== SurveyStatus.Enum.DRAFT
}

export const SURVEY_ACTIONS: TableButtonAction[] = [
  {
    id: 'copy',
    icon: 'copy',
    title: 'Копировать опрос',
    isDisabled: (status: SurveyStatus.Enum) => !surveyIsDraft(status)
  },
  {
    id: 'edit',
    icon: 'edit',
    title: 'Редактировать опрос',
    isDisabled: (status: SurveyStatus.Enum) => surveyIsDraft(status)
  },
  {
    id: 'download',
    icon: 'download',
    title: 'Скачать опрос',
    isDisabled: (status: SurveyStatus.Enum) =>
      ![SurveyStatus.Enum.FINISHED, SurveyStatus.Enum.EXPIRED, SurveyStatus.Enum.CLOSED].includes(
        status
      )
  },
  {
    id: 'trash',
    icon: 'trash',
    title: 'Удалить опрос',
    isDisabled: (status: SurveyStatus.Enum) => surveyIsDraft(status)
  },
  {
    id: 'publish',
    icon: 'publish',
    title: 'Опубликовать опрос',
    isDisabled: (status: SurveyStatus.Enum) => status !== SurveyStatus.Enum.DRAFT
  },
  {
    id: 'close',
    icon: 'close',
    title: 'Закрыть опрос',
    isDisabled: (status: SurveyStatus.Enum) => status !== SurveyStatus.Enum.PUBLISHED
  }
]

export const FINISHED_STATUSES = [
  SurveyStatus.Enum.FINISHED,
  SurveyStatus.Enum.EXPIRED,
  SurveyStatus.Enum.CLOSED
] as SurveyStatus.Enum[]
