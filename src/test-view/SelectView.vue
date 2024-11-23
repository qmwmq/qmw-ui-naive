<template>
  <qn-select :options="options" render-label="ellipsis-label" style="width: 200px"></qn-select>
</template>
<script setup lang="ts">
import { QnSelect } from '../../lib'

const options = [
  { id: 1, name: 'xxx' },
  { id: 2, name: 'qqq' },
  { id: 3, name: 'qqqqqqqqqqqqqqqqqqqqqqqqq' },
]
</script>