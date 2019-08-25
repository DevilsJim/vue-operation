<template>
  <el-dialog title="审核无效客户" :close-on-click-modal="flag" :visible.sync="templateDialog" width="650px" @close="closeDia">
    <el-form :model="temp" label-width="80px">
      <!-- 放弃理由 -->
      <el-form-item label="审核结果:">
        <el-radio v-model="temp.checkType" label="1">通过</el-radio>
        <el-radio v-model="temp.checkType" label="2">不通过</el-radio>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="审核意见:">
        <el-input v-model="temp.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="doRelease">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { checkCompany } from '@/api/customerService'
export default {
  name: 'AuditCustomerDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentCompanyId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      temp: {
        logName: '8'
      }
    }
  },
  watch: {
    visible: function() {
      this.templateDialog = this.visible
    },
    currentCompanyId: {
      handler: function(val, oldVal) {
        this.temp.companyId = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDia() {
      this.temp = {}
      this.$emit('update:visible', false)
    },
    doRelease() {
      const _this = this
      if (this.temp.checkType === 0) {
        this.temp.remark = '通过无效客户审核' + ' <br/> ' + _this.temp.remark
      }

      if (this.temp.checkType === 1) {
        this.temp.remark = '未通过无效客户审核' + ' <br/> ' + _this.temp.remark
      }
      console.log(this.temp.remark)
      checkCompany(this.temp).then(response => {
        if (response.data.code === 10000) {
          _this.$message.success(response.data.message)
          this.$emit('fetchData')
          this.closeDia()
        } else {
          _this.$message.error('操作失败')
        }
      }).catch((err) => {
        _this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog .el-dialog__header{
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
/deep/ .el-dialog .el-dialog__body{
  padding:30px 120px 20px 50px;
}
/deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
  font-weight: normal;
  font-size: 15px;
}
</style>
