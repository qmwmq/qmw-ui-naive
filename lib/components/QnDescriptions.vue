<script setup lang="ts">
import { NDescriptions, NH3 } from 'naive-ui'

withDefaults(defineProps<{
  column?: string | number
  title?: string
}>(), {
  column: 3
})
</script>
<template>
  <slot name="title">
    <n-h3 prefix="bar" v-if="title">{{ title }}</n-h3>
  </slot>
  <n-descriptions :column="+column"
                  label-placement="left"
                  label-align="right"
                  bordered
                  size="small"
  >
    <slot/>
  </n-descriptions>
</template>
<style scoped>
:deep(.n-descriptions-table-header) {
  white-space: nowrap;
}
</style>