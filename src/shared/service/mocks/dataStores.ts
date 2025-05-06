import type { Survey, SurveyMeta } from '@/entities/Survey'

export const surveyMetaStore = new Map<string, SurveyMeta.Base>()

export const surveyStore = new Map<string, Survey.Base>()