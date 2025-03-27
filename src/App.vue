<template>
  <qn-config-provider theme="light">
    <n-theme-editor>

      {{ a }}
      <qn-input-number v-model:value="a"></qn-input-number>

      <qn-segment>
        <n-tab name="1" tab="xxx"></n-tab>
        <n-tab name="2" tab="aaa"></n-tab>
      </qn-segment>
      <!--      <modal-view></modal-view>-->
      <select-view></select-view>
      <date-picker-view></date-picker-view>
      <data-table-view></data-table-view>
      <menu-view></menu-view>
    </n-theme-editor>
  </qn-config-provider>
</template>
<script setup lang="tsx">
import { NTab, NThemeEditor } from 'naive-ui'
import { QnConfigProvider } from '../lib'
import MenuView from './test-view/MenuView.vue'
import DataTableView from './test-view/DataTableView.vue'
import DatePickerView from './test-view/DatePickerView.vue'
import SelectView from './test-view/SelectView.vue'
import QnSegment from '../lib/components/QnSegment.vue'
import QnInputNumber from '../lib/components/QnInputNumber.vue'
import { ref } from 'vue'

const a = ref(0)
</script>