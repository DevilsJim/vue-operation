<!--财务管理-进账管理-入账匹配详情-->
<template>
  <div class="accountDetail">
    <!--显示详情-->
    <h3>线下入账详情</h3>
    <ul>
      <li><span style="font-size: 16px;color: red;">当前状态：{{ payDetailInfo.matchStatus | matchStatusFiler }}</span></li>
      <li><span class="title">服务单号</span><span>{{ payDetailInfo.payId }}</span></li>
      <li><span class="title">流水号</span><span>{{ payDetailInfo.flowId }}</span></li>
      <li><span class="title">客户名称</span><span>{{ payDetailInfo.companyName }}</span></li>
      <li><span class="title">打款账户</span><span>{{ payDetailInfo.customerName }}</span></li>
      <li><span class="title">客户开户行</span><span>{{ payDetailInfo.customerBank }}</span></li>
      <li><span class="title">客户账号</span><span>{{ payDetailInfo.customerAccount	}}</span></li>
      <li><span class="title">到账时间</span><span>{{ payDetailInfo.incomeTime }}</span></li>
      <li><span class="title">支付金额</span><span>{{ payDetailInfo.price }}</span></li>
      <li><span class="title">汇入途径</span><span>{{ payDetailInfo.remitAccount }}</span></li>
      <li><span class="title">所属顾问</span><span>{{ payDetailInfo.consultantName }}</span></li>
      <li><span class="title">申请时间</span><span>{{ payDetailInfo.createTime }}</span></li>
      <li><span class="title">匹配时间</span><span>{{ payDetailInfo.matchTime }}</span></li>
    </ul>
    <!--表单-->
    <el-table
      :data="payDetailInfo.contractList"
      border
      style="width: 100%"
    >
      <el-table-column
        label="合同编号"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.contractId }}
        </template>
      </el-table-column>
      <el-table-column
        prop="signDate"
        label="合同日期"
        align="center"
      />
      <el-table-column
        prop="companyName"
        label="客户名称"
        align="center"
      />
      <el-table-column
        prop="price"
        label="合同金额"
        align="center"
      />
    </el-table>
    <!--底部-->
    <div class="footer">
      <!--状态为 未匹配的时候显示 匹配入账 去掉了-->
      <!-- <el-button type="primary" size="small" @click="matchEntry">匹配入账</el-button>-->
      <el-button type="primary" size="small" @click="goBcak">返回</el-button>
    </div>

    <!--匹配进账-->
    <matched-entry :matched-entry-dia.sync="matchedEntryDia" />
  </div>
</template>

<script type="text/ecmascript-6">
import MatchedEntry from './components/matchedEntry.vue'
import { payDetail } from 'api/paymentService'
export default {
  name: 'AccountDetail',
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
  components: {
    MatchedEntry
  },
  data() {
    return {
      matchedEntryDia: false, // 匹配进账默认隐藏
      payDetailInfo: {}
    }
  },
  created() {
    this.payDetail()
  },
  methods: {
    // 详情
    payDetail() {
      payDetail(this.$route.params.payId).then(response => {
        if (response.data.code === 10000) {
          this.payDetailInfo = response.data.data
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 匹配入账
    matchEntry() {
      // 跟列表弹框一样
      this.matchedEntryDia = true
    },
    // 返回
    goBcak() {
      // 返回列表
      this.$router.push({ name: 'AccountMatch' })
    }
  }
}

</script>

<style scoped>
.accountDetail{
  padding: 20px;
}
ul{
  border:1px solid #dfe6ec;
  padding: 0;
  font-size: 14px;
}
ul li{
  list-style: none;
  border-bottom:1px solid #dfe6ec;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  color: #606266;
}
li:last-child{
  border-bottom: none;
}
ul .title{
  width: 138px;
  display: inline-block;
  text-align: right;
  border-right: 1px solid #dfe6ec;
  padding-right: 10px;
  margin-right: 10px;
}
.footer{
  text-align: center;
  margin-top: 20px;
}
</style>
