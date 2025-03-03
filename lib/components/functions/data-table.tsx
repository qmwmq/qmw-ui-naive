import { NCheckbox } from 'naive-ui'
import type { VNodeChild } from 'vue'

export const onCheck = (
    checked: boolean,
    rows: any[],
    selections: any[],
    rowKey: Function,
    disabled: Function,
    emits: Function
) => {
  const o: any[] = []
  const length1 = rows.length
  const length2 = selections.length
  const excludeRowKeys = []
  for (let i = 0; i < length1; i++) {
    const row = rows[i]
    if (disabled(row))
      continue
    excludeRowKeys.push(rowKey(row))
    if (checked) // 如果是勾选则先预添加进去，如果是反选则不添加
      o.push(row)
  }
  for (let j = 0; j < length2; j++) {
    const selection = selections[j]
    const selectionKey = rowKey(selection)
    if (!excludeRowKeys.includes(selectionKey)) // 如果是勾选则已经添加过了无需添加，如果是反选则不必添加
      o.push(selection)
  }
  emits('update:selections', o)
}

export const renderRowCheckbox = (
    row: any,
    selections: any[],
    disabled: Function,
    rowKey: Function,
    emits: Function
):VNodeChild => {
  let rowChecked = false
  const key = rowKey(row)
  for (let i = 0; i < length; i++) {
    const selection = selections[i]
    const selectionKey = rowKey(selection)
    if (key === selectionKey) {
      rowChecked = true
      break
    }
  }
  return <NCheckbox checked={ rowChecked }
                    on-update:checked={ (e: any) => onCheck(e, [ row ], selections, rowKey, disabled, emits) }
                    disabled={ disabled(row) }
  ></NCheckbox>
}