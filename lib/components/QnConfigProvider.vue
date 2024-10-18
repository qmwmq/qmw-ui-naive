<script setup lang="ts">
import { darkTheme, dateZhCN, NConfigProvider, useOsTheme, zhCN } from 'naive-ui'
import { watch } from 'vue'
import theme from '../themes'

export interface ConfigProviderProps {
  theme: 'light' | 'dark' | 'os'
}

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: 'light'
})

// 用computed会报warning，这里用watch
watch(() => props.theme, e => {
  if (e === 'os')
    theme.currentTheme.value = <'dark' | 'light'>useOsTheme().value
  else
    theme.currentTheme.value = e
}, { immediate: true })

</script>
<template>
  <n-config-provider abstract
                     :locale="zhCN"
                     :date-locale="dateZhCN"
                     :theme="{ dark: darkTheme }[theme.currentTheme.value]"
                     :theme-overrides="theme.themeOverrides.value"
  >
    <slot></slot>
  </n-config-provider>
</template>