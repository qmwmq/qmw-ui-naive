<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { computed } from 'vue'
import type { Depth } from 'naive-ui/lib/icon/src/Icon'
import {
  Add,
  Application,
  ArrowDown,
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

export type Icon =
    'add'
    | 'application'
    | 'arrow-down'
    | 'arrow-up'
    | 'ban'
    | 'check'
    | 'check-filled'
    | 'check-outline'
    | 'chevron-down'
    | 'chevron-up'
    | 'close'
    | 'close-filled'
    | 'close-outline'
    | 'copy'
    | 'delete'
    | 'dot'
    | 'download'
    | 'edit'
    | 'info'
    | 'info-filled'
    | 'layers'
    | 'locked'
    | 'logout'
    | 'reset'
    | 'search'
    | 'setup'
    | 'upload'
    | 'user'
    | 'warning-filled'

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
  return {
    'add': Add,
    'application': Application,
    'arrow-down': ArrowDown,
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
  }[props.icon]
})

</script>
<template>
  <n-icon v-if="icon0" :size="size" :color="color" :depth="depth">
    <component :is="icon0"></component>
  </n-icon>
</template>