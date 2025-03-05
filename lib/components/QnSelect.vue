<script setup lang="tsx">
import { NEllipsis, NSelect, NSpin, NText, type SelectOption } from 'naive-ui'
import { type HTMLAttributes, type VNodeChild } from 'vue'

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

const emits = defineEmits([
  'update:value',
  'update:show',
])
</script>
<template>
  <n-select :value="loading ? null : value"
            :options="loading ? [] : options"
            :multiple="multiple"
            :disabled="disabled"
            :max-tag-count="maxTagCount"
            :placeholder="placeholder"
            :render-label="renderLabel"
            :fallback-option="fallbackOption"
            :node-props="nodeProps"
            :loading="loading"
            :consistent-menu-width="false"
            clearable
            filterable
            value-field="id"
            label-field="name"
            @update:value="emits('update:value', $event)"
            @update:show="emits('update:show', $event)"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #action>
      <slot name="footer"></slot>
    </template>
    <template #empty>
      <n-spin v-if="loading">
        <template #description>
          <n-text depth="3">数据加载中</n-text>
        </template>
      </n-spin>
    </template>
  </n-select>
</template>