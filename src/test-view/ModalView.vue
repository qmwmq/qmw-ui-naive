<template>
  <qn-modal v-model:visible="visible">
    <template #header>123</template>
    <template #action>
      123
    </template>
  </qn-modal>

  <n-modal
      v-model:show="showModal1"
      title="card 预设拖拽"
      preset="card"
      draggable
      :style="{ width: '800px' }"
  >
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
    <div>无意义的内容...</div>
  </n-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { NModal } from 'naive-ui'
import { QnModal } from '../../lib'

const visible = ref(true)
const showModal1 = ref(true)
</script>