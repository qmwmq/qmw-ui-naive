<script setup lang="tsx">
import type { Icon } from './QnIcon.vue'
import QnIcon from './QnIcon.vue'
import { type MenuOption, NLayoutSider, NMenu } from 'naive-ui'
import type { Option } from './QnModuleMenu.vue'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { ArrayUtils } from 'qmwts'

const props = withDefaults(defineProps<{
  menuId?: number | string
  options?: Option[]
  collapseTrigger?: 'bar' | 'arrow-circle'
  accordion?: boolean
}>(), {
  options: () => [],
  accordion: true,
})

const menuRef = useTemplateRef('menuRef')

// 根据options和menuId同时确定当前的menuId，因为menuId存在时，options可能为[]
watch(() => props.options.find(e => e.id === props.menuId)?.id, () => {
  nextTick(() => menuRef.value?.showOption(props.menuId))
}, { immediate: true })

const collapsed = ref(false)

const treeOptions = computed((): MenuOption[] =>
    ArrayUtils.arrayToTree<MenuOption>(
        props.options.map(e => {
          return {
            key: e.id,
            label: e.name,
            parentId: e.parentId,
            icon: () => {
              if (!e.parentId && !e.icon) // 一级菜单默认icon
                return <QnIcon icon="application" size={ collapsed.value ? 24 : 22 }></QnIcon>
              return <QnIcon icon={ e.icon as Icon } size={ collapsed.value ? 24 : 22 }></QnIcon>
            }
          }
        }),
        'key',
        'parentId',
        'children'
    )
)

const updateMenuId = (menuId?: number | string) => {
  const menu = props.options.find(e => e.id === menuId)
  emits('update:menu-id', menuId, menu?.query)
}

const emits = defineEmits([ 'update:menu-id' ])
</script>
<template>
  <n-layout-sider :width="200"
                  :native-scrollbar="false"
                  :show-trigger="collapseTrigger"
                  inverted
                  collapse-mode="width"
                  :collapsed-width="50"
                  bordered
                  v-model:collapsed="collapsed"
  >
    <slot name="header"/>
    <n-menu ref="menuRef"
            :value="menuId"
            :options="treeOptions"
            :indent="16"
            inverted
            :accordion="accordion"
            @update:value="updateMenuId"
    />
  </n-layout-sider>
</template>