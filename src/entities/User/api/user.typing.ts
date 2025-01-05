export namespace IUser {
  export type Base = {
    id: string
    user: User
    gradeBooks: GradeBook[]
  }

  export type User = {
    id: string
    externalId: string
    isDummy: boolean
    lastModifyDate: Date
    firstName: string
    lastName: string
    middleName: string
    username: string
    email: string
  }
  export type Education = {
    group?: string
    course?: string
    faculty?: string
    gradeBook?: string
    trainingBasis?: string
    educationLevel?: string
    educationStatus?: string
    educationForm?: string
    educationProfile?: string
    educationDirection?: string
    dateStart: Date
  }

  export type GradeBook = {
    id: string
    gradeBook: string
  }
}
