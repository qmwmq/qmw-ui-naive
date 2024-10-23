<template>
  <n-flex align="center" style="padding: 10px">
    {{ value1 }}
    <qn-date-picker v-model:value="value1" use-timestamp></qn-date-picker>
    {{ value2 }}
    <qn-date-picker v-model:value="value2"></qn-date-picker>

    <qn-date-range-picker v-model:min-value="min"
                          v-model:max-value="max"
    ></qn-date-range-picker>
    {{ min }}
    <br/>
    {{ max }}

  </n-flex>
</template>
<script setup lang="ts">
import { NFlex } from 'naive-ui'
import QnDatePicker from '../../lib/components/QnDatePicker.vue'
import { ref } from 'vue'
import QnDateRangePicker from '../../lib/components/QnDateRangePicker.vue'

const value1 = ref(Date.now())
const value2 = ref('2021-01-01')

const min = ref(null)
const max = ref(null)
</script>