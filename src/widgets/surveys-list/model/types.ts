import type { CommonSurveyType, SurveyStatus } from '@/entities/Survey'

export type TableButtonAction = {
  id: string
  title: string
  icon: string
  isDisabled: (status: SurveyStatus.Enum) => boolean
  onClick?: (item: CommonSurveyType) => void
}
