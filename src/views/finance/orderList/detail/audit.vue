/*
  退款订单 - 审核信息
 */
<template>
  <div class="audit">
    <div class="item">
      <div class="centent">
        <span class="left">审核状态</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">订单编号</span>
        <span class="right">待处理 <em class="look">查看</em></span>
      </div>
      <div class="centent">
        <span class="left">申请时间</span>
        <span class="right">2017-07-19 14:48:38</span>
      </div>
      <div class="centent">
        <span class="left">用户账号</span>
        <span class="right">100000000</span>
      </div>
    </div>

    <div class="item">
      <div class="centent">
        <span class="left">订单金额</span>
        <span class="right">&yen; 12.00</span>
      </div>
      <div class="centent">
        <span class="left">确认退款金额</span>
        <span class="right">&yen; 12.00</span>
      </div>
      <div class="centent">
        <span class="left">退款账户</span>
        <span class="right">xxxx</span>
      </div>
      <div class="centent">
        <span class="left">退款类型</span>
        <span class="right">取消订单</span>
      </div>
      <div class="centent">
        <span class="left">退款原因</span>
        <span class="right">重新下单</span>
      </div>
    </div>

    <div class="item">
      <div class="centent">
        <span class="left">处理人员</span>
        <span class="right">&yen; 12.00</span>
      </div>
      <div class="centent">
        <span class="left">处理时间</span>
        <span class="right">&yen; 12.00</span>
      </div>
      <div class="centent">
        <span class="left">处理备注</span>
        <span class="right">xxxx</span>
      </div>
    </div>

    <el-form :model="formData" label-width="100px" size="mini">
      <el-form-item label="审核结果：">
        <el-radio v-model="formData.audit" label="1">通过</el-radio>
        <el-radio v-model="formData.audit" label="2">不通过</el-radio>
      </el-form-item>
      <el-form-item label="审核意见：">
        <el-input v-model="formData.desc" type="textarea" width="50%" placeholder="请输入您的建议" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">审核通过</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Audit',
  data() {
    return {
      formData: {
        audit: '', // 审核结果
        desc: '' // 审核意见
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang='scss' scoped>
.audit {
  width: 100%;
  overflow: hidden;
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
        flex: 0 0 120px;
        text-align: right;
        border-right: 1px solid #dfe6ec;
        background-color: #F9FAFC;
      }
      .right {
        flex: 1;
        .look {
          margin-left: 10px;
          color: #24BD9E;
          font-style: normal;
        }
      }
    }
  }
}
</style>
