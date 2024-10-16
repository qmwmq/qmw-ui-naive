<script setup lang="ts">
import { darkTheme, dateZhCN, NConfigProvider, useOsTheme, zhCN } from 'naive-ui'
import { common, dark, light } from '../themes/bootstrap.ts'
import { computed, watch } from 'vue'
import { theme0 } from '../api/discrete-api.ts'

export interface ConfigProviderProps {
  theme: 'light' | 'dark' | 'os'
}

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: 'light'
})

// export const theme0 = ref(null)
watch(() => props.theme, e => {
  if (e === 'os')
    theme0.value = useOsTheme().value
  else
    theme0.value = e
}, { immediate: true })

// 用computed会报一个warning
// const theme0 = computed(() => {
//   if (props.theme === 'os') {
//     const theme = useOsTheme()
//     return theme.value
//   } else {
//     return props.theme
//   }
// })

const overrides = computed(() => {
  return {
    ...common,
    ...(theme0.value === 'dark' ? dark : light)
  }
})
</script>
<template>
  <n-config-provider abstract
                     :locale="zhCN"
                     :date-locale="dateZhCN"
                     :theme="theme0 === 'dark' ? darkTheme : null"
                     :theme-overrides="overrides"
  >
    <slot></slot>
  </n-config-provider>
</template>