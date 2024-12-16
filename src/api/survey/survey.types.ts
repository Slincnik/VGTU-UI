export type SurveyMetaDTO = {
  name: string
  type: SurveyType.Enum | null
  filters: Array<{
    objectId: string
    type: FilterType.Enum
    title: string
  }>
  startDate: Date | undefined
  endDate: Date | undefined
  questions: Array<{
    title: string
    type: SurveyQuestionType.Enum
    choices: Survey.QuestionChoices[]
  }>
}

export namespace Survey {
  export type Base = {
    id: string
    name: string
    status: SurveyStatus.Enum
    type: SurveyType.Enum
    questions: Question[]
    startDate: Date
    endDate: Date
  }

  export type Question = {
    id: string
    title: string
    type: SurveyQuestionType.Enum
    choices: QuestionChoices[]
    answer?: Answer
  }

  export type Answer = {
    id: string
    answerChoices: Array<{
      id: string
      questionChoiceId: string
      selected: boolean
    }>
    question: string
    text: string
  }

  export type QuestionChoices = {
    id: string
    title: string
  }
}

export namespace SurveyMeta {
  export type Base = {
    id: string
    name: string
    type: SurveyType.Enum
    status: SurveyStatus.Enum
    filters: Filter[]
    questions: Question[]
    startDate: Date
    endDate: Date
  }

  export type Question = {
    id?: string
    title: string
    type: SurveyQuestionType.Enum
    choices: Survey.QuestionChoices[]
  }

  export type Filter = {
    id: string
    objectId: string
    type: FilterType.Enum
    title: string
  }
}

export type CommonSurveyType = Survey.Base | SurveyMeta.Base

export namespace FilterType {
  export enum Enum {
    FACULTY = 'FACULTY',
    COURSE = 'COURSE',
    GROUP = 'GROUP',
    DIRECTION = 'DIRECTION'
  }

  export function getValue(value: Enum): string {
    switch (value) {
      case Enum.FACULTY:
        return 'Факультет'
      case Enum.COURSE:
        return 'Курс'
      case Enum.GROUP:
        return 'Группа'
      case Enum.DIRECTION:
        return 'Направление'
      default:
        return 'Неизвестно'
    }
  }
  export function values() {
    return [Enum.FACULTY, Enum.COURSE, Enum.GROUP, Enum.DIRECTION]
  }
}

export namespace SurveyQuestionType {
  export enum Enum {
    TEXT = 'TEXT',
    CHOICE = 'CHOICE',
    MULTI_CHOICE = 'MULTI_CHOICE'
  }

  export function getValue(value: Enum): string {
    switch (value) {
      case Enum.TEXT:
        return 'Текстовый'
      case Enum.CHOICE:
        return 'Выбор'
      case Enum.MULTI_CHOICE:
        return 'Множественный выбор'
      default:
        throw new Error(`Non-existent value`)
    }
  }
  export function values() {
    return [Enum.TEXT, Enum.CHOICE, Enum.MULTI_CHOICE]
  }
}

export namespace SurveyStatus {
  export enum Enum {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    CLOSED = 'CLOSED',
    EXPIRED = 'EXPIRED',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
  }

  export function getValue(value: Enum): string {
    switch (value) {
      case Enum.NOT_STARTED:
        return 'Не начат'
      case Enum.IN_PROGRESS:
        return 'В процессе'
      case Enum.FINISHED:
        return 'Пройден'
      case Enum.CLOSED:
        return 'Принудительно завершен'
      case Enum.EXPIRED:
        return 'Завершен'
      case Enum.DRAFT:
        return 'Черновик'
      case Enum.PUBLISHED:
        return 'Опубликован'
      default:
        return 'Неизвестно'
    }
  }
}

export namespace SurveyType {
  export enum Enum {
    OTHER = 'OTHER',
    STUDENT_EYES_TEACHERS = 'STUDENT_EYES_TEACHERS'
  }

  export function getValue(value: Enum): string {
    switch (value) {
      case Enum.OTHER:
        return 'Другое'
      case Enum.STUDENT_EYES_TEACHERS:
        return 'Преподаватель глазами студента'
      default:
        return 'Неизвестно'
    }
  }
  export function values() {
    return [Enum.STUDENT_EYES_TEACHERS]
  }
}
