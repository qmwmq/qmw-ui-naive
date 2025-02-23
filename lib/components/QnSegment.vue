<script setup lang="ts">
import { NTabs, useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
</script>
<template>
  <n-tabs type="segment">
    <slot></slot>
  </n-tabs>
</template>
<style scoped>
:deep(.n-tabs-capsule) {
  background: v-bind('themeVars.primaryColor') !important;
}

@keyframes text-color {
  to {
    color: white;
  }
}

:deep(.n-tabs-tab.n-tabs-tab--active .n-tabs-tab__label) {
  animation: text-color 0.2s linear;
  animation-fill-mode: forwards;
}

:deep(.n-tabs-rail) {
  padding: 2px;
}
</style>