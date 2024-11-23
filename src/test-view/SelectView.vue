<template>
  <qn-select :options="options" tooltip-option></qn-select>
</template>
<script setup lang="ts">
import { QnSelect } from '../../lib'

const options = [
  { id: 1, name: 'xxx' },
  { id: 2, name: 'qqq' },
]
</script>