<script setup lang="ts">
import { NHighlight } from 'naive-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  text?: any
  patterns: any[]
}>(), {})

const text0 = computed(() => {
  if ([ void 0, null ].includes(props.text))
    return ''
  return String(props.text)
})
const patterns0 = computed(() => {
  return props.patterns
      .filter(e => ![ void 0, null, '' ].includes(e))
      .map(e => String(e))
})

</script>
<template>
  <n-highlight :text="text0"
               :patterns="patterns0"
  />
</template>