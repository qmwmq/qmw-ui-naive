import type { VNodeChild } from 'vue'

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