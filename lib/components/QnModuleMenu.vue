<script setup lang="tsx">
import { type MenuOption, NDropdown, NLayoutSider, NMenu } from 'naive-ui'
import { computed, ref, type VNodeChild, watch } from 'vue'
import QnIcon, { type Icon } from './QnIcon.vue'
import { ArrayUtils } from 'qmwts'

const emits = defineEmits([ 'update:module-id', 'update:menu-id' ])

export interface Option {
  id?: number | string
  parentId?: number | string
  name?: string
  icon?: string
  path?: string
}

const props = withDefaults(defineProps<{
  moduleId?: number | string
  menuId?: number | string
  options?: Option[],
  collapseTrigger?: 'bar' | 'arrow-circle'
}>(), {
  options: () => [],
})

// menuId发生变化时修改moduleId
watch(() => props.menuId, menuId => {
  let menu = void 0
  let moduleId = menuId
  do {
    let menu = props.options.find(e => e.id === moduleId)
    if (menu && menu.parentId)
      moduleId = menu.parentId
  } while (menu)
  emits('update:module-id', moduleId)
}, { immediate: true })

const treeOptions = computed((): MenuOption[] =>
    ArrayUtils.arrayToTree<MenuOption>(
        props.options.map(e => {
          return {
            key: e.id,
            label: e.name,
            parentId: e.parentId,
            iconName: e.icon
          }
        }),
        'key',
        'parentId',
        'children'
    )
)

const leftOptions = computed((): MenuOption[] =>
    treeOptions.value.map(e => ({ ...e, children: void 0 }))
)

const rightOptions = (moduleId: any) =>
    treeOptions.value.find(e => e.key === moduleId)?.children || []

const activeModule = computed((): MenuOption =>
    treeOptions.value.find(e => e.key === props.moduleId) || {}
)

const renderLeftLabel = (option: MenuOption): VNodeChild => {
  return <NDropdown options={ rightOptions(option.key) }
                    disabled={ !collapsed.value || rightOptions(option.key)?.length === 0 }
                    placement="right-start"
                    size="large"
                    delay={ 0 }
                    width={ 170 }
                    onSelect={ key => emits('update:menu-id', key) }
  >
    <div class="menu-content">
      <QnIcon icon={ option.iconName as Icon || 'application' } size={ 20 }></QnIcon>
      <div>{ option.label }</div>
    </div>
  </NDropdown>
}

const collapsed = ref(false)

defineSlots<{
  'left-header'(): any
  'right-header'(props: { module: MenuOption }): any
}>()
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
            :options="rightOptions(moduleId)"
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