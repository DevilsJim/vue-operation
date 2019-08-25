/*
  退款订单  /finance/refund
 */
<template>
  <div class="app-container">
    <el-tabs v-model="currentName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="orderData">
        <order-data />
      </el-tab-pane>
      <el-tab-pane label="文件信息" name="fileDate">
        <file-data />
      </el-tab-pane>
      <el-tab-pane label="操作信息" name="operateDate">
        <operate-data />
      </el-tab-pane>
      <el-tab-pane label="审核信息" name="auditData">
        <audit-data />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import orderData from './order'
import fileData from './file'
import operateData from './operate'
import auditData from './audit'

export default {
  name: 'Refund',
  components: {
    orderData,
    fileData,
    operateData,
    auditData
  },
  data() {
    return {
      // tabs默认值
      currentName: 'orderData'
    }
  },
  methods: {
    // tabs切换
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
