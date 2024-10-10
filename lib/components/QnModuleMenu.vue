<script setup lang="ts">
import { NLayoutSider, NMenu } from 'naive-ui'

export interface Option {
  id: number | string
  parentId: number | string
  name: string
  icon: string
}

export interface ModuleMenuProps {
  value: number | string
  options: []
}



</script>
<template>
  <n-layout-sider :native-scrollbar="false">
    <n-menu></n-menu>
  </n-layout-sider>
  <n-layout-sider :native-scrollbar="false">
    <n-menu :value="value"></n-menu>
  </n-layout-sider>
</template>