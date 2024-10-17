<script setup lang="ts">
import { NDrawer, NDrawerContent } from 'naive-ui'

defineEmits([ 'update:visible' ])

withDefaults(defineProps<{
  visible: boolean
  loading: boolean
  width: number
  header?: string | number
}>(), {
  visible: false,
  loading: false,
  width: 512
})

</script>
<template>
  <n-drawer :show="visible"
            @update:show="$emit('update:visible', $event)"
            :default-width="width"
            :auto-focus="false"
            resizable
  >
    <n-drawer-content :native-scrollbar="false" closable>

      <template #header></template>

      <slot></slot>

      <template #footer></template>

    </n-drawer-content>
  </n-drawer>
</template>