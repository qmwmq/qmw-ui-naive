<script setup lang="ts">
import { NDatePicker } from 'naive-ui'
import { computed } from 'vue'
import type { FormattedValue, Value } from 'naive-ui/lib/date-picker/src/interface'

const emits = defineEmits([ 'update:value' ])

const props = withDefaults(defineProps<{
  value?: string | number
  disabled?: boolean
  placeholder?: string
  useTimestamp?: boolean
  shortcuts?: any
}>(), {
  disabled: false,
  useTimestamp: false,
})

const bindValue = computed((): {
  value?: Value | null,
  formattedValue: FormattedValue | null
} => {
  if (props.useTimestamp)
    return { value: props.value as number, formattedValue: null }
  else
    return { formattedValue: props.value as string, value: null }
})

const updateValue = (value: any) => {
  if (props.useTimestamp)
    emits('update:value', value == null ? value : new Date(value).getTime())
  else
    emits('update:value', value)
}
</script>
<template>
  <n-date-picker v-bind="bindValue"
                 type="date"
                 input-readonly
                 :actions="[ 'clear', 'now' ]"
                 :disabled="disabled"
                 :placeholder="placeholder"
                 :shortcuts="shortcuts"
                 @update:formatted-value="updateValue"
  >
    <template #date-icon>
      <slot name="date-icon"></slot>
    </template>
  </n-date-picker>
</template>