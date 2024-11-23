<script setup lang="tsx">
import { NSelect, NTooltip, type SelectOption } from 'naive-ui'
import type { HTMLAttributes, VNode, VNodeChild } from 'vue'
import QnLoadingSelect from './QnLoadingSelect.vue'

const props = withDefaults(defineProps<{
  value?: any
  options?: any[]
  multiple?: boolean
  loading?: boolean
  disabled?: boolean
  maxTagCount?: number | 'responsive'
  placeholder?: string
  renderLabel?: (option: any, selected: boolean) => VNodeChild
  nodeProps?: (option: any) => HTMLAttributes & Record<string, unknown>
  tooltipOption?: boolean
}>(), {
  maxTagCount: 'responsive',
})

const renderOption = ({ node, option }: { node: VNode, option: SelectOption }): VNodeChild => {
  if (props.tooltipOption)
    return <NTooltip keep-alive-on-hover={ false }
                     show-arrow={ false }
                     delay={ 0 }
                     duration={ 0 }
    >
      { {
        'trigger': () => node,
        'default': () => option.name
      } }
    </NTooltip>
  return node
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
            :render-label="renderLabel"
            :render-option="renderOption"
            :fallback-option="false"
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