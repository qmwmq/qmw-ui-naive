<script setup lang="ts">
import type { TreeOption } from 'naive-ui'
import { NTree } from 'naive-ui'
import type { TreeRenderProps } from 'naive-ui/lib/tree/src/interface'
import type { VNodeChild } from 'vue'

const props = withDefaults(defineProps<{
  data: TreeOption[]
  keyField?: string
  labelField?: string
  defaultExpandAll?: boolean
  checkable?: boolean
  checkStrategy?: 'all' | 'parent' | 'child'
  renderPrefix?: ({ option, checked, selected }: TreeRenderProps) => VNodeChild
  renderSuffix?: ({ option, checked, selected }: TreeRenderProps) => VNodeChild
  checkedKeys?: Array<string | number>
}>(), {
  data: () => [],
  keyField: 'id',
  labelField: 'name',
  defaultExpandAll: true,
  checkable: false,
  checkStrategy: 'all',
})

const emits = defineEmits([ 'update:checked-keys' ])
</script>
<template>
  <n-tree :data="data"
          :key-field="keyField"
          :label-field="labelField"
          :default-expand-all="defaultExpandAll"
          :show-line="true"
          :block-line="true"
          :selectable="false"
          :checkable="checkable"
          :check-strategy="checkStrategy"
          :cascade="true"
          :render-prefix="renderPrefix"
          :render-suffix="renderSuffix"
          :checked-keys="checkedKeys"
          @update:checked-keys="emits('update:checked-keys', $event)"
  />
</template>