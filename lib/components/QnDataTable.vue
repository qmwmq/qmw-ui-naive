<script setup lang="tsx">
import {
  type DataTableColumn,
  NCheckbox,
  NDataTable,
  NDropdown,
  NFlex,
  NIcon,
  NLayoutFooter,
  NPagination,
  useThemeVars
} from 'naive-ui'
import QnIcon from './QnIcon.vue'
import { Checkbox, CheckboxCheckedFilled } from '@vicons/carbon'
import { computed } from 'vue'

const themeVars = useThemeVars()

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

const paginationProps = computed(() => {
  if (props.paginationPlacement === 'fixed-bottom') {
    return {
      position: 'absolute',
      style: { padding: '8px 16px', zIndex: 1 },
      bordered: true,
    }
  } else {
    return {
      style: { paddingTop: '8px', backgroundColor: themeVars.value.bodyColor },
    }
  }
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
    if (children) { // 有children则继续渲染children，当前级别的表头不需要继续渲染，因为有些属性不需要生效
      e.children = mapColumns(children)
    } else if (type === 'selection') { // 是勾选列则单独渲染，同样有些属性不需要生效
      width = 50
      align = 'center'
      const titleOptions = [
        {
          key: 1,
          label: () => <NFlex align="center" size={ 2 }>
            <NIcon size={ 18 }><CheckboxCheckedFilled></CheckboxCheckedFilled></NIcon>
            { `全选 ${ props.total } 条数据` }
          </NFlex>,
        },
        {
          key: 2,
          label: () => <NFlex align="center" size={ 2 }>
            <NIcon size={ 18 }><Checkbox></Checkbox></NIcon>
            { `全部取消` }
          </NFlex>,
          props: { style: { color: themeVars.value.errorColor } },
        },
      ]
      title = () => <NFlex justify="center" size={ 2 }>
        <QnIcon icon="chevron-down" style="visibility: hidden"></QnIcon>
        <NCheckbox indeterminate></NCheckbox>
        <NDropdown options={ titleOptions }>
          <QnIcon icon="chevron-down"></QnIcon>
        </NDropdown>
      </NFlex>
      const render = () => <NCheckbox></NCheckbox>
      e = { ...e, width, title, align, titleAlign, render }
    } else { // 普通的表头，传递所有属性
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
  <n-layout-footer v-bind="paginationProps" position="absolute">
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