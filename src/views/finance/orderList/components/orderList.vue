/*
  订单列表 - 订单组件
 */
<template>
  <div class="customer-list-table">
    <el-form ref="formInline" :model="formInline" :inline="true" size="small">
      <!-- 搜索条件 -->
      <el-form-item>
        <el-select v-model="formInline.searchType">
          <el-option label="订单编号" value="1" />
          <el-option label="合同编号" value="2" />
          <el-option label="客户名称" value="3" />
          <el-option label="联系人手机号" value="4" />
        </el-select>
      </el-form-item>
      <!-- 搜索内容 -->
      <el-form-item prop="searchValue">
        <el-input v-model="formInline.searchValue" :placeholder="`请输入${searchAll[formInline.searchType - 1]}`" clearable />
      </el-form-item>
      <!-- 提交时间 -->
      <el-form-item label="提交时间：" prop="referTime">
        <el-date-picker
          v-model="referTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          clearable
          @change="handleChangeReferTime"
        />
      </el-form-item>
      <!-- 发票状态 -->
      <el-form-item label="发票状态：" prop="invoiceStatus">
        <el-select v-model="formInline.invoiceStatus" placeholder="请选择发票状态" clearable>
          <el-option label="未开票" value="1" />
          <el-option label="已开票" value="2" />
          <el-option label="未邮寄" value="3" />
          <el-option label="已邮寄" value="4" />
          <el-option label="待红冲" value="5" />
          <el-option label="已红冲" value="6" />
          <el-option label="待补票" value="7" />
        </el-select>
      </el-form-item>
      <!-- 支付方式 -->
      <el-form-item label="支付方式：" prop="payType">
        <el-select v-model="formInline.payType" placeholder="请选择支付方式" clearable>
          <el-option label="支付宝" value="ALI" />
          <el-option label="微信" value="WE" />
          <el-option label="转账汇款" value="PAY_OFFLINE_NAME" />
          <el-option label="余额支付" value="PAY_BALANCE_NAME" />
        </el-select>
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态：" prop="orderState">
        <el-select v-model="formInline.orderState" placeholder="请选择订单状态" clearable>
          <el-option label="未付款" value="1" />
          <el-option label="已付款" value="2" />
          <el-option label="退款中" value="3" />
          <el-option label="未通过(退款失败)" value="4" />
          <el-option label="已退款" value="5" />
          <el-option label="已完成" value="6" />
          <el-option label="已关闭" value="7" />
        </el-select>
      </el-form-item>
      <!-- 支付时间 -->
      <el-form-item label="支付时间：" prop="payTime">
        <el-date-picker
          v-model="payTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          clearable
          @change="handleChangePayTime"
        />
      </el-form-item>
      <!-- 发票类型 -->
      <el-form-item label="发票类型：" prop="invoiceType">
        <el-select v-model="formInline.invoiceType" placeholder="请选择发票类型" clearable>
          <el-option label="电子普通发票" value="1" />
          <el-option label="纸质普通发票" value="2" />
          <el-option label="纸质专用发票" value="3" />
        </el-select>
      </el-form-item>
      <!-- 业务类型 -->
      <el-form-item label="业务类型：" prop="businessType">
        <el-cascader
          v-model="businessType"
          :options="businessOptions"
          :props="{ expandTrigger: 'hover' }"
          clearable
          @change="handleChangeBusinessType"
        />
      </el-form-item>
      <!-- 流程节点 -->
      <el-form-item label="流程节点：" prop="phase">
        <el-select v-model="formInline.phase" placeholder="请选择发票类型" clearable>
          <el-option label="数据来源于业务办理过程节点" value="1" />
          <el-option label="业务审核" value="2" />
          <el-option label="审核" value="3" />
          <el-option label="分配" value="4" />
          <el-option label="办案" value="5" />
          <el-option label="核查" value="6" />
          <el-option label="交付" value="7" />
          <el-option label="报告" value="8" />
        </el-select>
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item class="btn-wrap">
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="onReset('formInline')">重置</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column label="订单号" width="80" align="center" fixed />
      <el-table-column label="合同编号" width="100" prop="a" align="center" />
      <el-table-column label="客户名称" align="center" />
      <el-table-column label="订单金额" align="center" />
      <el-table-column label="订单状态" align="center" />
      <el-table-column label="支付方式" align="center" />
      <el-table-column label="支付时间" align="center" />
      <el-table-column label="流程节点" align="center" />
      <el-table-column label="报件日期" align="center" />
      <el-table-column label="开票状态" align="center" />
      <el-table-column label="所属顾问" align="center" />
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="text" size="small" @click="isShowRefund = true">退款</el-button>
        </template>
      </el-table-column>
      <!-- /finance/refund -->
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page="listData.start"
      :page-size="listData.length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 退款弹窗 -->
    <refund-dialog :is-show="isShowRefund" @closeDialogRefund="isShowRefund = false" />
  </div>
</template>

<script>
import refundDialog from '../modal/refund'
import { getOrderListSearchBusinessType } from 'api/financeService'

export default {
  name: 'OrderList',
  components: {
    refundDialog
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      searchAll: ['订单编号', '合同编号', '客户名称', '联系人手机号'],
      referTime: '', // 提交时间
      payTime: '', // 支付时间
      businessType: [], // 业务类型
      businessOptions: [], // 业务类型及联
      formInline: {
        searchType: '1', // 搜索条件
        searchValue: '', // 搜索内容
        beginCreateDate: '', // 开始提交时间
        endCreateDate: '', // 结束提交时间
        payType: '', // 支付方式
        orderState: '', // 订单状态
        beginPayDate: '', // 支付开始时间
        endPayDate: '', // 支付结束时间
        invoiceStatus: '', // 发票状态
        invoiceType: '', // 发票类型
        productFirstType: '', // 业务类型一级分类
        productSecondType: '', // 业务类型二级分类
        productThirdType: '', // 业务类型三级分类
        phase: '' // 流程节点
      },
      isShowRefund: false // 是否展示退款弹窗
    }
  },
  mounted() {
    // 初始化业务类型
    this.initBusinessType()
  },
  methods: {
    initBusinessType() {
      getOrderListSearchBusinessType().then(res => {
        res = res.data
        if (res.code === 10000) {
          const data = res.data
          this.getBusinessTypeData(data)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 重置事件
    onReset(formName) {
      this.$refs[formName].resetFields()
      this.$message('重置搜索项!')
    },
    // 搜索事件
    onSubmit() {
      console.log(this.formInline)
    },
    // 提交时间change
    handleChangeReferTime() {
      console.log(this.referTime)
      if (this.referTime && this.referTime.length > 0) {
        this.formInline.beginCreateDate = this.referTime[0] // 开始提交时间
        this.formInline.endCreateDate = this.referTime[1] // 结束提交时间
      } else {
        this.formInline.beginCreateDate = '' // 开始提交时间
        this.formInline.endCreateDate = '' // 结束提交时间
      }
    },
    // 支付时间change
    handleChangePayTime() {
      console.log(this.payTime)
      if (this.payTime && this.payTime.length > 0) {
        this.formInline.beginPayDate = this.payTime[0] // 开始支付时间
        this.formInline.endPayDate = this.payTime[1] // 结束支付时间
      } else {
        this.formInline.beginPayDate = '' // 开始支付时间
        this.formInline.endPayDate = '' // 结束支付时间
      }
    },
    // 业务类型change
    handleChangeBusinessType() {
      if (this.businessType.length > 0) {
        console.log(1)
        this.formInline.productFirstType = this.businessType[0] || '' // 业务类型一级分类
        this.formInline.productSecondType = this.businessType[1] || '' // 业务类型二级分类
        this.formInline.productThirdType = this.businessType[2] || '' // 业务类型三级分类
      } else {
        this.formInline.productFirstType = ''
        this.formInline.productSecondType = ''
        this.formInline.productThirdType = ''
      }
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 处理业务类型 - 及联
    getBusinessTypeData(data) {
      if (!data || data.length === 0) {
        return
      }
      // 数据结构，请查看 elementUI 的 Cascader 级联选择器
      const arr = []
      for (let i = 0; i < data.length; i++) {
        const obj = {
          label: data[i].typeName,
          value: data[i].pkSid
        }
        const objSecond = data[i].childrens
        obj.children = []
        for (let j = 0; j < objSecond.length; j++) {
          const obj2 = {
            label: objSecond[j].typeName,
            value: objSecond[j].pkSid
          }
          obj2.children = []
          const objThird = objSecond[j].products
          for (let k = 0; k < objThird.length; k++) {
            obj2.children.push({
              label: objThird[k].productName,
              value: objThird[k].pkSid
            })
          }

          obj.children.push(obj2)
        }

        arr.push(obj)
      }

      this.businessOptions = arr
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
