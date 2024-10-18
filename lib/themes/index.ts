import { ref } from 'vue'

export default {
  currentTheme: ref<'light' | 'dark'>('light')
}
// const currentTheme = ref<'light' | 'dark'>('light')
// export default { currentTheme }