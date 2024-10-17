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

// 用computed会报warning，这里用watch
watch(() => props.theme, e => {
  if (e === 'os')
    theme0.value = useOsTheme().value
  else
    theme0.value = e
}, { immediate: true })

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