<template>
  <el-dialog title="特殊人员设置" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()">
    <el-form ref="dataForm" label-width="90px" size="mini">
      <el-row>
        <el-col style="padding-right: 15px;">
          <el-form-item label="数量:" prop="poolNum" label-width="90px">
            <el-input v-model="consultantData.poolNum" placeholder="请输入私有池数量" />
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
import { updateCustomerPrivate } from '../../../../api/rule'

export default {
  inject: ['reload'],
  name: 'AddSpecialPoolNum',
  props: {
    addSpecialPoolNumVisible: {
      type: Boolean,
      default: false
    },
    poolNum: {
      type: Number,
      default: 0
    },
    customerId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag: false,
      visible: this.addSpecialPoolNumVisible,
      consultantData: {}
    }
  },
  watch: {
    addSpecialPoolNumVisible: function() {
      this.visible = this.addSpecialPoolNumVisible
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:addSpecialPoolNumVisible', false)
    },
    save() {
      updateCustomerPrivate({ pkSid: this.customerId, privateLimitCount: this.consultantData.poolNum }).then(response => {
        if (response.data.code === 10000) {
          this.$message.success(response.data.message)
          this.closeDia()
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
