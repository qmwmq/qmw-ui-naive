<script setup lang="tsx">
import { type DataTableColumn, NDataTable, NLayoutFooter, NPagination } from 'naive-ui'

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

const mapColumns = (columns: any[]) => {
  return columns.map(({
                        key,
                        title,
                        width = 100,
                        align,
                        titleAlign = 'center',
                        sorter = false,
                        sortOrder = null,
                        type = void 0,
                        disabled = () => false,
                        children = void 0,
                      }): any => {
    const e = { key, title, width, align, titleAlign, sortOrder, sorter }
    if (children) {
      e.children = mapColumns(children)
    } else {
      // 自定义排序样式
      if (props.sortKey === key)
        sortOrder = props.sortOrder
      // 自定义勾选样式

      // 自定义
    }
    return e
  })
}

// const scrollX = NumberUtils.summation(mapColumns(props.columns).map(e => e.width))

</script>
<template>
  <pre>
  {{ JSON.stringify(mapColumns(columns), null, 4) }}
  </pre>
  <n-data-table :data="data"
                :columns="mapColumns(columns)"
                :loading="loading"
                :single-column="false"
                :single-line="false"
                size="small"
                remote
  ></n-data-table>
  <n-layout-footer>
    <n-pagination :page="pageNum"
                  :page-size="pageSize"
                  :item-count="total"
                  :disabled="loading"
                  show-size-picker
                  show-quick-jumper
                  :page-sizes="[ 20, 50, 100 ]"
                  :display-order="[ 'size-picker', 'quick-jumper', 'pages' ]"
    >
      <template #prefix>
        <template v-if="loading">加载中...</template>
        <template v-else>共{{ total }}条数据</template>
      </template>
    </n-pagination>
  </n-layout-footer>
</template>