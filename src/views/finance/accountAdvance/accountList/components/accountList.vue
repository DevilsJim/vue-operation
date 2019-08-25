<!--财务管理-进账管理-进账列表组件-->
<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!--客户名称-->
      <el-form-item label="客户名称：">
        <el-input v-model="formInline.customerName" placeholder="请输入客户名称" clearable />
      </el-form-item>
      <!--汇入途径-->
      <el-form-item label="汇入途径：">
        <el-select v-model="formInline.importRoute" placeholder="请选择汇入途径" clearable>
          <template v-for="item in importRoutList">
            <el-option :key="item.importRouteId" :label="item.importRoute" :value="item.importRoute" />
          </template>
        </el-select>
      </el-form-item>
      <!-- 导入时间 -->
      <el-form-item label="导入时间：" class="created-time">
        <el-date-picker
          v-model="importTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleImportTime"
        />
      </el-form-item>
      <!--到账时间-->
      <el-form-item label="到账时间：" class="created-time">
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
      <!-- 操作 -->
      <el-form-item class="btn-wrap">
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
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
    >
      <el-table-column label="序号" type="index" width="60" align="center" fixed />
      <el-table-column label="流水号" prop="streamId" align="center" />
      <el-table-column label="金额" prop="money" align="center" />
      <el-table-column label="客户名称" prop="customerName" align="center" />
      <el-table-column label="客户开户行" prop="customerBank" align="center" />
      <el-table-column label="开户行账号" prop="customerAccount" align="center" />
      <el-table-column label="汇入途径" prop="importRoute" align="center" />
      <el-table-column label="导入时间" prop="createTime" sortable align="center" />
      <el-table-column label="到账时间" prop="remitTime" sortable align="center" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.matchStatus | matchStatusFiler }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="listData.currentPageNumber"
      :page-size="listData.pageSize"
      :total="listData.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getImportRoutList, deleteByPksid } from 'api/financeService'
export default {
  inject: ['reload'],
  name: 'TableList',
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
      importTime: null, // 导入时间
      paymentTime: null, // 到账时间
      // 搜索条件传参
      formInline: {
        start: '1', // 第几页 [传值的时候传这个]
        length: '10', // 每页几条 [传值的时候传这个]
        matchStatus: null, // 匹配状态1：未匹配2：已匹配’
        customerName: '', // 账号名称
        importRoute: '', // 汇入途径
        createStartTime: '', // 导入时间开始时间
        createEndTime: '', // 导入时间结束时间
        remitStartTime: '', // 到账时间开始时间
        remitEndTime: '' // 到账时间结束时间
      },
      importRoutList: [] // 汇入途径接口
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
  created() {
    this.getImportRoutList()
  },
  methods: {
    // 汇入途径下拉框 数据
    getImportRoutList() {
      getImportRoutList().then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.importRoutList = response.data.data
        }
      })
    },

    // 导入时间
    handleImportTime(val) {
      if (val !== null) {
        this.$set(this.formInline, 'createStartTime', val[0])
        this.$set(this.formInline, 'createEndTime', val[1])
      } else {
        this.$set(this.formInline, 'createStartTime', '')
        this.$set(this.formInline, 'createEndTime', '')
      }
    },

    // 到账时间
    handlePaymentTime(val) {
      if (val !== null) {
        this.$set(this.formInline, 'remitStartTime', val[0])
        this.$set(this.formInline, 'remitEndTime', val[1])
      } else {
        this.$set(this.formInline, 'remitStartTime', '')
        this.$set(this.formInline, 'remitEndTime', '')
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
        customerName: '', // 账号名称
        importRoute: '', // 汇入途径
        createStartTime: '', // 导入时间开始时间
        createEndTime: '', // 导入时间结束时间
        remitStartTime: '', // 到账时间开始时间
        remitEndTime: '' // 到账时间结束时间
      }
      this.importTime = null // 导入时间
      this.paymentTime = null // 到账时间
      if (this.activeTabsName === '0') {
        this.formInline.matchStatus = null
      } else {
        this.formInline.matchStatus = this.activeTabsName
      }
      this.$message('重置搜索项!')
    },
    // 删除
    handleDelete(item) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteByPksid(item.pkSid).then(response => {
          console.log(response.data.code)
          if (response.data.code === 10000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.reload()
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          }
        }).catch((err) => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 每页条数
    handleSizeChange(val) {
      this.$set(this.formInline, 'length', val)
      console.log(`每页 ${val} 条`)
      this.$emit('fetchData', this.formInline)
    },
    // 当前页
    handleCurrentChange(val) {
      this.$set(this.formInline, 'start', val)
      console.log(`当前页: ${val}`)
      this.$emit('fetchData', this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-list-table{
    .el-form{
      .el-date-editor {
        width: 410px;
        /deep/ .el-range-input{ // 加 /deep/ 或 >>> 是为了给 element 元素添加自定义样式
          width: 80%;
        }
      }
      .el-button{
        /deep/ span{
          font-size: 15px;
        }
      }
      .el-form-item{
        &.show{
          display: inline-block;
        }
      }
    }
    .el-table{
      /deep/ td{
        padding: 6px 0;
      }
      .svg-icon{
        cursor: pointer;
        display: inline-block;
        font-size: 18px;
      }
    }
    .el-pagination{
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
