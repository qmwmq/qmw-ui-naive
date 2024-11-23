<script setup lang="ts">
import { NSelect } from 'naive-ui'
import type { HTMLAttributes, VNodeChild } from 'vue'
import QnLoadingSelect from './QnLoadingSelect.vue'

withDefaults(defineProps<{
  value?: any
  options?: any[]
  multiple?: boolean
  loading?: boolean
  disabled?: boolean
  maxTagCount?: number | 'responsive'
  placeholder?: string
  renderLabel?: (option: any, selected: boolean) => VNodeChild
  nodeProps?: (option: any) => HTMLAttributes & Record<string, unknown>
  consistentMenuWidth?: boolean
}>(), {
  maxTagCount: 'responsive',
  consistentMenuWidth: false,
})

defineEmits([ 'update:value' ])
</script>
<template>
  <qn-loading-select v-if="loading"></qn-loading-select>
  <n-select :value="value"
            :options="options"
            :multiple="multiple"
            :disabled="disabled"
            :max-tag-count="maxTagCount"
            :placeholder="placeholder"
            :render-label="renderLabel"
            :fallback-option="false"
            :consistent-menu-width="consistentMenuWidth"
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