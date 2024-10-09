<script setup lang="tsx">
import { nextTick, ref, watch } from 'vue'
import { NFlex, NScrollbar, NTag } from 'naive-ui'
import type { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface'
import QnIcon from './QnIcon.vue'
import QnContextMenu from './QnContextMenu.vue'

export interface Tab {
  key: number,
  label: string | number,
}

export interface TabsProps {
  value?: number,
  tabs: Tab[],
}

const props = withDefaults(defineProps<TabsProps>(), {
  tabs: () => []
})

const scrollbarRef = ref()
const tagRefs = ref<{ [key: number]: any }>({})
const contextMenuRef = ref()
// 竖向滑轮变横向滚动
const wheel = (e: WheelEvent) => {
  scrollbarRef.value.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' })
}

// 滚动了多少距离
const scrollLeft = () => scrollbarRef.value.scrollbarInstRef.$refs.containerRef.scrollLeft
// 滚动容器的宽度
const clientWidth = () => scrollbarRef.value.scrollbarInstRef.$refs.containerRef.clientWidth

// 标签左边距在屏幕左侧外
const onLeft = (element: HTMLElement) => {
  const { offsetLeft } = element
  return offsetLeft < scrollLeft()
}

// 标签右边距在屏幕右侧外
const onRight = (element: HTMLElement) => {
  const { offsetLeft, offsetWidth } = element
  return offsetLeft + offsetWidth > scrollLeft() + clientWidth()
}

// 值发生变化时，令对应的标签滚动到界面中，而不是停留在界面外
// 不使用scrollIntoView的原因：
//    1.在复杂页面偶尔会失效，是能使用setTimeout延迟滚动
//    2.无法禁用垂直方向的滚动，如果垂直方向有滚动条回引发垂直方向的滚动
watch(() => props.value, (value: number | undefined) => {
  if (value === void 0)
    return
  nextTick(() => {
    const element = tagRefs.value[value]
    if (element) {
      const { $el } = element
      if (onLeft($el)) {
        scrollbarRef.value.scrollTo({
          left: $el.offsetLeft - 1,
          behavior: 'smooth'
        })
      } else if (onRight($el)) {
        scrollbarRef.value.scrollTo({
          left: $el.offsetLeft + $el.offsetWidth - clientWidth() + 2,
          behavior: 'smooth'
        })
      }
    }
  })
}, { immediate: true })

const dropdownOption = [
  { key: 1, label: '关闭', icon: () => <QnIcon icon="close"></QnIcon> },
  { key: 2, label: '关闭其他', icon: () => <QnIcon icon="close-outline"></QnIcon> },
  { key: 3, label: '关闭全部', icon: () => <QnIcon icon="close-filled"></QnIcon> },
]

const select = (key: string | number, option: DropdownMixedOption, params: any) => {
  const { key: tabKey } = params
  switch (key) {
    case 1:
      emits('close', tabKey)
      break;
    case 2:
      emits('close-other', tabKey)
      break;
    case 3:
      emits('close-all')
      break;
  }
}

const emits = defineEmits([ 'update:value', 'close', 'close-other', 'close-all' ])
</script>
<template>

  <qn-context-menu ref="contextMenuRef"
                   :options="dropdownOption"
                   @select="select"
  ></qn-context-menu>

  <n-scrollbar x-scrollable ref="scrollbarRef" @wheel.prevent="wheel">
    <n-flex :wrap="false" :size="6" style="margin: 6px"><!-- 外部边距以及元素间的边距都是6 -->
      <n-tag v-for="i in tabs"
             :key="i.key"
             :ref="e => tagRefs[i.key] = e"
             style="cursor: pointer"
             closable
             :type="value === i.key ? 'primary' : void 0"
             @click="$emit('update:value', i.key)"
             @close="$emit('close', i.key)"
             @contextmenu="contextMenuRef.show($event, { key: i.key })"
      >
        <template #icon>
          <qn-icon v-if="value === i.key" icon="check-filled" :size="20"></qn-icon>
          <qn-icon v-else icon="dot" depth="3" :size="20"></qn-icon>
        </template>
        {{ i.label }}
      </n-tag>
    </n-flex>
  </n-scrollbar>
</template>