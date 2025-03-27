<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import QnIcon from './QnIcon.vue'

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
                  :max="max"
                  :min="min"
                  :placeholder="placeholder"
                  @update:value="emits('update:value', $event)"
  >
    <template #minus-icon>
      <qn-icon icon="subtract-alt" :size="18"/>
    </template>
    <template #add-icon>
      <qn-icon icon="add-alt" :size="18"/>
    </template>
  </n-input-number>
</template>