<script setup lang="tsx">
import {
  type DropdownOption,
  type EllipsisProps,
  NCheckbox,
  NDataTable,
  NDropdown,
  NFlex,
  NIcon,
  NLayoutFooter,
  NPagination,
  NSpin,
  NText,
  useThemeVars
} from 'naive-ui'
import QnIcon from './QnIcon.vue'
import { Checkbox } from '@vicons/carbon'
import { computed, nextTick, onMounted, ref, useTemplateRef, type VNodeChild, watch } from 'vue'
import { NumberUtils } from 'qmwts'

export interface DataTableColumn {
  key?: string | number
  title?: string | (() => VNodeChild)
  align?: 'left' | 'right' | 'center'
  titleAlign?: 'left' | 'right' | 'center'
  fixed?: 'left' | 'right'
  width?: number
  render?: (row: any, index: number) => VNodeChild
  sorter?: boolean
  sortOrder?: 'ascend' | 'descend' | false
  type?: 'selection'
  disabled?: (row: any) => boolean
  children?: DataTableColumn[]
  resizable?: boolean
  cellProps?: Function
  ellipsis?: boolean | EllipsisProps
}

const emits = defineEmits([
  'update:page-no',
  'update:page-size',
  'update:page',
  'update:sort-order',
  'update:sort-key',
  'update:sort',
  'update:selections',
  'select-all',
  'unselect-all',
])

const themeVars = useThemeVars()
const footerRef = useTemplateRef('footer')
const footerHeight = ref(0)

onMounted(() => {
  nextTick(() => {
    footerHeight.value = footerRef.value?.$el.clientHeight + 8
  })
})

export interface DataTableProps {
  activeRow?: (row: any) => boolean
  columns?: DataTableColumn[]
  data?: any[]
  loading?: boolean
  pageNo?: number
  pageSize?: number
  paginationPlacement?: 'top' | 'bottom' | 'fixed-bottom' | 'none'
  selections?: any[]
  selectionOptions?: DropdownOption[]
  sortOrder?: 'ascend' | 'descend' | false
  sortKey?: string | null
  summary?: () => object
  rowKey?: Function
  total?: number
}

const props = withDefaults(defineProps<DataTableProps>(), {
  activeRow: () => false,
  columns: () => [],
  data: () => [],
  loading: false,
  pageNo: 1,
  pageSize: 20,
  paginationPlacement: 'bottom',
  selections: () => [],
  selectionOptions: () => [],
  sortOrder: false,
  sortKey: null,
  rowKey: (row: any) => row.id,
  total: 0,
})

const paginationProps = computed(() => {
  if (props.paginationPlacement === 'fixed-bottom') {
    return {
      position: 'absolute' as ('absolute' | 'static' | undefined),
      style: { padding: '8px 16px', zIndex: 10 },
      bordered: true,
    }
  } else if (props.paginationPlacement === 'none') {
    return {
      style: { display: 'none' }
    }
  } else {
    return {
      style: { paddingTop: '8px', backgroundColor: 'rgba(0, 0, 0, 0)' },
    }
  }
})

// 勾选的check方法
const onChecked = (checked: boolean, rows: any[]) => {
  const o: any[] = []
  const length1 = rows.length
  const { selections } = props
  const length2 = selections.length
  const excludeRowKeys = []
  for (let i = 0; i < length1; i++) {
    const row = rows[i]
    excludeRowKeys.push(props.rowKey(row))
    if (checked) // 如果是勾选则先预添加进去，如果是反选则不添加
      o.push(row)
  }
  for (let j = 0; j < length2; j++) {
    const selection = selections[j]
    const selectionKey = props.rowKey(selection)
    if (!excludeRowKeys.includes(selectionKey)) // 如果是勾选则已经添加过了无需添加，如果是反选则不必添加
      o.push(selection)
  }
  emits('update:selections', o)
}

const columns0 = computed(() => mapColumns(props.columns))
const mapColumns = (columns: DataTableColumn[]) => {
  return columns.map(({
                        key,
                        title = '',
                        width = 100,
                        align = 'left',
                        fixed,
                        titleAlign = 'center',
                        render,
                        sorter = false,
                        sortOrder = false,
                        type,
                        disabled = () => false,
                        resizable = true,
                        ellipsis = false,
                        children,
                      }: DataTableColumn): any => {
    let column: DataTableColumn = { key, title, titleAlign, fixed, resizable, ellipsis }
    if (children) { // 有children则继续渲染children，当前级别的表头不需要继续渲染，因为有些属性不需要生效
      column.children = mapColumns(children)
      column.width = NumberUtils.summation(column.children.map((e: any) => e.width)) // 因为需要计算scrollX，所以需要将children的width读取出来
    } else if (type === 'selection') { // 是勾选列则单独渲染，同样有些属性不需要生效
      width = 50
      align = 'center'
      title = () => {
        // 是否全选的判断
        const { selections } = props
        let checked = true // 这里预设为true，循环里好判断
        if (selections.length > 0) {
          const { data } = props
          const length1 = data.length
          const length2 = selections.length
          loop:
              for (let i = 0; i < length1; i++) {
                const d = data[i]
                const rowKey1 = props.rowKey(d)
                for (let j = 0; j < length2; j++) {
                  const s = selections[j]
                  const rowKey2 = props.rowKey(s)
                  if (rowKey1 === rowKey2) // 包含这个元素，进行下一个元素的判断，保持checked=true
                    continue loop
                }
                checked = false // 能执行到这里说明不包含这个元素，则全选为checked=false
                break
              }
        } else {
          checked = false // 没有数据则checked=false
        }

        const indeterminate = !checked && selections.length > 0

        // 勾选列的下拉菜单
        const titleOptions = [
          ...props.selectionOptions,
          {
            label: () => <NFlex align="center" size={ 2 }>
              <NIcon size={ 18 }><Checkbox></Checkbox></NIcon>
              全部取消
            </NFlex>,
            props: {
              action: () => {
                emits('update:selections', [])
                emits('unselect-all')
              },
              style: { color: themeVars.value.errorColor }
            },
          },
        ]
        return <NFlex justify="center" size={ 2 } wrap={ false }>
          <QnIcon icon="chevron-down" style="visibility: hidden"/>
          <NCheckbox checked={ checked }
                     indeterminate={ indeterminate }
                     on-update:checked={ (checked: boolean) => {
                       onChecked(checked, props.data.filter(e => !disabled(e)))
                       emits('select-all', checked)
                     } }
          />
          <NDropdown options={ titleOptions }
                     on-select={ (_: any, o: DropdownOption) => {
                       const action = (o.props as any)?.action
                       if (typeof action === 'function')
                         action()
                     } }
          >
            <QnIcon icon="chevron-down"/>
          </NDropdown>
        </NFlex>
      }
      const { selections } = props
      const length = selections.length

      render = (row: any) => {
        let rowChecked = false
        const rowKey = props.rowKey(row)
        for (let i = 0; i < length; i++) {
          const selection = selections[i]
          const selectionKey = props.rowKey(selection)
          if (rowKey === selectionKey) {
            rowChecked = true
            break
          }
        }
        return <NCheckbox checked={ rowChecked }
                          on-update:checked={ (e: boolean) => onChecked(e, [ row ].filter(e => !disabled(e))) }
                          disabled={ disabled(row) }
        />
      }
      column = { ...column, width, title, align, titleAlign, render }
    } else { // 普通的表头，传递所有属性
      if (props.sortKey === key)
        sortOrder = props.sortOrder
      column = { ...column, width, align, sorter, sortOrder, type, render }
    }
    column.cellProps = (row: any) => {
      const style = {} as any
      if (props.activeRow(row)) // 高亮row
        style.backgroundColor = themeVars.value.tagColor
      else if (props.sortKey === key) // 排序row
        style.backgroundColor = themeVars.value.tableHeaderColor
      return { style }
    }
    return column
  })
}

const scrollX = NumberUtils.summation(columns0.value.map(e => e.width))

const updateSorter = ({ columnKey: sortKey, order: sortOrder }: {
  columnKey: any,
  order: 'ascend' | 'descend' | false
}) => {
  emits('update:sort-order', sortOrder === false ? null : sortOrder) // false转换为null方便后台判断
  emits('update:sort-key', sortOrder === false ? null : sortKey) // false转换为null方便后台判断
  emits('update:sort')
}

// 监听最大页数是否超出，超出则返回第一页
watch(() => {
  const { pageNo = 1, pageSize = 20, total = 0 } = props
  return pageNo > Math.ceil(total / pageSize)
}, overflow => {
  if (overflow) {
    emits('update:page-no', 1)
    emits('update:page')
  }
})

const summary0 = () => {
  const o: any = {}
  if (!props.summary)
    return o
  Object.entries(props.summary() || {}).forEach(([ key, value ]) => {
    if (typeof value === 'function')
      o[key] = { value: value() }
    else
      o[key] = {
        value: (() => <div style={
          { color: themeVars.value.errorColor }
        }>{ value }</div>)()
      }
  })
  return o
}
</script>
<template>
  <n-data-table :data="data"
                :columns="columns0"
                :loading="loading"
                :single-column="false"
                :single-line="false"
                size="small"
                remote
                :scroll-x="scrollX"
                :summary="summary ? summary0 : void 0"
                summary-placement="top"
                @update:sorter="updateSorter"
  >
    <template #loading>
      <n-spin>
        <template #description>
          <n-text depth="3">数据加载中</n-text>
        </template>
      </n-spin>
    </template>
  </n-data-table>
  <n-layout-footer v-bind="paginationProps" ref="footer">
    <n-pagination :page="pageNo || 1"
                  :page-size="pageSize || 20"
                  :item-count="total"
                  :disabled="loading"
                  show-size-picker
                  show-quick-jumper
                  :page-sizes="[ 20, 50, 100 ]"
                  :display-order="[ 'size-picker', 'quick-jumper', 'pages' ]"
                  @update:page="emits('update:page-no', $event); emits('update:page')"
                  @update:page-size="emits('update:page-size', $event); emits('update:page')"
    >
      <template #prefix>
        <template v-if="!loading">共 {{ total }} 条数据</template>
        <template v-if="selections?.length > 0">&nbsp;&nbsp;已选 {{ selections.length }}</template>
      </template>
    </n-pagination>
  </n-layout-footer>

  <div v-if="props.paginationPlacement === 'fixed-bottom'" :style="{ height: `${ footerHeight }px` }"/>

</template>
<style scoped>
:deep(.n-pagination-prefix) {
  margin-right: auto;
}
</style>