import { h } from 'vue'
import type { IconProps, IconSet } from 'vuetify'

const icons = import.meta.glob('@/assets/svg/*.svg', {
  eager: true,
  import: 'default'
})

function getIconNameFromPath(path: string): string | undefined {
  return path.split('/').pop()?.replace('.svg', '')
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}

function generateAliases(iconModules: Record<string, any>): Record<string, any> {
  const aliases: Record<string, any> = {}

  Object.entries(iconModules).forEach(([path, icon]) => {
    const iconName = getIconNameFromPath(path)
    if (iconName) {
      aliases[toCamelCase(iconName)] = icon
    }
  })

  return aliases
}
const aliases = generateAliases(icons)

const custom: IconSet = {
  // @ts-ignore
  component: (props: IconProps) => h(aliases[props.icon])
}

export { custom }
