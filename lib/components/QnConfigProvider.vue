<script setup lang="ts">
import { darkTheme, dateZhCN, NConfigProvider, useOsTheme, zhCN } from 'naive-ui'
import { common, dark, light } from '../themes/bootstrap.ts'
import { computed, watch } from 'vue'
import { default as theme0 } from '../themes'

export interface ConfigProviderProps {
  theme: 'light' | 'dark' | 'os'
}

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: 'light'
})

// 用computed会报warning，这里用watch
watch(() => props.theme, e => {
  if (e === 'os')
    theme0.currentTheme.value = <'dark' | 'light'>useOsTheme().value
  else
    theme0.currentTheme.value = e
}, { immediate: true })

const overrides = computed(() => {
  return {
    ...common,
    ...({ dark, light }[theme0.currentTheme.value])
  }
})
</script>
<template>
  <n-config-provider abstract
                     :locale="zhCN"
                     :date-locale="dateZhCN"
                     :theme="{ dark: darkTheme }[theme0.currentTheme.value]"
                     :theme-overrides="overrides"
  >
    <slot></slot>
  </n-config-provider>
</template>