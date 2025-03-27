<script setup lang="ts">
import { NInputNumber } from 'naive-ui'

withDefaults(defineProps<{
  value?: any
  disabled?: boolean
  max?: number
  min?: number
  placeholder?: string
}>(), {
  value: null
})

const emits = defineEmits([ 'update:value' ])
</script>
<template>
  <n-input-number :value="value"
                  :disabled="disabled"
                  clearable
                  :show-button="false"
                  :max="max"
                  :min="min"
                  :placeholder="placeholder"
                  @update:value="emits('update:value', $event)"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </n-input-number>
</template>