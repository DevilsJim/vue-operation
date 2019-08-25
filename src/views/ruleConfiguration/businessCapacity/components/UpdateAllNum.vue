<template>
  <el-dialog title="顾问可拥有商机的最大数量设置" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()" @open="open()">
    <el-form ref="dataForm" label-width="90px" size="mini">
      <el-row>
        <el-col style="padding-right: 15px;">
          <el-form-item label="数量:" prop="privateLimitCount" label-width="90px">
            <el-input v-model="formInline.privateLimitCount" placeholder="请输入线商机容量" />
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
import { saveBusinessMaxNumber } from '../../../../api/clues'
export default {
  inject: ['reload'],
  name: 'UpdateAllNum',
  props: {
    updateAllNumVisible: {
      type: Boolean,
      default: false
    },
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag: false,
      visible: this.updateAllNumVisible,
      formInline: {
        privateLimitCount: 0,
        pkSid: 1 // 接口要求写死
      }
    }
  },
  watch: {
    // 监听弹框变化
    updateAllNumVisible: function() {
      this.visible = this.updateAllNumVisible
    }
  },
  methods: {
    // 打开弹框
    open() {
      this.formInline.privateLimitCount = this.number
    },

    // 关闭弹框
    closeDia() {
      this.formInline = {
        privateLimitCount: this.number,
        pkSid: 1 // 接口要求写死
      }
      this.$emit('update:updateAllNumVisible', false)
    },

    // 保存
    save() {
      saveBusinessMaxNumber(this.formInline).then(response => {
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
