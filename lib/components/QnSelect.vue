<script setup lang="ts">
import { NSelect } from 'naive-ui'
import type { VNodeChild } from 'vue'
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
}>(), {
  maxTagCount: 'responsive'
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
            :consistent-menu-width="false"
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