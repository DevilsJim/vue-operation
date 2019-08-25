<template>
  <el-dialog :title="title" :close-on-click-modal="flag" :visible.sync="visible" width="500px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" label-width="90px" size="mini" :model="groupData">
      <el-form-item label="分组名:" prop="tagName">
        <el-input v-model="groupData.tagName" placeholder="请输入分组名" clearable />
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
  name: 'SaveOrUpdateGroup',
  props: {
    createOrUpdateVisible: {
      type: Boolean,
      default: false
    },
    createOrUpdateTitleVisible: {
      type: Boolean,
      default: false
    },
    updateGroupData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      visible: false,
      groupData: {},
      title: '创建分组',
      rules: {
        tagName: [
          { required: true, message: '请输入分组名！', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    createOrUpdateVisible(val, oldVal) {
      this.visible = val
    },
    createOrUpdateTitleVisible(val) {
      if (val) {
        this.title = '创建分组'
      } else {
        this.title = '修改分组'
      }
    },
    updateGroupData(val) {
      this.groupData = Object.assign({}, this.groupData, {
        tagName: val.tagName,
        tagId: val.tagId
      })
    }
  },
  methods: {
    closeDia(formName) {
      this.groupData = {}
      this.$refs[formName].resetFields()
      this.$emit('update:createOrUpdateVisible', false)
    },
    save(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.createOrUpdateTitleVisible) { // 创建分组
            addTag(this.groupData).then(response => {
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
          } else { // 修改分组
            updateTag(this.groupData).then(response => {
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
