<script setup lang="tsx">
import { NEllipsis, NSelect, type SelectOption } from 'naive-ui'
import { type HTMLAttributes, type VNodeChild } from 'vue'
import QnLoadingSelect from './QnLoadingSelect.vue'

withDefaults(defineProps<{
  value?: any
  options?: any[]
  multiple?: boolean
  loading?: boolean
  disabled?: boolean
  maxTagCount?: number | 'responsive'
  placeholder?: string
  renderLabel?: (option?: any, selected?: boolean) => VNodeChild
  nodeProps?: (option: any) => HTMLAttributes & Record<string, unknown>
  fallbackOption?: false | ((value: string | number) => SelectOption)
}>(), {
  maxTagCount: 'responsive',
  fallbackOption: false,
})

const renderEllipsisLabel = (option: SelectOption): VNodeChild => {
  const tooltip = {
    keepAliveOnHover: false,
    showArrow: false,
    delay: 0,
    duration: 0,
  }
  return <NEllipsis tooltip={ tooltip }>{ option.name }</NEllipsis>
}

defineEmits([ 'update:value' ])
</script>
<template>
  <qn-loading-select v-if="loading"></qn-loading-select>
  <n-select v-else
            :value="value"
            :options="options"
            :multiple="multiple"
            :disabled="disabled"
            :max-tag-count="maxTagCount"
            :placeholder="placeholder"
            :render-label="renderLabel ? renderLabel : renderEllipsisLabel"
            :fallback-option="fallbackOption"
            :node-props="nodeProps"
            clearable
            filterable
            value-field="id"
            label-field="name"
            @update:value="$emit('update:value', $event)"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #action>
      <slot name="footer"></slot>
    </template>
  </n-select>
</template>