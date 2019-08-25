<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 选择部门 -->
      <el-form-item label="部门：">
        <el-cascader
          v-model="selectDeptId"
          :props="propsDeptId"
          :options="searchData.deptTreeList"
          :show-all-levels="false"
          clearable
          placeholder="请选择部门"
          @change="handleDeptTree"
        />
      </el-form-item>
      <!-- 选择顾问 -->
      <el-form-item label="顾问：">
        <el-select v-model="formInline.businessOwner" value="" filterable placeholder="请选择的顾问" clearable>
          <el-option
            v-for="item in userList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 选择意向业务 -->
      <el-form-item label="意向业务：">
        <el-select v-model="formInline.businessPurpose" placeholder="请选择意向业务" clearable>
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
      <!-- 选择商机进度 -->
      <el-form-item label="商机进度：">
        <el-select v-model="formInline.businessProgress" placeholder="请选择商机进度" clearable>
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
      <!-- 操作 -->
      <el-form-item>
        <el-button type="success" icon="el-icon-search" size="mini" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="onReset">重置</el-button>
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
      <el-table-column label="序号" type="index" width="50" align="center" />

      <el-table-column label="所在部门" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.deptNames }}</template>
      </el-table-column>

      <el-table-column label="负责人" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.businessOwnerName }}</template>
      </el-table-column>

      <el-table-column label="商机名称" width="200" class-name="company-name" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/resourceManagement/resourceBusinessDetail/' + scope.row.businessId}">
            <div class="name">{{ scope.row.bussinessName }}</div>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="客户名称" width="200" class-name="company-name" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/resourceManagement/resourceCustomerDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="联系人" width="130" class-name="user-info" align="center">
        <template slot-scope="scope">
          <span class="user-name"> {{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="意向业务" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>

      <el-table-column label="商机进度" width="170" align="center">
        <template slot-scope="scope">{{ scope.row.businessProgress | businessProgressFilter }}</template>
      </el-table-column>

      <el-table-column prop="createTime" label="最后跟进时间" min-width="160" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.lastFollowTime }}</template>
      </el-table-column>

      <el-table-column label="最近动态" prop="dynamic" width="180" align="center" sortable>
        <template slot-scope="scope">
          <!--时间-->
          <span v-if="scope.row.dealTime ">{{ scope.row.dealTime }}</span>
          <br>
          <!--操作人-->
          <span v-if="scope.row.dealUserName">{{ scope.row.dealUserName }}：</span>
          <!--动态名称-->
          <span v-if="scope.row.businessLogName">{{ scope.row.businessLogName | businessLogNameFilter }}</span>
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
  </div>
</template>

<script>
import { getSysUserPageList } from '@/api/customerService'
import { getLoginRoleId } from '@/utils/auth'
export default {
  inject: ['reload'],
  name: 'BusinessListTable',
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
    },
    // 最近动态 动态名称
    businessLogNameFilter(status) {
      const statusMap = {
        '1': '新建商机',
        '2': '代客下单',
        '3': '跟进商机',
        '4': '释放商机',
        '5': '转移商机',
        '6': '商机自动掉落',
        '7': '分配商机'
      }
      return statusMap[status]
    }
  },
  props: {
    listData: {
      type: Object,
      default: null
    },
    searchData: {
      type: Object,
      default: null
    },
    deptIdsVisible: {
      type: String,
      default: null
    },
    dialogVisible: {
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
      selectDeptId: [], // 部门绑定值
      roleIds: [],
      // 选择部门props设置
      propsDeptId: {
        label: 'deptName',
        value: 'pkSid',
        children: 'children',
        checkStrictly: true
      },
      // 传参
      formInline: {
        start: '1', // 第几页
        length: '10', // 每页几条
        selectType: '1', // 必传！  类签 1.有效商机 2.被释放商机 3.无效商机
        deptIds: '', // 商机拥有者分组（清单筛选使用-组ID），Array型
        businessPurpose: '-1', // 必传！  意向业务： -1.全部 1，商标服务，2：专利，3：版权，4：财税，5：其他， 6.项目、7.高新、8.商标交易 9.法律服务、10.人事社保、11.工商 12.青苹果会员 13.红苹果会员
        businessProgress: '-1', // 必传！  阶段 -1.全部 0:初步洽谈，1：是否发送函件，2：是否约谈，3：销售报价，4：合同报价，5：项目失败，6：项目收款
        businessOwner: null // 商机拥有者（清单筛选使用-顾问ID）【先写死】
      },
      userList: []
    }
  },
  watch: {
    activeTabsName: {
      handler: function(val, oldVal) {
        if (val === '1') {
          this.formInline.selectType = '1'
        } else if (val === '2') {
          this.formInline.selectType = '2'
        } else if (val === '3') {
          this.formInline.selectType = '3'
        }
      },
      deep: true,
      immediate: true
    },
    'searchData.sysUserPageList': {
      handler: function(val, oldVal) {
        this.userList = val
      },
      deep: true,
      immediate: true
    },
    // 部门ID列表
    deptIdsVisible: {
      handler: function(val, oldVal) {
        this.formInline.deptIds = val
      }
    }
  },
  created() {
    const temp = getLoginRoleId()
    this.roleIds = temp
  },
  methods: {
    // 选择部门
    handleDeptTree(val) {
      if (val.length > 0) {
        this.getSysUserPage(val.slice(val.length - 1))
        this.formInline.deptIds = val.slice(val.length - 1).toString()
      } else {
        this.userList = this.searchData.sysUserPageList
        this.formInline.businessOwner = null
      }
    },

    // 根据部门id集合获取本部门及下级部门员工集合
    getSysUserPage(val) {
      getSysUserPageList({ deptList: val }).then(response => {
        this.userList = response.data.data
        this.formInline.businessOwner = null
      }).catch((err) => {
        console.log('err', err)
      })
    },

    // 搜索
    onSubmit() {
      this.formInline.deptIds = this.deptIdsVisible
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },
    // 重置
    onReset() {
      this.formInline = {
        start: '1', // 第几页
        length: '10', // 每页几条
        selectType: '', // 必传！  类签 1.有效商机 2.被释放商机 3.无效商机
        deptIds: null, // 商机拥有者分组（清单筛选使用-组ID），Array型
        businessPurpose: '-1', // 必传！  意向业务： -1.全部 1，商标服务，2：专利，3：版权，4：财税，5：其他， 6.项目、7.高新、8.商标交易 9.法律服务、10.人事社保、11.工商 12.青苹果会员 13.红苹果会员
        businessProgress: '-1' // 必传！  阶段 -1.全部 0:初步洽谈，1：是否发送函件，2：是否约谈，3：销售报价，4：合同报价，5：项目失败，6：项目收款
        /* businessOwner: 8 // 商机拥有者（清单筛选使用-顾问ID）【先写死】*/
      }
      this.selectDeptId = []
      this.formInline.selectType = this.activeTabsName
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
          /*display: none;*/
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
