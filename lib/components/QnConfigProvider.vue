<script setup lang="ts">
import { darkTheme, dateZhCN, NConfigProvider, useOsTheme, zhCN } from 'naive-ui'
import { common, dark, light } from '../themes/bootstrap.ts'
import { computed } from 'vue'

export interface ConfigProviderProps {
  theme: 'light' | 'dark' | 'os'
}

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: 'light'
})

const theme0 = computed(() => {
  if (props.theme === 'os') {
    const theme = useOsTheme()
    return theme.value
  } else {
    return props.theme
  }
})

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