<script setup lang="ts">
import { NInput } from 'naive-ui'

withDefaults(defineProps<{
  value?: any
  minRows?: number
  maxRows?: number
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
           @update:value="emits('update:value', $event)"
  ></n-input>
</template>