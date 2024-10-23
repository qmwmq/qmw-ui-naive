<script setup lang="ts">
import { NInputGroup } from 'naive-ui'
import QnDatePicker from './QnDatePicker.vue'
import QnIcon from './QnIcon.vue'

const emits = defineEmits([ 'update:min-value', 'update:max-value' ])

withDefaults(defineProps<{
  minValue?: string | number
  maxValue?: string | number
  placeholder?: string[]
  useTimestamp?: boolean
  disabled?: boolean
}>(), {
  placeholder: () => [ '开始日期', '结束日期' ],
  useTimestamp: false,
  disabled: false,
})

const updateValue = ({ minValue, maxValue }: { minValue: any, maxValue: any }) => {
  if (
      minValue != null && maxValue != null
      &&
      new Date(minValue).getTime() > new Date(maxValue).getTime()
  ) {
    emits('update:min-value', maxValue)
    emits('update:max-value', minValue)
  } else {
    emits('update:min-value', minValue)
    emits('update:max-value', maxValue)
  }
}

const yearStart = () => new Date(new Date().getFullYear(), 0, 1).getTime()
const yearEnd = () => new Date(new Date().getFullYear() + 1, 0, 0).getTime()
const monthStart = () => new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()
const monthEnd = () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime()
</script>
<template>
  <n-input-group>
    <qn-date-picker :value="minValue"
                    :placeholder="placeholder[0]"
                    :use-timestamp="useTimestamp"
                    :disabled="disabled"
                    :shortcuts="{ '年初': yearStart, '月初': monthStart }"
                    @update:value="updateValue({ minValue: $event, maxValue })"
                    style="width: 50%"
    >
      <template #date-icon>
        <qn-icon icon="arrow-right"></qn-icon>
      </template>
    </qn-date-picker>
    <qn-date-picker :value="maxValue"
                    :placeholder="placeholder[1]"
                    :use-timestamp="useTimestamp"
                    :disabled="disabled"
                    :shortcuts="{ '年末': yearEnd, '月末': monthEnd }"
                    @update:value="updateValue({ minValue, maxValue: $event })"
                    style="width: 50%"
    ></qn-date-picker>
  </n-input-group>
</template>
