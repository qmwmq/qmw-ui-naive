<script setup lang="ts">
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
  renderLabel?: () => VNodeChild
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
            clearable
            filterable
            value-field="id"
            label-field="name"
            @update:value="$emit('update:value', $event)"
  ></n-select>
</template>