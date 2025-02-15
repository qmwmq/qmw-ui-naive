<script setup lang="ts">
import type { TreeOption } from 'naive-ui'
import type { TreeRenderProps } from 'naive-ui/lib/tree/src/interface'
import type { VNodeChild } from 'vue'

const props = withDefaults(defineProps<{
  data: TreeOption[]
  keyField?: string
  labelField?: string
  defaultExpandAll?: boolean
  renderPrefix?: ({ option, checked, selected }: TreeRenderProps) => VNodeChild
  renderSuffix?: ({ option, checked, selected }: TreeRenderProps) => VNodeChild
}>(), {
  data: () => [],
  keyField: 'id',
  labelField: 'name',
  defaultExpandAll: true
})
</script>
<template>
  <n-tree :data="data"
          :key-field="keyField"
          :label-field="labelField"
          :default-expand-all="defaultExpandAll"
          :show-line="true"
          :block-line="true"
          :selectable="false"
          :render-prefix="renderPrefix"
          :render-suffix="renderSuffix"
  ></n-tree>
</template>