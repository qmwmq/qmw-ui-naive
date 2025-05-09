<script setup lang="ts">
import { NDrawer, NDrawerContent, NFlex, NSkeleton, NSpin } from 'naive-ui'

defineEmits([ 'update:visible' ])

withDefaults(defineProps<{
  visible: boolean
  loading?: boolean
  width?: string | number
  header?: string | number
}>(), {
  visible: false,
  loading: false,
  width: 512
})

</script>
<template>
  <n-drawer :show="visible"
            :default-width="width"
            :auto-focus="false"
            resizable
            @update:show="$emit('update:visible', $event)"
  >
    <n-drawer-content :native-scrollbar="false" closable>

      <template #header>
        <slot name="header">{{ header }}</slot>
      </template>

      <n-spin :show="loading">
        <slot/>
      </n-spin>

      <template #footer v-if="$slots.footer">
        <n-flex justify="end">
          <n-skeleton v-if="loading" width="40%" size="medium" :sharp="false"/>
          <slot v-else name="footer"/>
        </n-flex>
      </template>

    </n-drawer-content>
  </n-drawer>
</template>