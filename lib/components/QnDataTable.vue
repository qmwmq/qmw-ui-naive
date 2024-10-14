<script setup lang="tsx">
import { type DataTableColumn, NCheckbox, NDataTable, NFlex, NLayoutFooter, NPagination, NDropdown } from 'naive-ui'

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
  rowKey?: Function
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
  rowKey: row => row.id,
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
    let e = { title, titleAlign }
    if (children) {
      e.children = mapColumns(children)
    } else if (type === 'selection') {
      width = 50
      align = 'center'
      title = () => <NCheckbox></NCheckbox>
      const render = () => <NCheckbox></NCheckbox>
      e = { ...e, width, title, align, titleAlign, render }
    } else {
      if (props.sortKey === key)
        sortOrder = props.sortOrder
      e = { ...e, key, width, align, sorter, sortOrder, type }
    }
    return e
  })
}

// const scrollX = NumberUtils.summation(mapColumns(props.columns).map(e => e.width))

const updateSorter = ({ columnKey: sortKey, order: sortOrder }) => {
  emits('update:sort-order', sortOrder === false ? null : sortOrder) // false转换为null方便后台判断
  emits('update:sort-key', sortOrder === false ? null : sortKey) // false转换为null方便后台判断
  emits('update:sort')
}

const emits = defineEmits([
  'update:sort-order',
  'update:sort-key',
  'update:sort',
])
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
                @update:sorter="updateSorter"
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