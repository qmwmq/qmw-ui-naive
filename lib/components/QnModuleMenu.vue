<script setup lang="tsx">
import { type MenuOption, NLayoutSider, NMenu } from 'naive-ui'
import { computed, ref, type VNodeChild } from 'vue'
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

const props = withDefaults(defineProps<{
  moduleId: number | string
  menuId: number | string
  options: Option[],
  collapseTrigger?: 'bar' | 'arrow-circle'
}>(), {
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

const activeModule = computed((): MenuOption => {
  return leftOptions.value.find(e => e.key === props.moduleId) || {}
})

const renderLeftLabel = (option: MenuOption): VNodeChild =>
    <div class="menu-content">
      <QnIcon icon={ option.iconName as Icon } size={ 20 }></QnIcon>
      <div>{ option.label }</div>
    </div>

const collapsed = ref(false)

defineSlots<{
  'left-header'(): any
  'right-header'(props: { module: MenuOption }): any
}>()
defineEmits([ 'update:module-id', 'update:menu-id' ])
</script>
<template>
  <!-- 左侧模块 -->
  <n-layout-sider :native-scrollbar="false"
                  :width="80"
                  inverted
                  bordered
  >
    <slot name="left-header"></slot>
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
                  :collapsed-width="0"
                  :show-trigger="collapseTrigger"
                  v-model:collapsed="collapsed"
  >
    <slot name="right-header" :module="activeModule"></slot>
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