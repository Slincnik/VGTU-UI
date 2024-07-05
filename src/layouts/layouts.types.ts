export enum AppLayoutsEnum {
  default = 'default',
  authed = 'authed'
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'AppLayoutDefault.vue',
  authed: 'AppLayoutAuthed.vue'
}
