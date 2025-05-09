<script setup lang="ts">
import { NTabs, useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
withDefaults(defineProps<{
  value?: string | number
  size?: 'small' | 'medium' | 'large'
}>(), {})

const emits = defineEmits([ 'update:value' ])
</script>
<template>
  <n-tabs type="segment"
          :value="value"
          :size="size"
          @update:value="emits('update:value', $event)"
  >
    <slot/>
  </n-tabs>
</template>
<style scoped>
:deep(.n-tabs-capsule) {
  background: v-bind('themeVars.primaryColor') !important;
}

@keyframes color-animate {
  to {
    color: white;
  }
}

:deep(.n-tabs-tab.n-tabs-tab--active .n-tabs-tab__label) {
  animation: color-animate 0.2s linear;
  animation-fill-mode: forwards;
}

:deep(.n-tabs-rail) {
  padding: 2px;
}
</style>