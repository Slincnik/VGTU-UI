export namespace Survey {
  export type SurveyQuestion = {
    id: string
    title: string
    type: SurveyQuestionType.Enum
    choices: Array<{
      id: string
      title: string[]
    }>
    answer?: SurveyAnswer
  }

  export type SurveyAnswer = {
    id: string
    question: string
    student: string
    text: string
    answerChoices?: Array<{
      id: string
      questionChoiceId?: string
      selected?: boolean
    }>
  }

  export type BaseSurvey = {
    id: string
    name: string
    status: SurveyStatus.Enum
    questions?: SurveyQuestion[]
    dateStart: Date
    dateEnd: Date
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
        return 'Развёрнутый ответ'
      case Enum.CHOICE:
        return 'Один вариант ответа'
      case Enum.MULTI_CHOICE:
        return 'Множественный выбор'
      default:
        throw new Error(`Non-existent value`)
    }
  }
}

export namespace SurveyStatus {
  export enum Enum {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    CLOSED = 'CLOSED',
    EXPIRED = 'EXPIRED'
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
      default:
        throw new Error(`Non-existent value`)
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
        throw new Error(`Non-existent value`)
    }
  }
}
