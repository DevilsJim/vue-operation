/*
    红冲弹窗
 */

<template>
  <el-dialog
    title="红冲"
    :visible.sync="dialogHC"
    width="30%"
  >
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column label="发票号" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.invoiceId || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.orderId || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发票抬头" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.companyName || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单金额（元）" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.price || '-' }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClickEnsureHC">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ensureInvioiceHc } from 'api/invoice'
export default {
  name: 'InvoiceHC',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogHC: this.isShow
    }
  },
  watch: {
    isShow(newV) {
      this.dialogHC = newV
    }
  },
  methods: {
    // 确定红冲
    handleClickEnsureHC() {
      const params = {
        invoiceIdList: [this.selected[0].orderId]
      }
      ensureInvioiceHc(params).then(res => {
        res = res.data
        if (res.code === 10000) {
          this.$message.success('红冲成功')
        } else {
          this.$message.error(res.message)
        }
      })

      // 关闭弹窗
      this.$emit('hiddenDialog')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
