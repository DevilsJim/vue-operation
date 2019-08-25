<template>
  <div class="app-container">
    <h4>下载 <a href="../../../../public/files/线索导入模板.xlsx" style="color: #238def" download="线索导入模板.xlsx">线索模板</a>，填入线索信息后上传</h4>
    <br>
    <el-col :span="5">
      <upload-picture :upload-url="uploadUrl" :cus-file-list="uploadFilePicList" :file-type="false" @resFileData="uploadFileData" />
    </el-col>
  </div>
</template>

<script>
import UploadPicture from '@/views/UploadPicture'
export default {
  name: 'ImportClues',
  components: { UploadPicture },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_API}/thread/upload/import/thread/data`,
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

<style scoped>

</style>
