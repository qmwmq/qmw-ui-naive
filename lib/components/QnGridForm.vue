<script setup lang="ts">
import { NForm, NGrid } from 'naive-ui'

withDefaults(defineProps<{
  cols?: number,
  XGap?: number
}>(), {
  cols: 4,
  XGap: 16,
})
</script>
<template>
  <n-form label-placement="left" label-width="auto">
    <n-grid :cols="cols" :x-gap="XGap">
      <slot></slot>
    </n-grid>
  </n-form>
</template>
