<script setup lang="tsx">
import { NCheckbox, NDataTable, NDropdown, NFlex, NIcon, NLayoutFooter, NPagination, useThemeVars } from 'naive-ui'
import QnIcon from './QnIcon.vue'
import { Checkbox, CheckboxCheckedFilled } from '@vicons/carbon'
import { computed, nextTick, onMounted, ref, type VNodeChild, watch } from 'vue'
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
}

const emits = defineEmits([
  'update:page-num',
  'update:page-size',
  'update:page',
  'update:sort-order',
  'update:sort-key',
  'update:sort',
  'update:selections',
  'check-all',
  'check-page',
  'uncheck-all',
])

const themeVars = useThemeVars()
const footerRef = ref()
const footerHeight = ref(0)

onMounted(() => {
  nextTick(() => {
    footerHeight.value = footerRef?.value.$el.clientHeight + 8
  })
})

export interface DataTableProps {
  activeRow?: (row: any) => boolean
  columns?: DataTableColumn[]
  data?: any[]
  loading?: boolean
  pageNum?: number
  pageSize?: number
  paginationPlacement?: 'top' | 'bottom' | 'fixed-bottom' | 'none'
  selections?: any[]
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
  pageNum: 1,
  pageSize: 20,
  paginationPlacement: 'bottom',
  selections: () => [],
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
  const o = [ ...props.selections ]
  rows.forEach(row => {
    const index = o.findIndex(e => props.rowKey(e) === props.rowKey(row))
    if (checked && index >= 0) // 勾选且存在，覆盖已存在的选项
      o.splice(index, 1, row)
    else if (checked && index < 0) // 勾选但不存在，末尾插入
      o.push(row)
    else if (!checked && index >= 0) // 反选且存在，删除
      o.splice(index, 1)
  })
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
                        children,
                      }: DataTableColumn): any => {
    let column: DataTableColumn = { title, titleAlign, fixed, resizable }
    if (children) { // 有children则继续渲染children，当前级别的表头不需要继续渲染，因为有些属性不需要生效
      column.children = mapColumns(children)
      column.width = NumberUtils.summation(column.children.map((e: any) => e.width)) // 因为需要计算scrollX，所以需要将children的width读取出来
    } else if (type === 'selection') { // 是勾选列则单独渲染，同样有些属性不需要生效
      width = 50
      align = 'center'
      title = () => {
        // 勾选列的下拉菜单
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
        const checked = props.selections.length > 0 &&
            props.data
                .filter(e => !disabled(e))
                .every(e => props.selections.some(o => props.rowKey(e) === props.rowKey(o)))
        const indeterminate = props.selections.length > 0 && !checked

        return <NFlex justify="center" size={ 2 } wrap={ false }>
          <QnIcon icon="chevron-down" style="visibility: hidden"></QnIcon>
          <NCheckbox checked={ checked }
                     indeterminate={ indeterminate }
                     onUpdateChecked={ checked => {
                       onChecked(checked, props.data.filter(e => !disabled(e)))
                       emits('check-page', checked)
                     } }
          ></NCheckbox>
          <NDropdown options={ titleOptions }
                     onSelect={ key => {
                       if (key === 1) {
                         emits('check-all')
                       } else if (key === 2) {
                         emits('update:selections', [])
                         emits('uncheck-all')
                       }
                     } }
          >
            <QnIcon icon="chevron-down"></QnIcon>
          </NDropdown>
        </NFlex>
      }
      render = (row: any) =>
          <NCheckbox checked={ props.selections.some(e => props.rowKey(e) === props.rowKey(row)) }
                     onUpdateChecked={ e => onChecked(e, [ row ].filter(e => !disabled(e))) }
                     disabled={ disabled(row) }
          ></NCheckbox>
      column = { ...column, width, title, align, titleAlign, render }
    } else { // 普通的表头，传递所有属性
      if (props.sortKey === key)
        sortOrder = props.sortOrder
      column = { ...column, key, width, align, sorter, sortOrder, type, render }
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
  const { pageNum = 1, pageSize = 20, total = 0 } = props
  return pageNum > Math.ceil(total / pageSize)
}, overflow => {
  if (overflow) {
    emits('update:page-num', 1)
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
  ></n-data-table>
  <n-layout-footer v-bind="paginationProps" ref="footerRef">
    <n-pagination :page="pageNum || 1"
                  :page-size="pageSize || 20"
                  :item-count="total"
                  :disabled="loading"
                  show-size-picker
                  show-quick-jumper
                  :page-sizes="[ 20, 50, 100 ]"
                  :display-order="[ 'size-picker', 'quick-jumper', 'pages' ]"
                  @update:page="emits('update:page-num', $event); emits('update:page')"
                  @update:page-size="emits('update:page-size', $event); emits('update:page')"
    >
      <template #prefix>
        <template v-if="loading">加载中...</template>
        <template v-else>
          共 {{ total }} 条数据
          <template v-if="selections?.length > 0">
            &nbsp;&nbsp;已选 {{ selections.length }}
          </template>
        </template>
      </template>
    </n-pagination>
  </n-layout-footer>

  <div v-if="props.paginationPlacement === 'fixed-bottom'" :style="{ height: `${ footerHeight }px` }"></div>

</template>
<style scoped>
:deep(.n-pagination-prefix) {
  margin-right: auto;
}
</style>