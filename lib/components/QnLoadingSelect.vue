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