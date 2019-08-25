<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 部门 -->
      <el-form-item>
        <el-select v-model="formInline.dept" value="" filterable placeholder="请选择的部门" clearable @change="handleDeptTree(formInline.dept)">
          <el-option
            v-for="item in searchData.deptTreeList"
            :key="item.pkSid"
            :label="item.deptName"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 顾问 -->
      <el-form-item>
        <el-select v-model="formInline.sysUserId" value="" filterable placeholder="请选择的顾问" clearable>
          <el-option
            v-for="item in userList"
            :key="item.pkSid"
            :label="item.userName"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 选择线索状态 -->
      <el-form-item>
        <el-select v-model="formInline.threadStatus" clearable placeholder="请选择线索状态">
          <el-option label="可用" value="11" />
          <el-option label="已转化" value="5" />
          <el-option label="已关闭" value="2" />
        </el-select>
      </el-form-item>
      <!-- 选择线索来源 -->
      <el-form-item>
        <el-select v-model="formInline.threadSource" clearable placeholder="请选择线索来源">
          <el-option label="顾问录入" value="0" />
          <el-option label="第三方数据" value="1" />
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
        <template slot-scope="scope">{{ deptIdToName(scope.row.dept) }}</template>
      </el-table-column>

      <el-table-column label="负责人" width="120" align="center">
        <template slot-scope="scope">{{ userIdToName(scope.row.sysUserId) }}</template>
      </el-table-column>

      <el-table-column label="公司名称" width="200" class-name="company-name" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/resourceManagement/cluesDetail/' + scope.row.threadId}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="当前状态" width="90" align="center">
        <template slot-scope="scope">{{ scope.row.threadStatusName }}</template>
      </el-table-column>

      <el-table-column label="联系人" width="130" class-name="user-info" align="center">
        <template slot-scope="scope">
          <span class="user-name"> {{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公司地址" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.companyAddress }}</template>
      </el-table-column>

      <el-table-column label="线索备注" width="170" align="center">
        <template slot-scope="scope">{{ scope.row.threadRemark }}</template>
      </el-table-column>

      <el-table-column label="初始来源" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.threadSource }}</template>
      </el-table-column>

      <el-table-column label="动态记录" prop="dynamicInfo" width="160" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.dynamicInfo }}</template>
      </el-table-column>

      <el-table-column prop="createTime" label="收录时间" min-width="160" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
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
  </div>
</template>

<script>

import { getSysUserPageList } from '@/api/customerService'

export default {
  inject: ['reload'],
  name: 'CluesListTable',
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
    activeTabsName: {
      type: String,
      default: null
    },
    deptArray: {
      type: Array,
      default: null
    },
    counselorArray: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      propsDeptId: {
        label: 'deptName',
        value: 'pkSid',
        children: 'children',
        checkStrictly: true
      }, // 选择部门props设置
      formInline: { // 传参字段
        start: '1',
        length: '10',
        dept: null,
        sysUserId: null
      }, // 搜索条件参数
      sourceId: 0,
      cluesData: {},
      createdCluesVisible: false,
      cluesToCustomerVisible: false,
      closeCluesVisible: false,
      cluesId: '',
      selectDeptId: [], // 部门绑定值
      userList: [],
      endNodeDeptIds: []
    }
  },
  watch: {
    listData: {
      handler: function(val) {
        this.list = val.list
      },
      deep: true,
      immediate: true
    },
    'searchData.sysUserPageList': {
      handler: function(val) {
        this.userList = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 选择部门
    handleDeptTree(val) {
      if (val) {
        this.getSysUserPage(val)
        this.formInline.dept = val
      } else {
        this.userList = this.searchData.sysUserPageList
        this.formInline.sysUserId = null
      }
    },

    // 根据部门id集合获取本部门及下级部门员工集合
    getSysUserPage(val) {
      getSysUserPageList({ deptList: [val] }).then(response => {
        this.userList = response.data.data
        this.formInline.sysUserId = null
      }).catch((err) => {
        console.log('err', err)
      })
    },

    deptIdToName(deptId) {
      if (this.deptArray[deptId]) {
        return this.deptArray[deptId].deptName
      }
    },

    userIdToName(userId) {
      if (this.counselorArray[userId]) {
        return this.counselorArray[userId].userName
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
      this.formInline = {
        start: '1', // 第几页
        length: '10', // 每页几条
        dept: null,
        sysUserId: null
      }
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
