<script setup lang="tsx">
import { DataTableColumn, NDataTable } from 'naive-ui'
import { computed } from 'vue'

export interface DataTableProps {
  columns?: DataTableColumn[]
  currentRow?: Function
  data?: any[]
  loading?: boolean
  pageNum?: number
  pageSize?: number
  paginationPlacement?: 'top' | 'bottom' | 'fixed-bottom'
  sortOrder?: 'ascend' | 'descend' | ''
  sortKey?: string
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
  sortOrder: '',
  sortKey: '',
  total: 0,
})

const columns0 = computed(() => {
  return props.columns.map(column => {

  })
})
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