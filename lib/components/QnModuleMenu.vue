<script setup lang="tsx">
import { NLayoutSider, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui/lib/menu/src/interface'
import { computed, type VNodeChild } from 'vue'
import type { Icon } from './QnIcon.vue'
import QnIcon from './QnIcon.vue'
import { ArrayUtils } from 'qmwts'

export interface Option {
  id: number | string
  parentId: number | string
  name: string
  icon: string
  path: string
}

export interface ModuleMenuProps {
  moduleId: number | string
  menuId: number | string
  options: Option[]
}

const props = withDefaults(defineProps<ModuleMenuProps>(), {
  moduleId: '',
  menuId: '',
  options: () => [],
})

const leftOptions = computed((): MenuOption[] =>
    props.options.filter(e => !e.parentId).map(e => {
      return {
        key: e.id,
        label: e.name,
        iconName: e.icon ? e.icon : 'application' // icon没法强转string，这里换个名字iconName
      }
    })
)

const rightOptions = computed((): MenuOption[] => {
  const option = ArrayUtils.arrayToTree<MenuOption>(
      props.options.map(e => {
        return {
          key: e.id,
          label: e.name,
          parentId: e.parentId,
          icon: e.icon ? () => <QnIcon icon={ e.icon as Icon }></QnIcon> : void 0
        }
      }), 'key', 'parentId', 'children'
  ).find(e => e.key === props.moduleId)
  if (option) return option.children || []
  else return []
})

const renderLeftLabel = (option: MenuOption): VNodeChild =>
    <div class="menu-content">
      <QnIcon icon={ option.iconName as Icon } size={ 20 }></QnIcon>
      <div>{ option.label }</div>
    </div>

defineEmits([ 'update:module-id', 'update:menu-id' ])
</script>
<template>
  <!-- 左侧模块 -->
  <n-layout-sider :native-scrollbar="false"
                  :width="80"
                  inverted
                  bordered
  >
    <n-menu :value="moduleId"
            :options="leftOptions"
            :render-label="renderLeftLabel"
            inverted
            class="left-menu"
            :node-props="() => ({ class: 'left-node' })"
            @update:value="$emit('update:module-id', $event)"
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
            :indent="20"
            @update:value="$emit('update:menu-id', $event)"
    ></n-menu>
  </n-layout-sider>
</template>
<style scoped>
:deep(.left-menu .n-menu-item-content) {
  padding: 0 !important;
}

:deep(.left-menu .left-node) {
  height: 60px;
}

:deep(.left-menu .menu-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}
</style>