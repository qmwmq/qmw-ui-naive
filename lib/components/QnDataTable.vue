<script setup lang="tsx">
import { type DataTableColumn, NDataTable } from 'naive-ui'
import { computed } from 'vue'

export interface DataTableProps {
  columns?: DataTableColumn[]
  currentRow?: Function
  data?: any[]
  loading?: boolean
  pageNum?: number
  pageSize?: number
  paginationPlacement?: 'top' | 'bottom' | 'fixed-bottom'
  sortOrder?: 'ascend' | 'descend' | null
  sortKey?: string | null
  total?: number
}

const props = withDefaults(defineProps<DataTableProps>(), {
  columns: () => [],
  currentRow: () => false,
  data: () => [],
  loading: false,
  pageNum: 1,
  pageSize: 20,
  paginationPlacement: 'bottom',
  sortOrder: null,
  sortKey: null,
  total: 0,
})

const columns0 = computed(() => {
  return props.columns.map(column => {

  })
})
const mapColumns = (columns: any[]) => {
  return columns.map(({
                        key,
                        title,
                        width = 100,
                        align,
                        titleAlign = 'center',
                        sortOrder = false,
                        sortKey,
                        type = void 0,
                        disabled = () => false,
                        children = void 0
                      }): any => {
    if (children) {
      children = mapColumns(children)
    } else {
      // 自定义排序样式
      if (props.sortKey === key)
        sortOrder = props.sortOrder
      // 自定义勾选样式

      // 自定义
    }
    return { titleAlign, sortOrder, children }
  })
}

const scrollX = 0

</script>
<template>
  <n-data-table :data="data"
                :columns="columns"
                :loading="loading"
                :single-column="false"
                :single-line="false"
                size="small"
                remote
                :scroll-x="scrollX"
  ></n-data-table>
</template>