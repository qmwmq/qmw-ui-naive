<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { computed } from 'vue'
import type { Depth } from 'naive-ui/lib/icon/src/Icon'
import {
  Add,
  Application,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Checkmark,
  CheckmarkFilled,
  CheckmarkOutline,
  ChevronDown,
  ChevronUp,
  Close,
  CloseFilled,
  CloseOutline,
  Copy,
  Delete,
  DotMark,
  Download,
  Edit,
  Error,
  Information,
  InformationFilled,
  Layers,
  Locked,
  Logout,
  Renew,
  Search,
  Settings,
  Upload,
  User,
  WarningFilled
} from '@vicons/carbon'

const IconMap = {
  'add': Add,
  'application': Application,
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'ban': Error,
  'check': Checkmark,
  'check-filled': CheckmarkFilled,
  'check-outline': CheckmarkOutline,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'close': Close,
  'close-filled': CloseFilled,
  'close-outline': CloseOutline,
  'copy': Copy,
  'delete': Delete,
  'dot': DotMark,
  'download': Download,
  'edit': Edit,
  'info': Information,
  'info-filled': InformationFilled,
  'layers': Layers,
  'locked': Locked,
  'logout': Logout,
  'reset': Renew,
  'search': Search,
  'setup': Settings,
  'upload': Upload,
  'user': User,
  'warning-filled': WarningFilled,
}

export type Icon = keyof typeof IconMap

const props = withDefaults(defineProps<{
  icon?: Icon
  size?: number
  color?: string
  depth?: Depth
}>(), {
  size: 16,
})
const icon0 = computed(() => {
  if (!props.icon)
    return null
  return IconMap[props.icon]
})
</script>
<template>
  <n-icon v-if="icon0" :size="size" :color="color" :depth="depth">
    <component :is="icon0"></component>
  </n-icon>
</template>