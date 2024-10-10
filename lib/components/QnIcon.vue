<script setup lang="ts">
import { NIcon } from 'naive-ui'
import type { Depth } from 'naive-ui/lib/icon/src/Icon'
import {
  Add,
  Application,
  ArrowDown,
  ArrowUp,
  Checkmark,
  CheckmarkFilled,
  CheckmarkOutline,
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
  Layers,
  Locked,
  Logout,
  Renew,
  Search,
  Settings,
  Upload,
  User,
} from '@vicons/carbon'
import { computed } from 'vue'

export type Icon =
    'add'
    | 'application'
    | 'ban'
    | 'check'
    | 'check-filled'
    | 'check-outline'
    | 'close'
    | 'close-filled'
    | 'close-outline'
    | 'copy'
    | 'delete'
    | 'dot'
    | 'down'
    | 'download'
    | 'edit'
    | 'info'
    | 'layers'
    | 'locked'
    | 'logout'
    | 'reset'
    | 'search'
    | 'setup'
    | 'up'
    | 'upload'
    | 'user'

export interface IconProps {
  icon?: Icon
  size?: number
  depth?: Depth
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 16,
})

const icon0 = computed(() => {
  if (!props.icon)
    return null
  return {
    'add': Add,
    'application': Application,
    'ban': Error,
    'check': Checkmark,
    'check-filled': CheckmarkFilled,
    'check-outline': CheckmarkOutline,
    'close': Close,
    'close-filled': CloseFilled,
    'close-outline': CloseOutline,
    'copy': Copy,
    'delete': Delete,
    'dot': DotMark,
    'down': ArrowDown,
    'download': Download,
    'edit': Edit,
    'info': Information,
    'layers': Layers,
    'locked': Locked,
    'logout': Logout,
    'reset': Renew,
    'search': Search,
    'setup': Settings,
    'up': ArrowUp,
    'upload': Upload,
    'user': User,
  }[props.icon]
})

</script>
<template>
  <n-icon v-if="icon0" :size="size" :depth="depth">
    <component :is="icon0"></component>
  </n-icon>
</template>