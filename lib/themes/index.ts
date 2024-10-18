import { computed, ref } from 'vue'
import { common, dark, light } from './bootstrap.ts'

const currentTheme = ref<'light' | 'dark'>('light')
const themeOverrides = computed(() => {
  return {
    ...common,
    ...({ dark, light }[currentTheme.value])
  }
})

export default { currentTheme, themeOverrides }
