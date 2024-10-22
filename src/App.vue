<template>
  <qn-config-provider theme="light">
    <n-theme-editor>
      <date-picker-view></date-picker-view>
      <data-table-view></data-table-view>
      <menu-view></menu-view>
    </n-theme-editor>
  </qn-config-provider>
</template>
<script setup lang="tsx">
import { NThemeEditor } from 'naive-ui'
import { QnConfigProvider } from '../lib'
import MenuView from './test-view/MenuView.vue'
import DataTableView from './test-view/DataTableView.vue'
import DatePickerView from './test-view/DatePickerView.vue'
</script>