<template>
  <qn-config-provider theme="os">
    <n-theme-editor>
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
</script>