export type BaseSortedResponse = {
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: 0
    pageSize: number
    paged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
  totalPages: number
}

export enum SurveyStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
  DRAFT = 'DRAFT'
}

export enum SurveyType {
  OTHER = 'OTHER',
  STUDENT_EYES_TEACHERS = 'STUDENT_EYES_TEACHERS'
}

export enum QuestionType {
  TEXT = 'TEXT',
  CHOICE = 'CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE'
}

export type AnswerChoice = {
  questionChoiceId?: string
  selected?: boolean
}

export type Answer = {
  question?: string
  student?: string
  text?: string
  answerChoices?: AnswerChoice[]
}

export type Question = {
  id: string
  title: string
  type: QuestionType
  choices: string[]
  answer?: Answer
}

export type Survey = {
  id: string
  name: string
  status: SurveyStatus
  questions: Question[]
  dateStart: Date
  dateEnd: Date
}

export type User = {
  id: string
  externalId: string
  isDummy: true
  lastModifyDate: Date
  firstName: string
  lastName: string
  middleName: string
  username: string
  email: string
}

export type GradeBook = {
  id: string
  number: string
  isDummy: boolean
  externalId: string
  lastModifyDate: Date
}

export type UserEducation = {
  course: string
  dateStart: Date
  educationDirection: string
  educationForm: string
  educationLevel: string
  educationProfile: string
  educationStatus: string
  gradeBook: string
  trainingBasis: string
}

export function getValueSurveyStatus(value: SurveyStatus): string {
  switch (value) {
    case SurveyStatus.NOT_STARTED:
      return 'Не начат'
    case SurveyStatus.IN_PROGRESS:
      return 'В процессе'
    case SurveyStatus.FINISHED:
      return 'Пройден'
    case SurveyStatus.CLOSED:
      return 'Принудительно завершен'
    case SurveyStatus.EXPIRED:
      return 'Завершен'
    case SurveyStatus.DRAFT:
      return 'Черновик'
    default:
      throw new Error(`Non-existent value`)
  }
}

export function getValueSurveyType(value: SurveyType): string {
  switch (value) {
    case SurveyType.OTHER:
      return 'Другое'
    case SurveyType.STUDENT_EYES_TEACHERS:
      return 'Преподаватель глазами студента'
    default:
      throw new Error(`Non-existent value`)
  }
}
