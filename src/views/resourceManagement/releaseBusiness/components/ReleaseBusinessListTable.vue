<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 顾问 -->
      <el-form-item label="顾问：">
        <el-select v-model="formInline.lastBusinessOwner" value="" clearable placeholder="请选择顾问">
          <template v-for="item in deptUsersList">
            <el-option :key="item.pkSid" :label="item.nickname" :value="item.pkSid" />
          </template>
        </el-select>
      </el-form-item>
      <!-- 意向业务 -->
      <el-form-item label="意向业务：">
        <el-select v-model="formInline.businessPurpose" value="" clearable placeholder="请选择意向业务">
          <el-option label="全部" value="-1" />
          <el-option label="商标服务" value="1" />
          <el-option label="专利" value="2" />
          <el-option label="版权" value="3" />
          <el-option label="财税" value="4" />
          <el-option label="其他" value="5" />
          <el-option label="项目" value="6" />
          <el-option label="高新" value="7" />
          <el-option label="商标交易" value="8" />
          <el-option label="法律服务" value="9" />
          <el-option label="人事社保" value="10" />
          <el-option label="工商" value="11" />
          <el-option label="青苹果会员" value="12" />
          <el-option label="红苹果会员" value="13" />
        </el-select>
      </el-form-item>
      <!-- 商机进度 -->
      <el-form-item label="商机进度：">
        <el-select v-model="formInline.businessProgress" value="" clearable placeholder="请选择商机进度">
          <el-option label="全部" value="-1" />
          <el-option label="初步洽谈" value="0" />
          <el-option label="是否发送函件" value="1" />
          <el-option label="是否约谈" value="2" />
          <el-option label="销售报价" value="3" />
          <el-option label="合同报价" value="4" />
          <el-option label="项目失败" value="5" />
          <el-option label="项目收款" value="6" />
        </el-select>
      </el-form-item>
      <!-- 释放方式 -->
      <el-form-item label="释放方式：">
        <el-select v-model="formInline.releaseType" value="" clearable placeholder="请选择释放方式">
          <el-option label="全部" value="-1" />
          <el-option label="主动掉落" value="1" />
          <el-option label="自动释放" value="2" />
        </el-select>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
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
      <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="释放人" width="150" class-name="tags" align="center" prop="lastBusinessOwnerName" />
      <el-table-column label="商机编号" width="220" class-name="company-name" align="center" prop="businessId" />
      <el-table-column label="商机名称" width="220" class-name="company-name" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/resourceManagement/resourceBusinessDetail/' + scope.row.businessId}">
            <div class="name">{{ scope.row.bussinessName }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="150" class-name="company-name" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/resourceManagement/resourceCustomerDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="150" class-name="tags" align="center" prop="userName" />
      <el-table-column label="联系电话" width="150" class-name="tags" align="center">
        <template slot-scope="scope">
          <span class="user-phone">{{ scope.row.userMobile ? scope.row.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="意向业务" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>
      <el-table-column label="商机进度" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.businessProgress | businessProgressFilter }}</template>
      </el-table-column>
      <el-table-column label="成交几率" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.dealPercent }}%</template>
      </el-table-column>
      <el-table-column label="最后跟进时间" prop="nextFollowTime" sortable width="150" align="center">
        <template slot-scope="scope">
          <span>{{ (scope.row.lastFollowTime == null || scope.row.lastFollowTime === "") ? "" : scope.row.lastFollowTime.toString().substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="释放时间" prop="nextFollowTime" sortable width="150" align="center">
        <template slot-scope="scope">
          <span>{{ (scope.row.releaseTime == null || scope.row.releaseTime === "") ? "" : scope.row.releaseTime.toString().substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" min-width="190">
        <template slot-scope="scope">
          <el-button v-if="activeTabsName === '2'" type="primary" size="mini" @click="handleReleaseBusiness(scope.row)">分配</el-button>
          <el-button v-if="activeTabsName === '2'" type="primary" size="small" @click="handleChooseOrderWay(scope.row.pkSid)">标为无效</el-button>
          <el-button v-if="activeTabsName === '3'" type="primary" size="mini" @click="handleCancelChooseOrderWay(scope.row.pkSid)">取消无效标记</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="listData.start"
      :page-size="listData.length"
      :total="listData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 分配 -->
    <distribution-business-dialog :visible.sync="releaseBusinessVisible" :item-info="itemInfo" />
  </div>
</template>

<script>
import DistributionBusinessDialog from './distributingBusinessDialog'
import { getCurrentUserDeptUsers } from 'api/raw'
import { update } from 'api/businessOpportunity'
export default {
  name: 'ReleaseBusinessListTable',
  components: { DistributionBusinessDialog },
  filters: {
    // 意向业务
    businessPurposeFilter(status) {
      const statusMap = {
        '-1': '全部',
        '1': '商标服务',
        '2': '专利',
        '3': '版权',
        '4': '财税',
        '5': '其他',
        '6': '项目',
        '7': '高薪',
        '8': '商标交易',
        '9': '法律服务',
        '10': '人事社保',
        '11': '工商'
      }
      return statusMap[status]
    },

    // 商机进度
    businessProgressFilter(status) {
      const statusMap = {
        '-1': '全部',
        '0': '初步洽谈',
        '1': '是否发送函件',
        '2': '是否约谈',
        '3': '销售报价',
        '4': '合同报价',
        '5': '项目失败',
        '6': '项目收款'
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
      formInline: {
        start: '1', // 第几页
        length: '10', // 每页几条
        businessType: '2', // 2.组内释放商机-待处理（组内商机释放列表必填条件，待处理-值为2） 3.组内释放商机-已失效（组内商机释放列表必填条件，已失效-值为3）
        businessPurpose: '-1', // 必传！  意向业务： -1.全部 1，商标服务，2：专利，3：版权，4：财税，5：其他， 6.项目、7.高新、8.商标交易 9.法律服务、10.人事社保、11.工商 12.青苹果会员 13.红苹果会员
        businessProgress: '-1', // 必传！  阶段 -1.全部 0:初步洽谈，1：是否发送函件，2：是否约谈，3：销售报价，4：合同报价，5：项目失败，6：项目收款
        releaseType: '-1', // 释放方式 -1.全部 1.主动掉落 2.自动释放（组内商机释放列表使用）
        dealType: '-1', // 必传！  成交标识 -1.全部 0.未成交（即我的商机和他人转入列表错用参数） 1.已成交商机
        releasingFlage: '-1' // 即将掉落标识  -1.全部 0.非即将掉落 1.即将掉落（除即将掉落列表值为1外，其余都为0）
      },
      deptUsersList: [], // 顾问下拉框列表
      releaseBusinessVisible: false, // 分配 弹框默认不显示
      itemInfo: null // 定义传给弹框参数
    }
  },
  watch: {
    activeTabsName: {
      handler: function(val, oldVal) {
        if (val === '2') {
          this.formInline.businessType = '2'
        } else if (val === '3') {
          this.formInline.businessType = '3'
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getCurrentUserDeptUsersList()
  },
  methods: {
    // 顾问下拉框接口
    getCurrentUserDeptUsersList() {
      getCurrentUserDeptUsers().then(response => {
        if (response.data.code === 10000) {
          this.deptUsersList = response.data.data
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },

    // 搜索
    onSubmit() {
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },

    // 重置
    onReset() {
      this.formInline = {
        start: '1', // 第几页
        length: '10', // 每页几条
        businessType: '', // 2.组内释放商机-待处理（组内商机释放列表必填条件，待处理-值为2） 3.组内释放商机-已失效（组内商机释放列表必填条件，已失效-值为3）
        businessPurpose: '-1', // 必传！  意向业务： -1.全部 1，商标服务，2：专利，3：版权，4：财税，5：其他， 6.项目、7.高新、8.商标交易 9.法律服务、10.人事社保、11.工商 12.青苹果会员 13.红苹果会员
        businessProgress: '-1', // 必传！  阶段 -1.全部 0:初步洽谈，1：是否发送函件，2：是否约谈，3：销售报价，4：合同报价，5：项目失败，6：项目收款
        releaseType: '-1', // 释放方式 -1.全部 1.主动掉落 2.自动释放（组内商机释放列表使用）
        dealType: '-1', // 必传！  成交标识 -1.全部 0.未成交（即我的商机和他人转入列表错用参数） 1.已成交商机
        releasingFlage: '-1' // 即将掉落标识  -1.全部 0.非即将掉落 1.即将掉落（除即将掉落列表值为1外，其余都为0）
      }
      this.formInline.businessType = this.activeTabsName
      this.$message('重置搜索项!')
    },

    // 每页条数
    handleSizeChange(val) {
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    // 当前页
    handleCurrentChange(val) {
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    },

    // 分配
    handleReleaseBusiness(val) {
      this.releaseBusinessVisible = true
      this.itemInfo = val
    },

    // 标为无效
    handleChooseOrderWay(val) {
      update({ pkSid: val, businessType: 3 }).then(response => {
        if (response.data.code === 10000) {
          this.$message.success('操作成功')
          this.$emit('fetchData', this.formInline)
        } else if (response.data.code === 500) {
          this.$message.warning(response.data.message)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },

    // 取消无效标记
    handleCancelChooseOrderWay(val) {
      update({ pkSid: val, businessType: 2 }).then(response => {
        if (response.data.code === 10000) {
          this.$message.success('操作成功')
          this.$emit('fetchData', this.formInline)
        } else if (response.data.code === 500) {
          this.$message.warning(response.data.message)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
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
        &.search-con, &.follow-time, &.created-time{
          display: none;
        }
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
      .company-name{
        div.name{
          display: inline-block;
          position: relative;
          max-width: 180px;
          text-overflow:ellipsis;
          overflow:hidden;
          white-space:nowrap;
          vertical-align: top;
          font-style: normal;
          padding-right: 25px;
          box-sizing: content-box;
          color: #238def;
          span{
            position: absolute;
            top: 1px;
            right: 0;
          }
        }
      }
      .user-info{
        .user-name{
          display: block;
        }
        .user-phone{
          display: inline-block;
        }
        .svg-icon{
          margin-left: 5px;
        }
      }
      .dynamic{
        span{
          display: block;
        }
      }
      .tags{
        .el-tag{
          margin-right: 5px;
          height: 28px;
          line-height: 26px;
          padding: 0 6px;
        }
        .el-tag:last-child{
          margin-right: 0;
        }
      }
      .operation{
        .el-button{
          font-size: 14px;
        }
      }
    }
    .el-pagination{
      text-align: right;
      margin-top: 20px;
    }
  }
  .el-popover.el-popper.remark-popover{
    p{
      margin: 0;
      max-width: 140px;
      &.remark-tit{
        padding: 0 12px 10px 12px;
        border-bottom: 1px solid #ebebeb;
        font-weight: bold;
      }
      &.remark-con{
        padding: 12px 12px 0 12px;
        line-height: 1.5;
      }
    }
  }
</style>
