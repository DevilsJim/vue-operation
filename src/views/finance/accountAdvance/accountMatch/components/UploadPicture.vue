<template>
  <!--上传文件和图片，上传文件 fileType 为 false,上传图片 fileType 为 true-->
  <div class="upload-demo">
    <!-- 上传图片 -->
    <el-upload
      v-if="fileType"
      list-type="picture-card"
      name="file"
      class="uploader"
      :class="{disabled: uploadDisabled}"
      :action="uploadUrl"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog v-if="fileType" :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImgUrl" alt="">
    </el-dialog>

    <!-- 上传文件 -->
    <el-upload
      v-if="!fileType"
      class="upload-demo"
      name="file"
      :action="uploadUrl"
      :before-upload="handleBeforeUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :show-file-list="false"
      :headers="headersObj"
      :on-error="handleError"
    >
      <el-button size="small" type="primary">导入进账</el-button>
      <!--<div slot="tip" class="el-upload__tip" style="display: none">上传文件只能是 rar, zip, xlsx, doc 格式</div>-->
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadPicture',
  props: {
    uploadUrl: {
      type: String,
      default: ''
    },
    cusFileList: {
      type: Array,
      default: null
    },
    fileType: {
      type: Boolean
    },
    headersObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      dialogImgUrl: ''
    }
  },
  computed: {
    uploadDisabled: {
      // getter
      get() {
        return this.fileList.length > 0
      },
      // setter
      set(newValue) {
        this.fileList = newValue
      }
    }
  },
  watch: {
    cusFileList: {
      handler: function(val, oldVal) {
        this.fileList = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
    handleBeforeUpload(file) {
      let isTrueType = true
      if (this.fileType) {
        isTrueType = /^image\/(png|jpe?g|gif|bmp)$/.test(file.type)
      } else {
        const fileArr = ['rar', 'zip', 'xlsx', 'xls', 'doc', 'docx']
        if (fileArr.indexOf(file.name.split('.')[file.name.split.length - 1]) === -1) isTrueType = false
      }
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isTrueType) {
        if (this.fileType) {
          this.$message.error('上传头像图片只能是 JPG, PNG, GIF, BMP 格式!')
        } else {
          this.$message.error('上传文件只能是 rar, zip, xlsx, doc 格式!')
        }
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isTrueType && isLt2M
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImgUrl = file.url
      this.dialogVisible = true
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      const resData = {}
      resData.url = res.data
      this.$emit('resFileData', resData)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      const resData = {}
      resData.url = ''
      resData.isRemove = true
      this.$emit('resFileData', resData)
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      console.log(err)
      this.$message.error('导入数据必填数据不能为空')
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader{
  position: relative;
  height: 148px;
  .el-upload-list--picture-card{
    position: relative;
    z-index: 1;
    .el-upload-list__item{
      margin: 0;
    }
  }
  .el-upload--picture-card{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  &.disabled{
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
