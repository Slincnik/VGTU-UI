import { faker } from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import {
  FilterType,
  type Survey,
  type SurveyMeta,
  type SurveyMetaDTO,
  SurveyQuestionType,
  SurveyStatus,
  SurveyType
} from '@/entities/Survey'
import type { IUser } from '@/entities/User'
import type { GradeBook } from '@/features/schedule/api/gradebook/gradebook.types'
import type { Dictionary } from '@/features/surveys/api/dictionary/dictionary.types'
import { type ResponseEntity, api } from '@/shared/api'
import { surveyMetaStore, surveyStore } from './dataStores'
import users from './users.json'

let initialized = false

function createQuestionChoice(): Survey.QuestionChoices {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(2)
  }
}

function createQuestionChoices(): SurveyMeta.Question['choices'] {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(2)
    }),
    { count: { min: 2, max: 5 } }
  )
}

function createSurveyMetaQuestion(): SurveyMeta.Question {
  const type = faker.helpers.arrayElement(SurveyQuestionType.values())

  return {
    title: faker.lorem.sentence(),
    type,
    choices: type === SurveyQuestionType.Enum.TEXT ? [] : createQuestionChoices()
  }
}

function createSurveyMetaFilter(): SurveyMeta.Filter {
  return {
    id: faker.string.uuid(),
    objectId: faker.string.uuid(),
    type: faker.helpers.arrayElement(FilterType.values()),
    title: faker.lorem.word()
  }
}

export const createSurveyAnswer = (question: Survey.Question): Survey.Answer => {
  return {
    id: faker.string.uuid(),
    question: question.id,
    text: question.type === 'TEXT' ? faker.lorem.sentence() : '',
    answerChoices:
      question.type === 'TEXT'
        ? []
        : question.choices.map(choice => ({
            id: faker.string.uuid(),
            questionChoiceId: choice.id,
            selected: faker.datatype.boolean()
          }))
  }
}

const findSurveyByQuestionId = (questionId: string) => {
  for (const survey of surveyStore.values()) {
    if (survey.questions.some(q => q.id === questionId)) {
      return survey
    }
  }
  return undefined
}

const findQuestionByIdInSurvey = (survey: Survey.Base, questionId: string) => {
  return survey.questions.find(({ id }) => id === questionId)
}

function createSurveyMeta(overrides: Partial<SurveyMeta.Base> = {}): SurveyMeta.Base {
  const statusOptions = Object.values(SurveyStatus.Enum).filter(
    s => s !== SurveyStatus.Enum.NOT_STARTED && s !== SurveyStatus.Enum.IN_PROGRESS
  )

  const id = faker.string.uuid()

  const survey = {
    id,
    name: faker.company.catchPhrase(),
    type: faker.helpers.arrayElement(SurveyType.values()),
    status: faker.helpers.arrayElement(statusOptions),
    filters: faker.helpers.multiple(createSurveyMetaFilter, { count: { min: 1, max: 4 } }),
    questions: faker.helpers.multiple(createSurveyMetaQuestion, { count: { min: 2, max: 6 } }),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    ...overrides
  }

  surveyMetaStore.set(id, survey)

  return survey
}

export function createSurveyMetaResponse(
  count = 5,
  overrides: Partial<ResponseEntity<SurveyMeta.Base[]>> = {}
): ResponseEntity<SurveyMeta.Base[]> {
  const items = Array.from({ length: count }, () => createSurveyMeta())
  const base: ResponseEntity<SurveyMeta.Base[]> = {
    content: items,
    pageable: {
      sort: { empty: true, unsorted: true, sorted: false },
      offset: 0,
      pageNumber: 0,
      pageSize: count,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: count,
    totalPages: 1,
    size: count,
    number: 0,
    sort: { empty: true, unsorted: true, sorted: false },
    numberOfElements: count,
    first: true,
    empty: count === 0
  }

  return { ...base, ...overrides }
}

function createSurveyQuestion(): Survey.Question {
  const type = faker.helpers.arrayElement(SurveyQuestionType.values())
  const choices =
    type === SurveyQuestionType.Enum.TEXT
      ? []
      : faker.helpers.multiple(createQuestionChoice, { count: { min: 2, max: 5 } })

  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    type,
    choices
  }
}

function createSurvey(overrides: Partial<Survey.Base> = {}): Survey.Base {
  const questions = faker.helpers.multiple(createSurveyQuestion, {
    count: { min: 2, max: 5 }
  })

  const statusOptions = Object.values(SurveyStatus.Enum).filter(
    s => s === SurveyStatus.Enum.NOT_STARTED || s === SurveyStatus.Enum.IN_PROGRESS
  )

  const id = faker.string.uuid()

  const survey: Survey.Base = {
    id,
    name: faker.company.catchPhrase(),
    status: faker.helpers.arrayElement(statusOptions),
    type: faker.helpers.arrayElement(SurveyType.values()),
    questions,
    startDate: faker.date.past(),
    endDate: faker.date.future()
  }

  surveyStore.set(id, survey)

  return { ...survey, ...overrides }
}

export function createSurveyResponse(
  count = 5,
  overrides: Partial<ResponseEntity<Survey.Base[]>> = {}
): ResponseEntity<Survey.Base[]> {
  const items = Array.from({ length: count }, () => createSurvey())
  const base: ResponseEntity<Survey.Base[]> = {
    content: items,
    pageable: {
      sort: { empty: true, unsorted: true, sorted: false },
      offset: 0,
      pageNumber: 0,
      pageSize: count,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: count,
    totalPages: 1,
    size: count,
    number: 0,
    sort: { empty: true, unsorted: true, sorted: false },
    numberOfElements: count,
    first: true,
    empty: count === 0
  }

  return { ...base, ...overrides }
}

function createGradeBook(overrides: Partial<GradeBook> = {}): GradeBook {
  const mock: GradeBook = {
    id: faker.string.uuid(),
    number: faker.string.alpha(8),
    isDummy: faker.datatype.boolean(),
    externalId: faker.string.uuid(),
    lastModifyDate: faker.date.recent()
  }
  return { ...mock, ...overrides }
}

export function createStructureGroup(
  overrides: Partial<Dictionary.StructureGroup> = {}
): Dictionary.StructureGroup {
  const item: Dictionary.StructureGroup = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    isDummy: faker.datatype.boolean(),
    lastModifyDate: faker.date.recent(),
    externalId: faker.string.uuid()
  }

  return { ...item, ...overrides }
}

export function createStructureGroupResponse(
  count = 5,
  overrides: Partial<ResponseEntity<Dictionary.StructureGroup[]>> = {}
): ResponseEntity<Dictionary.StructureGroup[]> {
  const items = Array.from({ length: count }, () => createStructureGroup())
  const base: ResponseEntity<Dictionary.StructureGroup[]> = {
    content: items,
    pageable: {
      sort: { empty: true, unsorted: true, sorted: false },
      offset: 0,
      pageNumber: 0,
      pageSize: count,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: count,
    totalPages: 1,
    size: count,
    number: 0,
    sort: { empty: true, unsorted: true, sorted: false },
    numberOfElements: count,
    first: true,
    empty: count === 0
  }

  return { ...base, ...overrides }
}

export function createEducation(overrides: Partial<IUser.Education> = {}): IUser.Education {
  const education: IUser.Education = {
    group: faker.string.alphanumeric(5),
    course: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
    faculty: faker.company.name(),
    gradeBook: faker.string.alpha(8),
    trainingBasis: faker.helpers.arrayElement(['Бюджет', 'Контракт']),
    educationLevel: faker.helpers.arrayElement(['Бакалавриат', 'Магистратура']),
    educationStatus: faker.helpers.arrayElement(['Обучается', 'Отчислен']),
    educationForm: faker.helpers.arrayElement(['Очная', 'Заочная', 'Очно-заочная']),
    educationProfile: faker.commerce.department(),
    educationDirection: faker.commerce.productName(),
    dateStart: faker.date.past({ years: 5 })
  }

  return { ...education, ...overrides }
}

function createGradeBookResponse(
  count: number = 5,
  overrides: Partial<ResponseEntity<GradeBook[]>> = {}
): ResponseEntity<GradeBook[]> {
  const items = Array.from({ length: count }, () => createGradeBook())
  const base: ResponseEntity<GradeBook[]> = {
    content: items,
    pageable: {
      sort: { empty: true, unsorted: true, sorted: false },
      offset: 0,
      pageNumber: 0,
      pageSize: count,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: count,
    totalPages: 1,
    size: count,
    number: 0,
    sort: { empty: true, unsorted: true, sorted: false },
    numberOfElements: count,
    first: true,
    empty: count === 0
  }
  return { ...base, ...overrides }
}

export function createEducationList(count = 5): IUser.Education[] {
  return Array.from({ length: count }, () => createEducation())
}

export function setupMock() {
  if (initialized) return
  initialized = true

  const mock = new MockAdapter(api, { delayResponse: 300 })

  mock.onGet(/user\/student\/external/).reply(config => {
    const match = config.url?.match(/user\/student\/external\/([^\/]+)/)
    const id = match ? String(match[1]) : null

    const user = users.find(user => user.id === id) as unknown as IUser.Base
    return users ? [200, user] : [404, { message: 'User not found' }]
  })

  mock.onGet(/dictionary\/structure\/group\/all/).reply(() => {
    const response = createStructureGroupResponse(100)

    return [200, response]
  })

  mock.onGet(/statement\/grade\/book\/all/).reply(() => {
    const response = createGradeBookResponse(1)

    return [200, response]
  })

  mock.onGet(/user\/student\/education/).reply(config => {
    const match = config.url?.split('?')[1] || ''

    if (!match.length) {
      return [404]
    }

    const educations = createEducationList(2)

    return [200, educations]
  })

  mock.onGet(/schedule\/study\/schedule\/semester/).reply(() => {
    return [200, {}]
  })

  mock.onGet(/survey\/all/).reply(config => {
    const match = config.url?.split('?')[1] || ''

    if (!match.length) {
      return [404]
    }

    const result = createSurveyResponse(5)

    return [200, result]
  })

  mock.onGet('survey/metadata/all').reply(() => {
    const response = createSurveyMetaResponse()
    return [200, response]
  })

  mock.onGet(/survey\/([\w-]+)/).reply(config => {
    const match = config.url?.match(/survey\/([\w-]+)/)
    const id = match?.[1]

    if (!id) return [400, { message: 'Invalid ID' }]

    const survey = surveyStore.get(id)

    if (survey) return [200, survey]

    return [404, { message: 'Survey not found' }]
  })

  mock.onPost('/survey/answer').reply(config => {
    try {
      const data: Survey.Answer = JSON.parse(config.data)

      const survey = findSurveyByQuestionId(data.question)

      if (!survey) return [400, {}]

      const question = findQuestionByIdInSurvey(survey, data.question)!

      const createAnswer = createSurveyAnswer(question)

      surveyStore.set(survey.id, {
        ...survey,
        status: SurveyStatus.Enum.IN_PROGRESS,
        questions: survey.questions.map(q =>
          q.id === data.question
            ? {
                ...q,
                answer: {
                  ...createAnswer,
                  text: data.text,
                  answerChoices: data.answerChoices
                }
              }
            : q
        )
      })

      return [200, data]
    } catch {
      return [400, { message: 'Invalid request data' }]
    }
  })

  mock.onPost('survey/answer/finished').reply(config => {
    try {
      const data: Survey.Answer = JSON.parse(config.data)

      const survey = findSurveyByQuestionId(data.question)

      if (!survey) return [400, {}]

      surveyStore.set(survey.id, {
        ...survey,
        status: SurveyStatus.Enum.FINISHED
      })

      return [200, data]
    } catch {
      return [400, { message: 'Invalid request data' }]
    }
  })

  mock.onPut(/survey\/metadata\/published\/(.+)/).reply(config => {
    const match = config.url?.match(/survey\/metadata\/published\/(.+)/)
    const id = match?.[1]

    if (!id || !surveyMetaStore.has(id)) {
      return [404, { message: 'SurveyMeta not found' }]
    }

    const surveyMeta = surveyMetaStore.get(id) as SurveyMeta.Base
    const updatedSurveyMeta = { ...surveyMeta, status: SurveyStatus.Enum.PUBLISHED }

    surveyMetaStore.set(updatedSurveyMeta.id, updatedSurveyMeta)

    return [200, updatedSurveyMeta]
  })

  mock.onPut(/survey\/metadata\/close\/(.+)/).reply(config => {
    const match = config.url?.match(/survey\/metadata\/close\/(.+)/)
    const id = match?.[1]

    if (!id || !surveyMetaStore.has(id)) {
      return [404, { message: 'SurveyMeta not found' }]
    }

    const surveyMeta = surveyMetaStore.get(id) as SurveyMeta.Base
    const updatedSurveyMeta = { ...surveyMeta, status: SurveyStatus.Enum.CLOSED }

    surveyMetaStore.set(updatedSurveyMeta.id, updatedSurveyMeta)

    return [200, updatedSurveyMeta]
  })

  mock.onGet(/survey\/metadata\/download\/(.+)/).reply(config => {
    const match = config.url?.match(/survey\/metadata\/download\/(.+)/)
    const id = match?.[1]

    if (!id || !surveyMetaStore.has(id)) {
      return [404, { message: 'SurveyMeta not found' }]
    }

    const blob = new Blob([JSON.stringify({ id, name: `SurveyMeta_${id}` })], {
      type: 'application/json'
    })

    return [200, blob]
  })

  mock.onPut(/survey\/metadata\/copy\/(.+)/).reply(config => {
    const match = config.url?.match(/survey\/metadata\/copy\/(.+)/)
    const id = match?.[1]

    if (!id || !surveyMetaStore.has(id)) {
      return [404, { message: 'SurveyMeta not found' }]
    }

    const surveyMeta = surveyMetaStore.get(id) as SurveyMeta.Base
    const copiedSurveyMeta = {
      ...surveyMeta,
      id: faker.string.uuid(),
      name: `${surveyMeta.name}_copy`,
      status: SurveyStatus.Enum.DRAFT
    }

    surveyMetaStore.set(copiedSurveyMeta.id, copiedSurveyMeta)

    return [200, copiedSurveyMeta]
  })

  mock.onDelete(/survey\/metadata\/(.+)/).reply(config => {
    const match = config.url?.match(/survey\/metadata\/(.+)/)
    const id = match?.[1]

    if (!id || !surveyMetaStore.has(id)) {
      return [404, { message: 'SurveyMeta not found' }]
    }

    surveyMetaStore.delete(id)
    return [204, {}]
  })

  mock.onGet(/survey\/metadata\/([\w-]+)/).reply(config => {
    const match = config.url?.match(/survey\/metadata\/([\w-]+)/)
    const id = match?.[1]

    if (!id) return [400, { message: 'Invalid ID' }]
    const survey = surveyMetaStore.get(id)

    if (!survey) return [404, { message: 'SurveyMeta not found' }]
    return [200, survey]
  })

  mock.onPost('survey/metadata').reply(config => {
    const dto: SurveyMetaDTO = JSON.parse(config.data)

    const newSurvey: SurveyMeta.Base = {
      id: faker.string.uuid(),
      name: dto.name,
      type: dto.type ?? SurveyType.Enum.OTHER,
      status: SurveyStatus.Enum.DRAFT,
      startDate: dto.startDate ?? new Date(),
      endDate: dto.endDate ?? new Date(),
      filters: dto.filters.map(f => ({
        id: faker.string.uuid(),
        objectId: f.objectId,
        type: f.type,
        title: f.title
      })),
      questions: dto.questions.map(q => ({
        id: faker.string.uuid(),
        title: q.title,
        type: q.type,
        choices: q.choices.map(c => ({
          id: faker.string.uuid(),
          title: c.title
        }))
      }))
    }

    surveyMetaStore.set(newSurvey.id, newSurvey)
    return [200, newSurvey]
  })

  mock.onPut('/survey/metadata').reply(config => {
    const dto: SurveyMetaDTO = JSON.parse(config.data)

    const dtoId = dto.id

    if (dtoId && !surveyMetaStore.has(dtoId)) {
      return [404, { message: 'SurveyMeta not found' }]
    }

    const existing = surveyMetaStore.get(dtoId!)!

    const updated: SurveyMeta.Base = {
      ...existing,
      name: dto.name,
      type: dto.type ?? existing.type,
      startDate: dto.startDate ?? existing.startDate,
      endDate: dto.endDate ?? existing.endDate,
      filters: dto.filters.map(f => ({
        id: faker.string.uuid(),
        objectId: f.objectId,
        type: f.type,
        title: f.title
      })),
      questions: dto.questions.map(q => ({
        id: faker.string.uuid(),
        title: q.title,
        type: q.type,
        choices: q.choices.map(c => ({
          id: faker.string.uuid(),
          title: c.title
        }))
      }))
    }

    surveyMetaStore.set(dtoId!, updated)
    return [200, updated]
  })

  mock.onAny().networkError()
}
