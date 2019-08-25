<template>
  <el-dialog title="线索容量设置" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()">
    <el-form ref="dataForm" label-width="90px" size="mini">
      <el-row>
        <el-col style="padding-right: 15px;">
          <el-form-item label="数量:" prop="nickname" label-width="90px">
            <el-input v-model="formInline.threadMaxContainerCount" placeholder="请输入线索容量" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="save()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { saveCluesMaxNumber } from '../../../../api/clues'

export default {
  inject: ['reload'],
  name: 'UpdateAllNum',
  props: {
    updateAllNumVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      visible: this.updateAllNumVisible,
      formInline: {
        pkSid: 1001
      }
    }
  },
  watch: {
    updateAllNumVisible: function() {
      this.visible = this.updateAllNumVisible
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:updateAllNumVisible', false)
    },
    save() {
      saveCluesMaxNumber(this.formInline).then(response => {
        if (response.data.code === 10000) {
          this.$message.success('设置成功')
          this.reload()
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        this.$message.error(err)
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
