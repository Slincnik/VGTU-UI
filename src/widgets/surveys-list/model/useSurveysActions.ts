import { useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { type CommonSurveyType, SurveyStatus } from '@/entities/Survey'
import { surveyApi } from '@/features/surveys'
import { FINISHED_STATUSES, SURVEY_ACTIONS, surveyIsDraft } from '../config/table'

export const useSurveysActions = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const handleCopy = async (item: CommonSurveyType) => {
    if (!surveyIsDraft(item.status)) return
    const newSurvey = await surveyApi.copySurveyMeta(item.id)
    queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) => [...old, newSurvey])
  }

  const handleEdit = async (item: CommonSurveyType) => {
    if (surveyIsDraft(item.status)) return
    router.push(`/surveys/create?id=${item.id}`)
  }

  const handleDownload = async (item: CommonSurveyType) => {
    if (!FINISHED_STATUSES.includes(item.status)) return
    const file = await surveyApi.downloadSurveyMeta(item.id)
    window.open(URL.createObjectURL(file))
  }

  const handleRemove = async (item: CommonSurveyType) => {
    if (surveyIsDraft(item.status)) return
    await surveyApi.deleteSurveyMeta(item.id)
    queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) =>
      old.filter(it => it.id !== item.id)
    )
  }

  const handlePublish = async (item: CommonSurveyType) => {
    if (item.status !== SurveyStatus.Enum.PUBLISHED) return
    await surveyApi.publishSurveyMeta(item.id)
    queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) =>
      old.map(it => (it.id === item.id ? { ...it, status: SurveyStatus.Enum.IN_PROGRESS } : it))
    )
  }

  const handleClose = async (item: CommonSurveyType) => {
    await surveyApi.closeSurveyMeta(item.id)

    queryClient.setQueryData(['surveys'], (old: CommonSurveyType[]) =>
      old.map(it => (it.id === item.id ? { ...it, status: SurveyStatus.Enum.CLOSED } : it))
    )
  }

  const actions = SURVEY_ACTIONS.map(action => ({
    ...action,
    onClick: async (item: CommonSurveyType) => {
      try {
        switch (action.id) {
          case 'copy':
            await handleCopy(item)
            break
          case 'edit':
            await handleEdit(item)
            break
          case 'download':
            await handleDownload(item)
            break
          case 'remove':
            await handleRemove(item)
            break
          case 'publish':
            await handlePublish(item)
            break
          case 'close':
            await handleClose(item)
            break
        }
      } catch (error) {
        console.debug(`Error in ${action.id} action:`, error)
      }
    }
  }))

  return { actions }
}
