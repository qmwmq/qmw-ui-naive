<script setup lang="ts">
import { NInput } from 'naive-ui'

withDefaults(defineProps<{
  value?: number | string | null
}>(), {
  value: null
})
</script>
<template>
  <n-input></n-input>
</template>