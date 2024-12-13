<script setup lang="ts">
import { NInput } from 'naive-ui'
import { NumberUtils } from 'qmwts'

withDefaults(defineProps<{
  value?: any
  maxlength?: number | string
}>(), {})
const emits = defineEmits([ 'update:value' ])
</script>
<template>
  <n-input :value="value"
           clearable
           :maxlength="maxlength"
           :show-count="NumberUtils.isNumber(maxlength)"
           @update:value="emits('update:value', $event)"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </n-input>
</template>