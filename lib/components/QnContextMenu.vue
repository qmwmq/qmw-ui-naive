<script setup lang="tsx">
import { NDropdown } from 'naive-ui'
import { nextTick, ref } from 'vue'
import type { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface'

const emits = defineEmits([ 'select' ])

withDefaults(defineProps<{ options: DropdownMixedOption[] }>(), {
  options: () => [],
})

const visible = ref(false)
const params = ref({})
const x = ref(0)
const y = ref(0)

const show = (e: MouseEvent, params0: object = {}) => {
  e.preventDefault()
  e.stopPropagation()
  visible.value = false
  params.value = params0
  nextTick().then(() => {
    visible.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

const select = (key: string | number, option: DropdownMixedOption) => {
  visible.value = false
  emits('select', key, option, params.value)
}

defineExpose({ show })
</script>
<template>
  <n-dropdown :options="options"
              trigger="manual"
              placement="bottom-start"
              :show="visible"
              :x="x"
              :y="y"
              @clickoutside="() => visible = false"
              @select="select"
  ></n-dropdown>
</template>