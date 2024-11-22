<template>
  <n-layout>
    <n-layout-content has-sider>
      <qn-module-menu :options="menus"
                      collapse-trigger="bar"
                      v-model:menu-id="menuId"
                      v-model:module-id="moduleId"
      ></qn-module-menu>
    </n-layout-content>
    <n-layout-content has-sider>
      <qn-single-menu :options="menus"
                      collapse-trigger="bar"
                      v-model:menu-id="menuId"
      ></qn-single-menu>
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'
import { QnModuleMenu, QnSingleMenu } from '../../lib'
import menus from '../test-data/menu.json'
import { ref } from 'vue'

const menuId = ref(0)
const moduleId = ref(0)

</script>