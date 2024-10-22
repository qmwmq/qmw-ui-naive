<script setup lang="ts">
import { NDatePicker } from 'naive-ui'
import { computed } from 'vue'

const emits = defineEmits([ 'update:value' ])

const props = withDefaults(defineProps<{
  value?: string | number
  disabled?: boolean
  placeholder?: string
}>(), {
  disabled: false,
  placeholder: '请选择日期',
})

const bindValue = computed(() => {
  if (typeof props.value === 'number')
    return { value: props.value }
  else
    return { formattedValue: props.value }
})

const updateValue = value => {
  console.log(value)
  if (typeof props.value === 'number')
    emits('update:value', new Date(value).getTime())
  else
    emits('update:value', value)
}

</script>
<template>
  <n-date-picker v-bind="bindValue"
                 type="date"
                 clearable
                 :disabled="disabled"
                 :placeholder="placeholder"
                 @update:formatted-value="updateValue"
  ></n-date-picker>
</template>