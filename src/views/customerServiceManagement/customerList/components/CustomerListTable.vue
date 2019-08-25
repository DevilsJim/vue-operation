<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 部门 -->
      <el-form-item>
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
      <!-- 顾问 -->
      <el-form-item>
        <el-select v-model="formInline.currentUserId" value="" filterable placeholder="请选择的顾问" clearable>
          <el-option
            v-for="item in userList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 客户池 -->
      <template v-if="formInline.needApprove !== 2">
        <el-form-item>
          <el-select v-model="formInline.contactType" value="" clearable placeholder="请选择客户池">
            <el-option label="私海" value="1" />
            <el-option label="公海" value="0" />
          </el-select>
        </el-form-item>
      </template>
      <!-- 客户标签 -->
      <el-form-item>
        <el-select v-model="formInline.companySign" value="" clearable placeholder="请选择客户标签">
          <el-option label="新客户" value="0" />
          <el-option label="渠道用户" value="1" />
        </el-select>
      </el-form-item>
      <!-- 意向业务 -->
      <el-form-item>
        <el-select v-model="formInline.businessPurpose" value="" clearable placeholder="请选择意向业务">
          <el-option label="商标服务" value="1" />
          <el-option label="专利" value="2" />
          <el-option label="版权" value="3" />
          <el-option label="财税" value="4" />
          <el-option label="其他" value="5" />
        </el-select>
      </el-form-item>
      <!-- 是否需审批 -->
      <template v-if="formInline.needApprove !== '2'">
        <el-form-item>
          <el-select v-model="formInline.needApprove" value="" placeholder="是否需审批">
            <el-option label="全部客户" :value="'-1'" />
            <el-option label="不需审批" :value="'0'" />
            <el-option label="待审批" :value="'1'" />
          </el-select>
        </el-form-item>
      </template>
      <!-- 跟进时间 -->
      <el-form-item class="created-time">
        <el-date-picker
          v-model="createdTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始跟进时间"
          end-placeholder="结束跟进时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleCreatedTime"
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
      <el-table-column label="序号" type="index" width="60" align="center" />
      <template v-if="formInline.needApprove !== 2 ">
        <el-table-column label="跟进部门" width="195" prop="sysGroupoName" class-name="user-info" header-align="center" />
        <!--<el-table-column label="跟进人" width="195" prop="lastDynamicLogOperator" class-name="user-info" header-align="center" />-->
        <el-table-column label="跟进人" width="195" prop="sysUserName" class-name="user-info" header-align="center" />
      </template>
      <el-table-column label="客户名称" width="220" class-name="company-name" header-align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/customerServiceManagement/customerDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="联系人信息" width="195" class-name="user-info" header-align="center">
        <template slot-scope="scope">
          <span class="user-name">姓名: {{ scope.row.latentNickName }}</span>
          <span class="user-phone">电话: {{ scope.row.latentUserMobile ? scope.row.latentUserMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后跟进时间" prop="lastDynamicLogTime" sortable width="130" align="center" />
      <el-table-column label="客户标签" width="190" class-name="tags" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.companySign !== 2" size="medium">{{ scope.row.companySign | companySignFilter }}</el-tag>
          <el-tag v-if="scope.row.intentionLevel !== 0" size="medium">{{ scope.row.intentionLevel | intentionLevelFilter }}</el-tag>
          <el-tag v-if="scope.row.worthLevel !== 0" size="medium">{{ scope.row.worthLevel | worthLevelFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="意向业务" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>
      <el-table-column label="来源" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>
      <el-table-column label="最新动态" min-width="160" class-name="dynamic">
        <template slot-scope="scope">
          <span>{{ scope.row.lastDynamicLogOperator }}：{{ scope.row.lastDynamicLogName | lastDynamicLogNameFilter }}</span>
          <span>{{ scope.row.lastDynamicLogTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="createTime" sortable width="130" align="center">
        <template slot-scope="scope">
          <span>{{ (scope.row.nextFollowTime == null || scope.row.nextFollowTime === "") ? "" : scope.row.nextFollowTime.toString().substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            <router-link :to="{path:'/customerServiceManagement/customerDetail/' + scope.row.companyId}">
              <div class="name">查看</div>
            </router-link>
          </el-button>
          <el-button v-if="scope.row.contactType === 1 && roleIds.indexOf(11201) !== -1" type="primary" size="small" @click="handleChangeCustomer(scope.row.companyId)">变更</el-button>
          <el-button v-else-if="scope.row.contactType === 0 && roleIds.indexOf(11201) !== -1" type="primary" size="small" @click="handleAssignAdviser(scope.row.companyId)">分配</el-button>
          <el-button v-if="scope.row.needApprove === 1" type="primary" size="small" @click="handleAuditCustomer(scope.row.companyId)">审核</el-button>
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
  name: 'CustomerListTable',
  filters: {
    // 客户标签
    companySignFilter(status) {
      const statusMap = {
        0: '新客户',
        1: '渠道用户'
      }
      return statusMap[status]
    },
    // 意向级别
    intentionLevelFilter(status) {
      const statusMap = {
        0: '',
        1: '无意向',
        2: '有意向',
        3: '高意向'
      }
      return statusMap[status]
    },
    // 价值级别
    worthLevelFilter(status) {
      const statusMap = {
        0: '',
        1: '低价值',
        2: '中价值',
        3: '高价值'
      }
      return statusMap[status]
    },
    // 会员类型
    memberLevelFilter(status) {
      const statusMap = {
        0: '红苹果',
        1: '青苹果'
      }
      return statusMap[status]
    },
    // 意向业务
    businessPurposeFilter(status) {
      const statusMap = {
        1: '商标服务',
        2: '专利',
        3: '版权',
        4: '财税',
        5: '其他'
      }
      return statusMap[status]
    },
    // 客户类型
    companyTypeFilter(status) {
      const statusMap = {
        0: '个人',
        1: '公司',
        2: '个体工商户'
      }
      return statusMap[status]
    },
    // 客户类型
    lastDynamicLogNameFilter(status) {
      const statusMap = {
        1: '跟进记录',
        2: '释放到公海',
        3: '转移客户',
        4: '捡入私海',
        5: '分配客户',
        6: '变更客户',
        7: '创建客户'
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
    dialogVisible: {
      type: Object,
      default: null
    },
    deptIdsVisible: {
      type: String,
      default: null
    },
    needApprove: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      createdTime: null, // 开始跟进时间
      selectDeptId: [], // 部门绑定值
      roleIds: [],
      propsDeptId: {
        label: 'deptName',
        value: 'pkSid',
        children: 'children',
        checkStrictly: true
      }, // 选择部门props设置
      formInline: { // 传参字段
        start: '1',
        length: '10',
        deleteStatus: '0',
        currentUserId: null,
        deptIds: '',
        contactType: '1', // 	客户池 0:公海池，1:私海池
        needApprove: '-1'
      }, // 搜索条件参数
      userList: []
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.list = val.list
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
    deptIdsVisible: {
      handler: function(val, oldVal) {
        this.formInline.deptIds = val
      }
    },
    needApprove: {
      handler: function(val, oldVal) {
        this.formInline.needApprove = val + ''
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
        // console.log('formInline.deptIds', this.formInline.deptIds)
      } else {
        this.userList = this.searchData.sysUserPageList
        this.formInline.currentUserId = null
      }
    },

    // 根据部门id集合获取本部门及下级部门员工集合
    getSysUserPage(val) {
      getSysUserPageList({ deptList: val }).then(response => {
        this.userList = response.data.data
        this.formInline.currentUserId = null
      }).catch((err) => {
        console.log('err', err)
      })
    },

    /**
     * @desc 选择跟进时间
     * @author jinlijing
     */
    handleCreatedTime(val) {
      if (val !== null) {
        this.$set(this.formInline, 'startCreatedTime', val[0])
        this.$set(this.formInline, 'endCreatedTime', val[1])
      } else {
        this.$set(this.formInline, 'startCreatedTime', '')
        this.$set(this.formInline, 'endCreatedTime', '')
      }
    },

    /**
     * @desc 搜索
     * @author jinlijing
     */
    onSubmit() {
      this.formInline.deptIds = this.deptIdsVisible
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },

    /**
     * @desc 重置
     * @author jinlijing
     */
    onReset() {
      if (this.needApprove !== '2') {
        this.formInline = {
          start: '1', // 第几页
          length: '10', // 每页几条
          deleteStatus: '0', // 是否删除
          contactType: '1',
          needApprove: '-1',
          deptIds: this.deptIdsVisible
        }
      } else {
        this.formInline = {
          start: '1', // 第几页
          length: '10', // 每页几条
          deleteStatus: '0', // 是否删除
          contactType: '1',
          deptIds: this.deptIdsVisible,
          needApprove: '2'
        }
      }
      this.selectDeptId = []
      this.createdTime = null
      this.$message('重置搜索项!')
    },

    /**
     * @desc 每页条数 listData.list.length
     * @author jinlijing
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    /**
     * @desc 当前页 listData.list.start
     * @author jinlijing
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    },

    // 分配顾问
    handleAssignAdviser(val) {
      this.dialogVisible.assignAdviserVisible = true
      this.$emit('getCurCompanyId', val)
    },

    // 变更客户
    handleChangeCustomer(val) {
      this.dialogVisible.changeCustomerVisible = true
      this.$emit('getCurCompanyId', val)
    },

    // 审核无效客户
    handleAuditCustomer(val) {
      this.dialogVisible.auditCustomerVisible = true
      this.$emit('getCurCompanyId', val)
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
      /* &.search-con, &.follow-time, &.created-time{
        display: none;
      } */
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
