<script setup lang="ts">
import { NInput } from 'naive-ui'
import { NumberUtils } from 'qmwts'

withDefaults(defineProps<{
  value?: any
  minRows?: number
  maxRows?: number
  maxlength?: number | string
}>(), {
  minRows: 2
})
const emits = defineEmits([ 'update:value' ])
</script>
<template>
  <n-input :value="value"
           type="textarea"
           clearable
           :autosize="{ minRows, maxRows }"
           :maxlength="maxlength"
           :show-count="NumberUtils.isNumber(maxlength)"
           @update:value="emits('update:value', $event)"
  ></n-input>
</template>