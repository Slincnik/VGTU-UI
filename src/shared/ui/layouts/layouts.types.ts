export enum AppLayoutsEnum {
  DEFAULT = 'default',
  HOME = 'home'
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'DefaultLayout.vue',
  home: 'HomeLayout.vue'
}
