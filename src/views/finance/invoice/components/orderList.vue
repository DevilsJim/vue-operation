/*
  发票列表 - 订单组件
 */
<template>
  <div class="order">
    <el-form ref="formData" :inline="true" :model="formData" label-width="120px" size="small">
      <!-- 发票单号、发票抬头 -->
      <el-form-item>
        <el-select v-model="formData.search" prop="invoice" @change="handleChangeSearch">
          <el-option label="发票单号" value="invoiceCode" />
          <el-option label="发票抬头" value="invoiceTitle" />
          <el-option label="订单号" value="orderId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.searchCon" :placeholder="`请输入${searchCon[formData.search]}`" clearable />
      </el-form-item>
      <!-- 流程节点 -->
      <el-form-item label="流程节点：" prop="phaseName">
        <el-select v-model="formData.phaseName" placeholder="请选择流程节点" clearable>
          <el-option label="已报件" value="1" />
        </el-select>
      </el-form-item>
      <!-- 发票类型 -->
      <el-form-item label="发票类型：" prop="invoiceType">
        <el-select v-model="formData.invoiceType" placeholder="请选择发票类型" clearable>
          <el-option label="电子普通发票" value="1" />
          <el-option label="纸质普通发票" value="2" />
          <el-option label="纸质专用发票" value="3" />
        </el-select>
      </el-form-item>
      <!-- 发票状态 -->
      <el-form-item label="发票状态：" prop="invoiceStatus">
        <el-select v-model="formData.invoiceStatus" placeholder="请选择发票状态" clearable>
          <el-option label="未开票" value="1" />
          <el-option label="已开票" value="2" />
          <el-option label="待邮寄" value="3" />
          <el-option label="已邮寄" value="4" />
          <el-option label="待红冲" value="5" />
          <el-option label="已红冲" value="6" />
          <el-option label="待补票" value="7" />
        </el-select>
      </el-form-item>
      <!-- 申请时间 -->
      <el-form-item label="申请时间：" prop="applyTime">
        <el-date-picker
          v-model="applyTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          clearable
          @change="handleChangeApplyTime"
        />
      </el-form-item>
      <!-- 开票时间 -->
      <el-form-item label="开票时间：" prop="incoiveTime">
        <el-date-picker
          v-model="incoiveTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          clearable
          @change="handleChangeIncoiveTime"
        />
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="onReset('formData')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表头部按钮 -->
    <div class="list-header">
      <div class="lf">
        <el-button type="primary" @click="handleClickHC">红冲</el-button>
      </div>
      <div class="rf">
        <el-button class="rf-item" size="mini" type="primary">
          <a href="../../../../public/files/线索导入模板.xlsx" download="邮寄模板.xlsx">邮寄模板下载</a>
        </el-button>
        <upload-file class="rf-item" :url="importMail" text="导入邮寄" />
        <upload-file class="rf-item" :url="importInvoice" text="导入发票" />
        <el-button
          v-loading="downloadLoading"
          class="rf-item"
          size="mini"
          icon="el-icon-download"
          type="primary"
          @click="handleClickExportInvoice"
        >
          导出发票
        </el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table
      v-loading="listData.listLoading"
      :data="listData.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column label="订单号" prop="orderId" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程节点" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phaseName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票抬头" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceTitle || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票类型" align="center">
        <template slot-scope="scope">
          <span>{{ getInvoiceType(scope.row.invoiceType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开票方式" align="center">
        <template slot-scope="scope">
          <span>{{ getOpenType(scope.row.openType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceCode || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceDate || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票方" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.openCompany || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operator || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票状态" align="center">
        <template slot-scope="scope">
          <span>{{ getInvoiceStatus(scope.row.invoiceStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page="listData.start"
      :page-size="listData.len"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 红冲弹窗 -->
    <dialog-hc :is-show="isShowDialogHC" :list="hcList" :selected="selectList" @hiddenDialog="isShowDialogHC = false" />
  </div>
</template>

<script>
import { invoiceListInvoiceType, invoiceListOpenWay, invoiceListInvoiceStatus } from 'assets/define'
import { getHCList, exportInvoice } from 'api/invoice'
import fileDownload from 'js-file-download'
import dialogHc from './modal/hc'
import uploadFile from './modal/upload'

export default {
  name: 'OrderList',
  components: {
    dialogHc,
    uploadFile
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      mobile: '手机号',
      searchCon: { // 关键字内容
        invoiceCode: '发票号',
        invoiceTitle: '发票抬头',
        orderId: '订单号'
      },
      applyTime: '', // 申请时间
      incoiveTime: '', // 开票时间
      formData: {
        len: this.listData.len,
        start: this.listData.start,
        search: 'invoiceCode', // 关键字
        searchCon: '', // 关键字内容
        phaseName: '', // 流程节点
        invoiceType: '', // 发票类型
        invoiceStatus: '', // 发票状态
        createStartDate: '', // 申请开始时间
        createEndDate: '', // 申请结束时间
        invoiceStartDate: '', // 开票开始时间
        invoiceEndDate: '' // 开票结束时间
      },
      selectList: [], // 列表选中数据
      hcList: [], // 需要红冲的数据
      isShowDialogHC: false, // 是否展示红冲弹窗
      downloadLoading: false,
      importMail: `${process.env.VUE_APP_BASE_API}/zgInvoice/importInvoiceSendInfo`, // 导入邮寄
      importInvoice: `${process.env.VUE_APP_BASE_API}/zgInvoice/importInvoice` // 导入发票 url
    }
  },
  methods: {
    // 搜索事件
    onSubmit() {
      this.formData[this.formData.search] = this.formData.searchCon
      console.log(this.formData)
    },
    // 重置事件
    onReset(formName) {
      this.$refs[formName].resetFields()
      this.$message('重置搜索项!')
    },
    // 关键字 change
    handleChangeSearch() {
      this.formData.searchCon = ''
    },
    // 申请时间 change
    handleChangeApplyTime() {
      if (this.applyTime && this.applyTime.length > 0) {
        this.formData.createStartDate = this.applyTime[0]
        this.formData.createEndDate = this.applyTime[1]
      } else {
        this.formData.createStartDate = ''
        this.formData.createEndDate = ''
      }
    },
    // 开票时间 change
    handleChangeIncoiveTime() {
      if (this.incoiveTime && this.incoiveTime.length > 0) {
        this.formData.invoiceStartDate = this.incoiveTime[0]
        this.formData.invoiceEndDate = this.incoiveTime[1]
      } else {
        this.formData.invoiceStartDate = ''
        this.formData.invoiceEndDate = ''
      }
    },
    // 红冲
    handleClickHC() {
      if (this.selectList.length === 0) {
        this.$message.error('请在列表选中要红冲的订单')
        return
      }
      if (this.selectList.length > 1) {
        this.$message.error('只支持单个订单进行红冲！')
        return
      }
      const params = {
        invoiceId: this.selectList[0].orderId
      }
      getHCList(params).then(res => {
        res = res.data
        if (res.code === 10000) {
          this.isShowDialogHC = true
          const data = res.data
          this.hcList = data || []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 导出发票
    handleClickExportInvoice() {
      this.downloadLoading = true
      const params = {
        length: 10,
        start: 1
      }
      exportInvoice(params).then(res => {
        fileDownload(res.data, '发票.xls')
        this.downloadLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 列表选中
    handleSelectionChange(val) {
      if (!val || val.length === 0) {
        this.selectList = []
        return
      }

      this.selectList = val
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 开票方式
    getOpenType(val) {
      return invoiceListOpenWay[val - 1] || '-'
    },
    // 发票类型
    getInvoiceType(val) {
      return invoiceListInvoiceType[val - 1] || '-'
    },
    // 发票状态
    getInvoiceStatus(val) {
      return invoiceListInvoiceStatus[val - 1] || '-'
    },
    // 处理搜索表单数据为空的
    disposeFormData() {

    }
  }
}
</script>

<style lang='scss' scoped>
.list-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .rf {
    display: flex;
    .rf-item {
      margin-left: 10px;
      width: 88px;
      height: 34px;
      overflow: hidden;
      &:first-child {
        width: 104px;
      }
      &:last-child {
        width: 104px;
      }
    }
  }
}
</style>
