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
  <n-descriptions :column="+column"
                  :title="title"
                  label-placement="left"
                  label-align="right"
                  bordered
                  size="small"
  >
    <template #header>
      <slot name="title">
        <n-h3 prefix="bar">{{ title }}</n-h3>
      </slot>
    </template>
    <slot></slot>
  </n-descriptions>
</template>