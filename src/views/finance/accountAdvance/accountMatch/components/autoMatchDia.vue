<template>
  <el-dialog
    title="匹配进账"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="75%"
    @open="openDialog"
    @close="close"
  >
    <!--列表-->
    <el-table
      :data="exportList"
      border
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      />
      <el-table-column label="流水号" prop="streamId" align="center" />
      <el-table-column label="金额" prop="money" align="center" />
      <el-table-column label="客户名称" prop="customerName" align="center" />
      <el-table-column label="打款账号" prop="customerAccount" align="center" />
      <el-table-column label="客户开户行" prop="customerBank" align="center" />
      <el-table-column label="汇入途径" prop="importRoute" align="center" />
      <el-table-column label="到账时间" prop="remitTime" align="center" />
      <el-table-column label="是否匹配" align="center">
        <template slot-scope="scope">
          {{ scope.row.matchStatus | matchStatusFiler }}
        </template>
      </el-table-column>
      <el-table-column label="备注信息" prop="remark" align="center" />
    </el-table>
    <p style="color: #ff0000">注：未匹配成功的订单，请手动进行匹配</p>
    <!--底部-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm()">关闭</el-button>
      <!-- <el-button size="small" type="primary" @click="submitForm()">匹配进账</el-button>-->
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'AutoMatchDia',
  filters: {
    // 状态 匹配状态：1 未匹配 2.已匹配
    matchStatusFiler(status) {
      const statusMap = {
        1: '未匹配',
        2: '已匹配'
      }
      return statusMap[status]
    }
  },
  props: {
    autoMatchDia: {
      type: Boolean,
      default: false
    },
    exportList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: this.autoMatchDia,
      flag: false // 不可通过点击外面关闭弹框
    }
  },
  watch: {
    // 监听弹框是否显示
    autoMatchDia() {
      this.visible = this.autoMatchDia
    }
  },
  methods: {
    // 打开弹框调取数据
    openDialog() {
      this.ruleForm = {}
    },
    // 取消/重置
    resetForm() {
      this.$emit('update:autoMatchDia', false)
    },
    // 关闭弹框
    close() {
      this.resetForm()
    },
    // 保存
    submitForm() {
      // 调接口
      /* matchZgCustomerPayment({ zgCustomerPaymentList: this.exportList }).then(res => {
        if (res.data.code === 10000) {
          this.$message.success(res.data.message)
          this.resetForm()
          this.reload() // 自动刷新列表
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        this.$message.error(err)
      })*/
    }
  }
}

</script>

<style>

</style>

