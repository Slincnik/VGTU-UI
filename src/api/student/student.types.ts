export namespace Student {
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
}
