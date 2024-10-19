<!--<script setup lang="ts">-->
<!--import { NDatePicker, NFlex, NPopover, NScrollbar,NButton } from 'naive-ui'-->
<!--import { ref } from 'vue'-->

<!--const gap = ref(4)-->

<!--</script>-->
<!--<template>-->
<!--  <n-popover trigger="click"-->
<!--             :content-style="{ display: 'flex', padding: `${ gap }px`, gap: `${ gap }px` }"-->
<!--             scrollable-->
<!--             :show-arrow="false"-->
<!--             placement="bottom-start"-->
<!--             style="min-width: 200px"-->
<!--  >-->
<!--    <template #trigger>-->
<!--      <n-date-picker :show="false" format="yyyy年MM月" input-readonly clearable></n-date-picker>-->
<!--    </template>-->
<!--    <n-scrollbar style="max-height: 250px">-->
<!--      <n-flex :size="gap" vertical>-->
<!--        <n-button size="small" quaternary v-for="i in 100" :key="i">{{ i }}</n-button>-->
<!--      </n-flex>-->
<!--    </n-scrollbar>-->
<!--    <n-scrollbar style="max-height: 250px">-->
<!--      <n-flex :size="gap" vertical>-->
<!--        <n-button size="small" quaternary v-for="i in 12" :key="i">{{ i }}</n-button>-->
<!--      </n-flex>-->
<!--    </n-scrollbar>-->
<!--  </n-popover>-->
<!--</template>-->