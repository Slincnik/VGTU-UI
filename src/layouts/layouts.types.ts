export enum AppLayoutsEnum {
  default = 'default',
  notdefault = 'notdefault'
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'AppLayoutDefault.vue',
  notdefault: 'AppLayoutNotDefault.vue'
}
