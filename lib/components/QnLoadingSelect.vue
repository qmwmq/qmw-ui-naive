<script setup lang="ts">
import { NSelect, NSpin, NText } from 'naive-ui'
</script>
<template>
  <n-select :value="null" placeholder="数据加载中" loading>
    <template #empty>
      <n-spin>
        <template #description>
          <n-text depth="3">数据加载中</n-text>
        </template>
      </n-spin>
    </template>
  </n-select>
</template>