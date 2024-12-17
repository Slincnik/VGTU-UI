import { computed, reactive, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute, useRouter } from 'vue-router'
import { getDictionaryByName } from '@/api/dictionary'
import {
  FilterType,
  type SurveyMeta,
  type SurveyMetaDTO,
  SurveyType
} from '@/api/survey/survey.types'
import { createSurveyMeta, getSurveyMetaById, updateSurveyMeta } from '@/api/survey/survey.meta'

export function useSurveyForm() {
  const search = ref('')

  const surveyData = reactive<SurveyMetaDTO>({
    name: '',
    type: SurveyType.Enum.STUDENT_EYES_TEACHERS,
    filters: [],
    startDate: undefined,
    endDate: undefined,
    questions: []
  })

  const router = useRouter()
  const route = useRoute()
  const queryClient = useQueryClient()

  const surveyIdIsExist = computed(() => !!route.query.id)

  const isFormValid = computed(() => {
    return (
      surveyData.name &&
      surveyData.startDate &&
      surveyData.endDate &&
      surveyData.filters.length > 0 &&
      surveyData.questions.length > 0 &&
      new Date(surveyData.startDate) < new Date(surveyData.endDate)
    )
  })

  const {
    data: items,
    isLoading: isLoadingDictionary,
    refetch
  } = useQuery({
    queryKey: ['dictionaryGroups'],
    queryFn: () => getDictionaryByName(search.value),
    select: data => {
      return data.content.map(item => ({
        objectId: item.id,
        type: FilterType.Enum.GROUP,
        title: item.name
      }))
    },
    enabled: false
  })

  watchDebounced(
    search,
    newValue => {
      if (!newValue) return
      refetch()
    },
    { debounce: 500 }
  )

  const { data: isSurveyExist, isLoading: isSurveyPending } = useQuery({
    queryKey: ['survey', route.query.id],
    queryFn: () => getSurveyMetaById(route.query.id as string),
    enabled: surveyIdIsExist,
    select(data) {
      if (!data) return false
      Object.assign(surveyData, {
        ...data,
        startDate: new Date(data.startDate as unknown as string),
        endDate: new Date(data.endDate as unknown as string)
      })
      return true
    }
  })

  const mutationFn = computed(() => {
    if (!isSurveyExist.value) return createSurveyMeta
    return updateSurveyMeta
  })

  const { isPending, mutate } = useMutation({
    mutationFn: (newSurvey: SurveyMetaDTO) => mutationFn.value(newSurvey),
    onSuccess: data => {
      queryClient.setQueryData(['surveys'], (old: SurveyMeta.Base[]) =>
        surveyIdIsExist.value
          ? old.map(item => (item.id === data.id ? { ...item, ...data } : item))
          : [...old, data]
      )

      if (surveyIdIsExist.value) {
        queryClient.setQueryData(['survey', data.id], (oldData: SurveyMeta.Base) =>
          oldData ? { ...oldData, ...data } : oldData
        )
      }
      router.push('/surveys')
    }
  })

  const isDisabled = computed(() => isPending.value || isSurveyPending.value)

  const handleClick = () => {
    if (!isFormValid.value) return
    mutate(surveyData)
  }

  return {
    surveyData,
    search,
    items,
    isLoadingDictionary,
    isSurveyPending,
    isPending,
    isSurveyExist,
    isFormValid,
    isDisabled,
    handleClick
  }
}
