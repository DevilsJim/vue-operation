/*
  退款订单 - 操作信息
 */
<template>
  <div class="Operate">
    <el-table
      :data="[]"
      border
      style="width: 100%"
    >
      <el-table-column label="操作者" align="center" />
      <el-table-column label="操作时间" align="center" />
      <el-table-column label="订单状态" align="center" />
      <el-table-column label="付款状态" align="center" />
      <el-table-column label="流程节点" align="center" />
      <el-table-column label="备注" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Operate'
}
</script>

<style lang='scss' scoped>
</style>
