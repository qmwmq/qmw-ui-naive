<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { computed } from 'vue'
import type { Depth } from 'naive-ui/lib/icon/src/Icon'
import {
  Add,
  AddAlt,
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
  CloudUpload,
  Copy,
  Delete,
  DotMark,
  Download,
  Edit,
  Error,
  Information,
  InformationFilled,
  Layers,
  Link,
  Location,
  Locked,
  Logout,
  Renew,
  Rotate360,
  Search,
  Settings,
  Subtract,
  SubtractAlt,
  Time,
  Upload,
  User,
  WarningFilled,
} from '@vicons/carbon'

const IconMap = {
  'add': Add,
  'add-alt': AddAlt,
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
  'link': Link,
  'location': Location,
  'locked': Locked,
  'logout': Logout,
  'refresh': Renew,
  'reset': Rotate360,
  'search': Search,
  'setup': Settings,
  'subtract': Subtract,
  'subtract-alt': SubtractAlt,
  'time': Time,
  'upload': Upload,
  'upload-cloud': CloudUpload,
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