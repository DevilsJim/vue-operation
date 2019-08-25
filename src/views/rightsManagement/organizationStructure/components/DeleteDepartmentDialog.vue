<template>
  <el-dialog
    :visible.sync="templateDialog"
    show-close="false"
    :close-on-click-modal="flag"
    width="350px"
  >
    <p>您确定要删除选中部门吗？</p>

    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="doRelease">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setPrivateToPublic } from '@/api/customerDetail'
export default {
  name: 'ReleasePrivateCustomerDialog',
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
      templateDialog: this.visible,
      temp: {}
    }
  },
  watch: {
    visible: function() {
      this.templateDialog = this.visible
    }
  },
  methods: {
    closeDia() {
      this.temp = {}
      this.$emit('update:visible', false)
    },
    doRelease() {
      setPrivateToPublic({ 'companyId': this.currentCompanyId }).then(response => {
        if (response.data.code === 10000) {
          this.closeDia()
          this.$router.push({ path: '/customerManagement/myCustomer' })
        } else {
          this.$message.error('操作失败')
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
  .el-dialog__header{
    border-bottom: none;
  }
  .el-dialog__headerbtn{
    top: 20px;
    font-size: 16px;
  }
}

</style>
