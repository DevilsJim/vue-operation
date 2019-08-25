/*
* 退款详情弹窗
*/
<template>
  <el-dialog class="refund-dialog" title="退款详情" :visible.sync="showDialog" @close="$emit('closeDialogRefund')">
    <div class="item">
      <div class="centent">
        <span class="left">订单状态</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">订单编号</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">支付时间</span>
        <span class="right">2017-07-19 14:48:38</span>
      </div>
      <div class="centent">
        <span class="left">申请人</span>
        <span class="right">100000000</span>
      </div>
      <div class="centent">
        <span class="left">申请时间</span>
        <span class="right">100000000</span>
      </div>
    </div>

    <div class="item">
      <div class="centent">
        <span class="left">订单金额</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">汇入途径</span>
        <span class="right">待处理</span>
      </div>
      <div class="centent">
        <span class="left">交易流水号</span>
        <span class="right">2017-07-19 14:48:38</span>
      </div>
      <div class="centent">
        <span class="left">确认退款金额</span>
        <span class="right">100000000</span>
      </div>
      <div class="centent">
        <span class="left">退款账户</span>
        <span class="right">100000000</span>
      </div>
      <div class="centent">
        <span class="left">退款原因</span>
        <span class="right">100000000</span>
      </div>
      <div class="centent">
        <span class="left">备注信息</span>
        <span class="right">100000000</span>
      </div>
    </div>

    <div class="item">
      <div class="centent">
        <span class="left">处理人员</span>
        <span class="right">处理人员</span>
      </div>
      <div class="centent">
        <span class="left">处理时间</span>
        <span class="right">处理人员</span>
      </div>
      <div class="centent">
        <span class="left">处理备注</span>
        <span class="right">处理人员</span>
      </div>
      <div class="centent">
        <span class="left">请选择退款方式</span>
        <span class="right">
          <el-radio-group v-model="refundType">
            <el-radio label="3">原路退回</el-radio>
            <el-radio label="6">转账</el-radio>
          </el-radio-group>
        </span>
      </div>
      <div class="centent">
        <span class="left">上传支付凭证</span>
        <span class="right">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </span>
      </div>
    </div>
    <div class="btn-wrap">
      <el-button type="success" @click="handleClickEnsureRefund">确定退款</el-button>
      <el-button type="danger" @click="handleClickRefuseRefund">拒绝退款</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RefundDetail',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: this.isShow,
      refundType: '' // 退款转账方式
    }
  },
  watch: {
    isShow(newV) {
      this.showDialog = newV
    }
  },
  methods: {
    // 确定退款
    handleClickEnsureRefund() {
      console.log('确定退款')
      this.$emit('closeDialogRefund')
    },
    // 拒绝退款
    handleClickRefuseRefund() {
      console.log('拒绝退款')
      this.$emit('closeDialogRefund')
    }
  }
}
</script>

<style lang="scss" scoped>
.refund-dialog {
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
      }
    }
  }
  .btn-wrap {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
