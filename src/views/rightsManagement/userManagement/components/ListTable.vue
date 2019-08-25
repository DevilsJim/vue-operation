<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-container direction="vertical">
      <p style="margin-bottom: 20px; border-bottom: 1px solid #e6ebf5;">筛选条件</p>
      <el-form :inline="true" :model="formInline" size="small">
        <!-- 用户名 -->
        <el-form-item prop="passport">
          <el-input v-model="formInline.passport" placeholder="请输入用户名" />
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item prop="realname">
          <el-input v-model="formInline.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <!-- 水果名 -->
        <el-form-item prop="nickname">
          <el-input v-model="formInline.nickname" placeholder="请输入水果名" />
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item prop="tel">
          <el-input v-model="formInline.tel" placeholder="请输入手机号" />
        </el-form-item>
        <!-- 部门 -->
        <el-form-item>
          <el-select v-model="formInline.deptId" value="" clearable placeholder="请选择部门" filterable>
            <el-option
              v-for="item in userData.deptList"
              :key="item.pkSid"
              :label="item.deptName"
              :value="item.pkSid"
            />
          </el-select>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item>
          <el-select v-model="formInline.roleId" value="" clearable placeholder="请选择角色" filterable>
            <el-option
              v-for="item in userData.roleList"
              :key="item.pkSid"
              :label="item.name"
              :value="item.pkSid"
            />
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <div style="float: right">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
            <el-button type="success" icon="el-icon-plus" size="small" @click="addUser()">新增用户</el-button>
            <el-button v-loading="downloadLoading" type="primary" icon="el-icon-download" size="small" @click="download()">导出</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-container>

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
      <el-table-column label="序号" type="index" align="center" width="60" />
      <el-table-column label="用户名" align="center" prop="passport" min-width="120" max-width="150" />
      <el-table-column label="姓名" align="center" prop="realname" min-width="100" max-width="150" />
      <el-table-column label="水果名" align="center" prop="nickname" min-width="100" max-width="150" />
      <el-table-column label="性别" align="center" min-width="60">
        <template slot-scope="scope">{{ sexMap[scope.row.sex] }}</template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="tel" min-width="110" />
      <el-table-column label="部门" align="center" prop="deptNames" min-width="130" max-width="150" />
      <el-table-column label="角色" header-align="center" prop="roleNames" min-width="200" />
      <el-table-column label="状态" align="center" min-width="60" max-width="100">
        <template slot-scope="scope">{{ scope.row.offWorkFlag | statusFilter }}
          <!--<el-switch
            v-model="scope.row.offWorkFlag"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="在职"
            @change="offWorkFlagStatus(scope.row)"
          />-->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" width="260">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="editUser(scope.row.pkSid)">编辑</el-button>
          <el-button type="primary" size="mini" @click="userDetail(scope.row.pkSid)">查看</el-button>
          <el-button type="warning" size="mini" @click="resetPassword(scope.row.pkSid)">重置密码</el-button>
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

    <!-- 创建客户 -->
    <add-edit-user-dialog :add-edit-user-visible.sync="addEditUserVisible" :user-data="userData" />
  </div>
</template>

<script>
import { getDeptList, getRoleList, resetUserPassword, updateOffWorkFlag, exportSysUserList } from '@/api/raw'
import { getSysUserPageListById } from '@/api/customerService'
import addEditUserDialog from './addEditUserDialog'

export default {
  inject: ['reload'],
  name: 'ListTable',
  filters: {
    // 状态
    statusFilter(status) {
      const statusMap = {
        1: '在职',
        2: '离职'
      }
      return statusMap[status]
    }
  },
  components: {
    addEditUserDialog
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
        start: '1',
        length: '10'
      },
      downloadLoading: false,
      sexMap: {
        1: '男',
        2: '女'
      },
      addEditUserVisible: false,
      userData: {
        roleList: [],
        deptList: [],
        addOrEdit: null,
        userId: null
      }
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.list = val.list
        this.tableData = val.list
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getRole()
    this.getDept()
  },
  methods: {
    // 获取部门列表
    getDept() {
      getDeptList({}).then(response => {
        if (response.data.code === 10000) {
          this.$set(this.userData, 'deptList', response.data.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 获取角色列表
    getRole() {
      getRoleList({ start: 1, length: 1000, status: 1 }).then(response => {
        if (response.data.code === 10000) {
          this.$set(this.userData, 'roleList', response.data.data.list)
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    offWorkFlagStatus(val) {
      // 查询名下是否有客户
      getSysUserPageListById({ sysUserId: val.pkSid }).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length > 0) {
            this.$message.error('该账号下存在客户，无法操作！')
            this.reload()
            return false
          }
          updateOffWorkFlag({ pkSid: val.pkSid, offWorkFlag: val.offWorkFlag }).then(response => {
            if (response.data.code === 10000) {
              this.$message.success('设置成功')
            }
          }).catch((err) => {
            console.log('err', err)
          })
        }
      })
    },

    // 导出
    download() {
      this.downloadLoading = true
      exportSysUserList(this.formInline).then(res => {
        var fileDownload = require('js-file-download')
        fileDownload(res.data, '用户列表.xls')
        this.downloadLoading = false
      })
    },

    /**
     * @desc 每页条数 listData.list.length
     * @author jinlijing
     */
    handleSizeChange(val) {
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    /**
     * @desc 当前页 listData.list.start
     * @author jinlijing
     */
    handleCurrentChange(val) {
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    },

    /**
     * @desc 搜索
     * @author jinlijing
     */
    onSubmit() {
      this.$message.success('搜索成功!')
      this.formInline.start = 1
      this.formInline.length = 10
      this.$emit('fetchData', this.formInline)
    },

    /**
     * @desc 重置
     * @author jinlijing
     */
    onReset() {
      this.formInline = {
        start: '1',
        length: '10',
        currentUserId: '133',
        deleteStatus: '0'
      }
      this.$message('重置搜索项!')
    },

    // 新增用户
    addUser() {
      this.addEditUserVisible = true
      this.userData.addOrEdit = 'add'
    },

    // 编辑用户
    editUser(val) {
      this.addEditUserVisible = true
      this.userData = Object.assign({}, this.userData, {
        addOrEdit: 'edit',
        userId: val
      })
    },

    // 查看详情
    userDetail(val) {
      this.addEditUserVisible = true
      this.userData = Object.assign({}, this.userData, {
        addOrEdit: 'detail',
        userId: val
      })
    },

    // 重置密码
    resetPassword(val) {
      this.$confirm('您确定要将密码恢复初始值？初始密码为：000000', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUserPassword(val).then(response => {
          if (response.data.code === 10000) {
            this.$message({
              type: 'success',
              message: '重置成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '重置失败'
            })
          }
        }).catch((err) => {
          console.log('err', err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },

    // 对象去重
    objReduce(_object, _index) {
      let arr = []
      const obj = {}
      arr = _object.reduce((cur, next) => {
        obj[next._index] ? '' : obj[next._index] = true && cur.push(next)
        return cur
      }, [])
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-list-table{
    .el-container{
      border: 1px solid #dfe6ec;
      margin-bottom: 30px;
      p{
        background: #f5f7fa;
        margin: 0;
        padding: 12px 10px;
        font-size: 18px;
      }
    }
    .el-form{
      padding: 0 15px;
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
