<script setup lang="ts">
import { NButton } from 'naive-ui'
import type { Type } from 'naive-ui/lib/button/src/interface'
import type { Icon } from './QnIcon.vue'
import QnIcon from './QnIcon.vue'

export interface ButtonProps {
  block?: boolean
  dashed?: boolean
  disabled?: boolean
  ghost?: boolean
  icon?: Icon
  iconSize?: number
  loading?: boolean
  secondary?: boolean
  text?: boolean
  type?: Type
}

const props = withDefaults(defineProps<ButtonProps>(), {
  block: false,
  dashed: false,
  disabled: false,
  ghost: false,
  icon: void 0,
  iconSize: void 0,
  loading: false,
  secondary: false,
  text: false,
  type: 'primary',
})
</script>
<template>
  <n-button v-bind="props">
    <qn-icon :icon="icon"
             :size="iconSize"
             style="margin-right: 2px"
    ></qn-icon>
    <slot></slot>
  </n-button>
</template>