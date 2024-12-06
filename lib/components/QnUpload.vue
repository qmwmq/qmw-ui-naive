<script setup lang="ts">
import {NUpload,NUploadDragger,NUploadTrigger} from 'naive-ui'
import QnIcon from './QnIcon.vue'
</script>
<template>
  <n-upload>
    <n-upload-dragger>
      <qn-icon icon="upload-cloud" :size="48" depth="3"></qn-icon>
    </n-upload-dragger>
  </n-upload>
</template>