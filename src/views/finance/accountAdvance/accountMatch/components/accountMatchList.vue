<!--财务管理-进账管理-入账匹配组件-->
<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!--服务单号-->
      <el-form-item label="服务单号：">
        <el-input v-model="formInline.payId" placeholder="请输入服务单号" clearable />
      </el-form-item>
      <!--客户名称-->
      <el-form-item label="客户名称：">
        <el-input v-model="formInline.companyName" placeholder="请输入客户名称" clearable />
      </el-form-item>
      <!--提交时间-->
      <el-form-item label="提交时间：" class="created-time">
        <el-date-picker
          v-model="submitTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleSubmitTime"
        />
      </el-form-item>
      <!--到账时间-->
      <!--未匹配 不显示 到账时间-->
      <el-form-item v-if="formInline.matchStatus!=='1'" label="到账时间：" class="created-time">
        <el-date-picker
          v-model="paymentTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handlePaymentTime"
        />
      </el-form-item>
      <!--匹配时间-->
      <!--未匹配 不显示 匹配时间-->
      <el-form-item v-if="formInline.matchStatus!=='1'" label="匹配时间：" class="created-time">
        <el-date-picker
          v-model="matchTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleMatchTime"
        />
      </el-form-item>
      <!--所属顾问-->
      <el-form-item label="所属顾问：">
        <el-input v-model="formInline.consultantName" placeholder="请输入所属顾问" clearable />
      </el-form-item>
      <!--操作-->
      <el-form-item class="btn-wrap">
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
        <!--未匹配 显示 导入进账-->
        <upload-picture v-if="formInline.matchStatus==='1'" :upload-url="uploadUrl" :cus-file-list="uploadFilePicList" :file-type="false" style="display: inline-block" :headers-obj="headersObj" @resFileData="uploadFileData" />
        <!--未匹配、全部订单 显示 进账模板下载-->
        <a v-if="formInline.matchStatus!=='2'" href="static/财务进账导入模板.xlsx" download class="download">进账模板下载</a>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      v-loading="listData.listLoading"
      :data="listData.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="60" align="center" fixed />
      <el-table-column label="服务单号" align="center">
        <template slot-scope="scope">
          <router-link :to="{name: 'AccountDetail', params: { payId: scope.row.payId }}" style="color: #0000FF">
            {{ scope.row.payId }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="流水号" prop="offlineId" align="center" />
      <el-table-column label="金额" prop="price" align="center" />
      <el-table-column label="客户名称" prop="companyName" align="center" />
      <el-table-column label="打款账户名" prop="customerName" align="center" />
      <el-table-column label="客户开户行" prop="customerBank" align="center" />
      <el-table-column label="开户行账号" prop="customerAccount" align="center" />
      <el-table-column label="汇入途径" prop="remitAccount" align="center" />
      <el-table-column label="提交时间" prop="createTime" sortable align="center" />
      <el-table-column label="到账时间" prop="incomeTime" sortable align="center" />
      <el-table-column label="匹配时间" prop="matchTime" sortable align="center" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.matchStatus | matchStatusFiler }}
        </template>
      </el-table-column>
      <el-table-column label="所属顾问" prop="consultantName" align="center" />
      <el-table-column label="操作" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <!--未匹配状态 显示匹配进账-->
          <el-button v-if="scope.row.matchStatus===1" size="mini" type="primary" @click="handleMatchedEntry(scope.row)">匹配进账</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="listData.currentPageNumber"
      :page-size="listData.pageSize"
      :total="listData.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--手动匹配进账-->
    <matched-entry :matched-entry-dia.sync="matchedEntryDia" :item-info="itemInfo" />

    <!--自动匹配进账-->
    <auto-match :auto-match-dia.sync="autoMatchDia" :export-list="exportList" />
  </div>
</template>

<script type="text/ecmascript-6">
import UploadPicture from './UploadPicture'
import MatchedEntry from './matchedEntry.vue'
import AutoMatch from './autoMatchDia.vue'
import { getToken } from '@/utils/auth'
import { matchZgCustomerPayment } from 'api/financeService'
export default {
  inject: ['reload'],
  name: 'AccountMatchList',
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
    MatchedEntry,
    UploadPicture,
    AutoMatch
  },
  props: {
    listData: {
      type: Object,
      default: null
    },
    activeTabsName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      submitTime: null, // 提交时间
      paymentTime: null, // 到账时间
      matchTime: null, // 匹配时间
      // 搜索条件传参
      formInline: {
        start: '1', // 第几页 [传值的时候传这个]
        length: '10', // 每页几条 [传值的时候传这个]
        matchStatus: null, // 匹配状态1：未匹配2：已匹配’
        payId: '', // 服务单号
        companyName: '', // 客户名称
        consultantName: '' // 所属顾问
      },
      matchedEntryDia: false, // 自动匹配进账默认隐藏
      itemInfo: {}, // 传给匹配进账参数
      uploadUrl: process.env.VUE_APP_FINANCE_API + '/zgCustomerPayment/importCustomerPayment', // 导入地址
      headersObj: { // 设置上传的请求头部
        'token': getToken()
      },
      uploadFilePicList: [],
      autoMatchDia: false, // 自动匹配弹框默认关闭
      exportList: [] // 要传给自动匹配进账弹框的数据
    }
  },
  watch: {
    activeTabsName: {
      handler: function(val, oldVal) {
        if (val === '0') {
          this.formInline.matchStatus = null
        } else if (val === '1') {
          this.formInline.matchStatus = '1'
        } else if (val === '2') {
          this.formInline.matchStatus = '2'
        }
      }
    }
  },
  methods: {
    // 提交时间
    handleSubmitTime(val) {
      if (val !== null) { // 如果选了时间
        this.$set(this.formInline, 'submitStartTime', val[0]) // 开始时间
        this.$set(this.formInline, 'submitEndTime', val[1]) // 结束时间
      } else { // 如果没有选择时间
        this.$set(this.formInline, 'submitStartTime', '') // 开始时间
        this.$set(this.formInline, 'submitEndTime', '') // 结束时间
      }
    },
    // 到账时间
    handlePaymentTime(val) {
      if (val !== null) { // 如果选了时间
        this.$set(this.formInline, 'incomeStartTime', val[0]) // 开始时间
        this.$set(this.formInline, 'incomeEndTime', val[1]) // 结束时间
      } else {
        this.$set(this.formInline, 'incomeStartTime', '') // 开始时间
        this.$set(this.formInline, 'incomeEndTime', '') // 结束时间
      }
    },
    // 匹配时间
    handleMatchTime(val) {
      if (val !== null) { // 如果选了时间
        this.$set(this.formInline, 'matchStartTime', val[0]) // 开始时间
        this.$set(this.formInline, 'matchEndTime', val[1]) // 结束时间
      } else {
        this.$set(this.formInline, 'matchStartTime', '') // 开始时间
        this.$set(this.formInline, 'matchEndTime', '') // 结束时间
      }
    },
    // 搜索
    onSubmit() {
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },
    // 重置
    onReset() {
      this.formInline = {
        start: '1', // 第几页 [传值的时候传这个]
        length: '10', // 每页几条 [传值的时候传这个]
        matchStatus: null, // 匹配状态1：未匹配2：已匹配’
        payId: '', // 服务单号
        companyName: '', // 客户名称
        consultantName: '' // 所属顾问
      }
      this.submitTime = null // 提交时间
      this.paymentTime = null // 到账时间
      this.matchTime = null // 匹配时间
      this.formInline.matchStatus = this.activeTabsName
      this.$message('重置搜索项!')
    },

    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    },
    // 匹配进账
    handleMatchedEntry(item) {
      this.matchedEntryDia = true
      this.itemInfo = item
    },

    // 导入进账
    importAccounts() {
      this.autoMatchDia = true
    },

    // 批量匹配
    matchZgCustomerPayment(val) {
      matchZgCustomerPayment({ zgCustomerPaymentList: val }).then(res => {
        if (res.data.code === 10000) {
          this.exportList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },

    // 导入进账 导入表格成功后执行的方法
    uploadFileData(response, file, fileList) {
      // 调取 批量匹配进账接口
      this.matchZgCustomerPayment(response.url)
      this.importAccounts()
    }
  }
}

</script>

<style scoped>
  .el-pagination{
    text-align: right;
    margin-top: 20px;
  }
  .download{
    display: inline-block;
    padding: 2px 10px;
    color: #fff;
    background: #1890ff;
    border-radius: 3px;
    margin-left: 5px;
  }

</style>
