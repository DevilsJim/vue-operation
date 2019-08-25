/*
  退款订单 - 订单信息
 */
<template>
  <div class="order">
    <h3 class="title">当前订单状态：已付款</h3>
    <!-- 基本信息 -->
    <div class="card-wrap">
      <h5 class="sub-title">基本信息</h5>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="订单编号" align="center" />
        <el-table-column prop="date" label="合同编号" align="center" />
        <el-table-column prop="date" label="用户账号" align="center" />
        <el-table-column prop="date" label="支付方式" align="center" />
        <el-table-column prop="date" label="付款时间" align="center" />
      </el-table>
    </div>
    <!-- 发票信息 -->
    <div class="card-wrap">
      <h5 class="sub-title">发票信息</h5>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="发票类型" align="center" />
        <el-table-column prop="date" label="发票抬头" align="center" />
        <el-table-column prop="date" label="发票内容" align="center" />
        <el-table-column prop="date" label="收票人信息" align="center" />
      </el-table>
    </div>
    <!-- 联系人信息 -->
    <div class="card-wrap">
      <h5 class="sub-title">联系人信息</h5>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="收件人" align="center" />
        <el-table-column prop="date" label="手机号码" align="center" />
        <el-table-column prop="date" label="邮政编码" align="center" />
        <el-table-column prop="date" label="收件地址" align="center" />
      </el-table>
    </div>
    <!-- 商品信息 -->
    <div class="card-wrap">
      <h5 class="sub-title">商品信息</h5>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="商品图片" align="center" />
        <el-table-column prop="date" label="商品名称" align="center" />
        <el-table-column prop="date" label="价格/货号" align="center" />
        <el-table-column prop="date" label="属性" align="center" />
        <el-table-column prop="date" label="数量" align="center" />
        <el-table-column prop="date" label="库存" align="center" />
        <el-table-column prop="date" label="小计" align="center" />
      </el-table>
    </div>
    <!-- 费用信息 -->
    <div class="card-wrap">
      <h5 class="sub-title">费用信息</h5>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="商品合计" align="center" />
        <el-table-column prop="date" label="订单总金额" align="center" />
        <el-table-column prop="date" label="优惠金额" align="center" />
        <el-table-column prop="date" label="应付款金额" align="center" />
      </el-table>
    </div>
    <!-- 审核信息 -->
    <div class="card-wrap audit-wrap">
      <h5 class="sub-title">审核信息</h5>
      <div class="content">
        <div class="item">
          <span class="left">审核结果</span>
          <span class="right">不通过</span>
        </div>
        <div class="item">
          <span class="left">审核意见</span>
          <span class="right">优惠价格不能低于150</span>
        </div>
      </div>
    </div>
    <!-- 返回按钮 -->
    <el-button type="primary">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'Order'
}
</script>

<style lang='scss' scoped>
.order {
  .title {
    margin: 0;
    line-height: 34px;
    font-size: 14px;
    color: #F04844;
  }
  .audit-wrap {
    .content {
      overflow: hidden;
      border: 1px solid #dfe6ec;
      .item {
        overflow: hidden;
        &:first-child {
          border-bottom: 1px solid #dfe6ec;
        }
        span {
          box-sizing: border-box;
          float: left;
          padding: 12px 10px;
          text-align: right;
          font-size: 14px;
        }
        span.left {
          width: 180px;
          color: #909399;
          border-right: 1px solid #dfe6ec;
        }
      }
    }
  }
  /deep/ .el-button--primary {
    margin: 20px auto;
    display: block;
  }
}
</style>
