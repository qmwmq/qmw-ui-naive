<template>
  <qn-data-table :data="data"
                 :columns="columns"
                 :active-row="e => e.id === 4199"
                 :summary="summary"
                 v-model:sort-key="params.sortKey"
                 v-model:sort-order="params.sortOrder"
                 v-model:selections="selections"
  ></qn-data-table>
</template>
<script setup lang="ts">
import { type DataTableColumn, QnDataTable } from '../../lib'
import data from '../test-data/table-data.json'
import { ref } from 'vue'

const params = ref({})
const selections = ref([])

const columns: DataTableColumn[] = [
  { key: 'selection', type: 'selection', width: 200 },
  { key: 'id', title: 'id', width: 200 },
  { key: 'date', title: 'id', width: 200 },
  { key: 'amount', title: 'amount', width: 200, sorter: true },
  { key: 'amount2', title: 'amount2', width: 200 },
  { key: 'createTime', title: 'createTime', width: 200 },
  { key: 'action', title: 'action', width: 200, fixed: 'right' },
]

const summary = () => {
  return { id: 1 }
}

</script>