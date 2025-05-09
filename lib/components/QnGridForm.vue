<script setup lang="ts">
import { NForm, NGrid } from 'naive-ui'
import type { Size } from 'naive-ui/es/form/src/interface'

withDefaults(defineProps<{
  cols?: number
  XGap?: number
  size?: Size
}>(), {
  cols: 4,
  XGap: 16,
})
</script>
<template>
  <n-form label-placement="left" label-width="auto" :size="size">
    <n-grid :cols="cols" :x-gap="XGap">
      <slot/>
    </n-grid>
  </n-form>
</template>
