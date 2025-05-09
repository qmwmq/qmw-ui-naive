<script setup lang="ts">
import { NFlex, NText, NUpload, NUploadDragger, NUploadTrigger, type UploadCustomRequestOptions } from 'naive-ui'
import QnIcon from './QnIcon.vue'
import { useTemplateRef } from 'vue'

const uploadRef = useTemplateRef('uploadRef')
const upload = (options: UploadCustomRequestOptions) => {
  console.log(uploadRef.value?.openOpenFileDialog)
  // console.log(123)
  // console.log(options.file)
}
</script>
<template>
  <n-upload ref="uploadRef"
            abstract
            multiple
            :custom-request="upload"
            :show-file-list="false"
  >
    <n-upload-dragger>
      <n-flex vertical align="center">
        <qn-icon icon="upload-cloud" :size="48" depth="3"/>
        <n-text style="font-size: 16px">
          拖拽、粘贴文件到此处，或
          <span @click="uploadRef?.openOpenFileDialog()">点击上传</span>
        </n-text>
      </n-flex>
      <n-upload-trigger #="{ handleClick }">
        123
      </n-upload-trigger>
    </n-upload-dragger>
  </n-upload>
</template>