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
    <!--    <n-card closable-->
    <!--            :bordered="false"-->
    <!--            :segmented="{ content: true, footer: true, action: true }"-->
    <!--            @close="$emit('update:visible', false)"-->
    <!--    >-->

    <template #header>
      <slot name="header">{{ header }}</slot>
    </template>

    <n-spin :show="loading">
      <slot></slot>
    </n-spin>

    <template #footer>
      <slot name="footer"></slot>
    </template>

    <template #action v-if="$slots.action">
      <n-flex justify="end">
        <n-skeleton v-if="loading" width="40%" size="medium" :sharp="false"></n-skeleton>
        <slot v-else name="action"></slot>
      </n-flex>
    </template>

    <!--    </n-card>-->
  </n-modal>
</template>
