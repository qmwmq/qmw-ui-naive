<script setup lang="ts">
import { NProgress } from 'naive-ui'
import type { ProgressStatus } from 'naive-ui/es/progress/src/public-types'

withDefaults(defineProps<{
  percentage?: number
  height?: number
  status?: ProgressStatus
}>(), {
  percentage: 0,
  height: 16,
})

defineSlots<{
  default(props: { percentage: number }): any
}>()
</script>
<template>
  <n-progress :percentage="percentage"
              :height="height"
              indicator-placement="inside"
              :fill-border-radius="0"
              :border-radius="4"
              :status="status"
  >
    <slot :percentage="percentage">{{ percentage.toFixed(2) + '%' }}</slot>
  </n-progress>
</template>