<template>
  <el-dialog :title="title" :close-on-click-modal="flag" :visible.sync="visible" width="500px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" label-width="90px" size="mini" :model="labelInfo">
      <el-form-item label="标签名:" label-width="90px" prop="tagName">
        <el-input v-model="labelInfo.tagName" placeholder="请输入标签名" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addTag, updateTag } from '@/api/customerService'
export default {
  inject: ['reload'],
  name: 'SaveOrUpdateLabel',
  props: {
    createOrUpdateVisible: {
      type: Boolean,
      default: false
    },
    createOrUpdateTitleVisible: {
      type: Boolean,
      default: false
    },
    labelData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      visible: this.createOrUpdateVisible,
      labelInfo: {
        tagName: ''
      },
      title: '创建标签',
      rules: {
        tagName: [
          { required: true, message: '请输入标签名！', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    createOrUpdateVisible() {
      this.visible = this.createOrUpdateVisible
    },
    createOrUpdateTitleVisible(val) {
      if (val) {
        this.title = '创建标签'
      } else {
        this.title = '修改标签'
      }
    },
    labelData: {
      handler(val, oldVal) {
        if (this.createOrUpdateTitleVisible) { // 创建标签
          this.labelInfo = Object.assign({}, this.labelInfo, {
            parentTagId: val.tagId
          })
        } else { // 修改标签
          this.labelInfo = Object.assign({}, this.labelInfo, {
            tagName: val.tagName,
            tagId: val.tagId
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDia(formName) {
      this.labelInfo = {
        tagName: ''
      }
      this.$refs[formName].resetFields()
      this.$emit('update:createOrUpdateVisible', false)
    },
    save(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.createOrUpdateTitleVisible) { // 创建标签
            addTag(this.labelInfo).then(response => {
              if (response.data.code === 10000) {
                this.$message.success(response.data.message)
                this.closeDia('ruleForm')
                this.reload()
              } else {
                this.$message.error(response.data.message)
              }
            }).catch((err) => {
              this.$message.error(err)
            })
          } else { // 修改标签
            updateTag(this.labelInfo).then(response => {
              if (response.data.code === 10000) {
                this.$message.success(response.data.message)
                this.closeDia('ruleForm')
                this.reload()
              } else {
                this.$message.error(response.data.message)
              }
            }).catch((err) => {
              this.$message.error(err)
            })
          }
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-row{
    padding: 0 20px;
  }
  /deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
    font-weight: normal;
  }
  /deep/ .el-form .el-form-item__content .el-select {
    width: 100%;
  }
  /deep/ .el-form .label-style .el-form-item__label{
    font-weight: bold;
  }
  /deep/ .el-form .label-style .el-form-item__content{
    margin-top: 10px;
  }
</style>
