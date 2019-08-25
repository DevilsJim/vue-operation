/*
  发票列表 - 发票详情  /finance/invoiceDetail
 */
<template>
  <div class="app-container">
    <h3 class="title">
      <i class="el-icon-s-opportunity" /> 当前发票状态：未开票
    </h3>
    <div class="item">
      <div class="centent">
        <span class="left">发票金额</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">发票类型</span>
        <span class="right">纸质发票</span>
      </div>
      <div class="centent">
        <span class="left">发票抬头</span>
        <span class="right">XXXXX公司</span>
      </div>
      <div class="centent">
        <span class="left">社会统一信用代码</span>
        <span class="right">201707196398345 </span>
      </div>
      <div class="centent">
        <span class="left">注册地址</span>
        <span class="right">2017-07-19 14:48:38 </span>
      </div>
      <div class="centent">
        <span class="left">公司电话</span>
        <span class="right">201707196398345 </span>
      </div>
      <div class="centent">
        <span class="left">开户行</span>
        <span class="right">201707196398345 </span>
      </div>
      <div class="centent">
        <span class="left">开户行账号</span>
        <span class="right">201707196398345 </span>
      </div>
    </div>

    <div class="item">
      <div class="centent">
        <span class="left">收件人姓名</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">收件人手机号</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">收件人地址</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">快递信息</span>
        <span class="right">待处理</span>
      </div>
    </div>

    <!-- 列表 -->
    <el-table
      :data="[]"
      border
      style="width: 100%"
    >
      <el-table-column label="订单号" align="center" />
      <el-table-column label="合同号" align="center" />
      <el-table-column label="客户名称" align="center" />
      <el-table-column label="订单金额" align="center" />
      <el-table-column label="开票金额" align="center" />
      <el-table-column label="流程节点" align="center" />
      <el-table-column label="申请人" align="center" />
      <el-table-column label="申请时间" align="center" />
      <el-table-column label="发票类型" align="center" />
      <el-table-column label="发票状态" align="center" />
    </el-table>

    <el-button type="primary" @click="handleClickBack">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'InvoiceDetail',
  methods: {
    // 返回按钮事件
    handleClickBack() {
      console.log('返回')
    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  margin: 0 0 20px;
  color: #F04844;
}
.item {
  margin-bottom: 10px;
  border: 1px solid #dfe6ec;
  .centent {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #dfe6ec;
    &:last-child {
      border-bottom: 0;
    }
    span {
      padding: 20px 10px;
      font-size: 12px;
    }
    .left {
      flex: 0 0 200px;
      text-align: right;
      border-right: 1px solid #dfe6ec;
      background-color: #F9FAFC;
    }
    .right {
      flex: 1;
    }
  }
}
.el-button {
  margin: 20px auto;
  display: block;
}
</style>
