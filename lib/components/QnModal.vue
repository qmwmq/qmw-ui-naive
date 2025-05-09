<script setup lang="ts">
import { NFlex, NModal, NSkeleton, NSpin } from 'naive-ui'

defineEmits([ 'update:visible' ])

withDefaults(defineProps<{
  visible: boolean
  loading?: boolean
  width?: number
  header?: string | number
}>(), {
  visible: false,
  loading: false,
  width: 512
})

</script>
<template>
  <n-modal :show="visible"
           :style="{ width: `${ width }px` }"
           preset="card"
           draggable
           :segmented="{ content: true, footer: true, action: true }"
           @update:show="$emit('update:visible', $event)"
  >

    <template #header>
      <slot name="header">{{ header }}</slot>
    </template>

    <n-spin :show="loading">
      <slot/>
    </n-spin>

    <template #footer>
      <slot name="footer"/>
    </template>

    <template #action v-if="$slots.action">
      <n-flex justify="end">
        <n-skeleton v-if="loading" width="40%" size="medium" :sharp="false"/>
        <slot v-else name="action"/>
      </n-flex>
    </template>

  </n-modal>
</template>
