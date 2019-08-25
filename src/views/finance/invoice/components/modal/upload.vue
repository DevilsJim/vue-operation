/*
    导入组件
 */
<template>
  <upload-file
    :btn-word="text"
    :upload-url="url"
    :cus-file-list="uploadFilePicList"
    :file-type="false"
    :show-file-list="true"
    @resFileData="uploadFileData"
  />
</template>

<script>
import UploadFile from '@/views/UploadPicture'

export default {
  name: 'Upload',
  components: { UploadFile },
  props: {
    text: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadFilePicList: [],
      followData: {
        companyId: null
      }
    }
  },
  methods: {
    uploadFileData(file) {
      if (file.isRemove) {
        this.followData.filePath = ''
      } else {
        this.followData.filePath = file.url
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
