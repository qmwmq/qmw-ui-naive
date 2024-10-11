<script setup lang="ts">
import { NLayoutSider, NMenu } from 'naive-ui'
import { computed } from 'vue'

export interface Option {
  id: number | string
  parentId: number | string
  name: string
  icon: string
}

export interface ModuleMenuProps {
  moduleId: number | string
  menuId: number | string
  options: Option[]
}

const props = withDefaults(defineProps<ModuleMenuProps>(), {
  moduleId: '',
  menuId: '',
  options: [],
})
const leftOptions = computed(() => props.options.filter(e => !e.parentId))
const rightOptions = computed(() => props.options.filter(e => e.parentId === props.moduleId))

</script>
<template>
  <!-- 左侧模块 -->
  <n-layout-sider :native-scrollbar="false"
                  :width="80"
                  inverted bordered
  >
    <n-menu :value="moduleId"
            :options="leftOptions"
    ></n-menu>
  </n-layout-sider>
  <!-- 右侧菜单 -->
  <n-layout-sider :native-scrollbar="false"
                  :width="170"
                  bordered
                  collapse-mode="width"
  >
    <n-menu :value="menuId"
            :options="rightOptions"
    ></n-menu>
  </n-layout-sider>
</template>