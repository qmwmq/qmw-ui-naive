<template>
  <n-flex style="padding: 10px">
    {{ value }}
    <qn-date-picker v-model:value="value"></qn-date-picker>
  </n-flex>
</template>
<script setup lang="ts">
import { NFlex } from 'naive-ui'
import QnDatePicker from '../../lib/components/QnDatePicker.vue'
import { ref } from 'vue'

const value = ref(Date.now())
</script>