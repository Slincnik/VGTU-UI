import { computed } from 'vue'
import { canAccept } from '@/entities/Survey'
import { surveyApi } from '@/features/surveys'

enum Align {
  CENTER = 'center',
  START = 'start',
  END = 'end'
}

export async function useSurveyList() {
  const isCanAccept = await canAccept()

  const userType = computed(() => {
    return isCanAccept ? 'teacher' : 'student'
  })

  const surveyFn = computed<
    typeof surveyApi.getAllSurveysMeta | typeof surveyApi.getAllStudentSurveys
  >(() => {
    return userType.value === 'teacher'
      ? surveyApi.getAllSurveysMeta
      : surveyApi.getAllStudentSurveys
  })

  const commonHeaders = [
    { key: 'name', title: 'Название', align: Align.CENTER, sortable: false },
    { key: 'type', title: 'Тип', align: Align.CENTER, sortable: false },
    { key: 'status', title: 'Статус', align: Align.CENTER, sortable: false },
    { key: 'startDate', title: 'Дата начала', align: Align.CENTER, sortable: false },
    { key: 'endDate', title: 'Дата окончания', align: Align.CENTER, sortable: false }
  ]

  const teacherSpecificHeaders = [
    { key: 'actions', title: 'Опции', align: Align.CENTER, sortable: false }
  ]

  const headers = computed(() => {
    if (userType.value === 'teacher') {
      return [...commonHeaders, ...teacherSpecificHeaders]
    }
    return commonHeaders
  })

  return { isCanAccept, userType, surveyFn, headers }
}
