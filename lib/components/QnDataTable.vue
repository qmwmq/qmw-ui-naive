<script setup lang="tsx">
import { NDataTable } from 'naive-ui'

export interface DataTableProps {
  columns: any[]
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
  currentRow: () => false,
  data: () => [],
  loading: false,
  pageNum: 1,
  pageSize: 20,
  paginationPlacement: () => 'bottom',
  sortOrder: () => '',
  sortKey: '',
  total: 0,
})
</script>
<template>
  <n-data-table :data="data"
                :columns="columns"
  ></n-data-table>
</template>