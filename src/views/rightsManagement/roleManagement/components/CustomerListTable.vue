<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-container direction="vertical">
      <p style="margin-bottom: 20px; border-bottom: 1px solid #e6ebf5;">筛选条件</p>
      <el-form :inline="true" :model="formInline" size="small">
        <!-- 角色 -->
        <el-form-item>
          <el-select v-model="formInline.name" value="" filterable clearable placeholder="请选择角色">
            <el-option
              v-for="item in listData.list"
              :key="item.pkSid"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item>
          <el-select v-model="formInline.status" value="" clearable placeholder="请选择状态">
            <el-option label="启用" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
          <el-button type="success" icon="el-icon-plus" size="small" @click="addRole">新增角色</el-button>
        </el-form-item>
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
      <el-table-column label="编号" type="index" width="80" align="center" />
      <el-table-column label="角色名称" align="center" prop="name" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createDate" />
      <el-table-column label="创建人" align="center" prop="createName" />
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" min-width="180" max-width="250">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="editRole(scope.row)">编辑</el-button>
          <el-button size="mini" @click="deleteRole(scope.row.pkSid)">删除</el-button>
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

    <!-- 新增修改角色 -->
    <add-edit-role-dialog :visible.sync="addEditRoleVisible" :role-data="roleData" :menu-list="menuList" />
  </div>
</template>

<script>
import { getSysMenuTree, delSysRole } from '@/api/raw'
import AddEditRoleDialog from './AddEditRoleDialog'

export default {
  inject: ['reload'],
  name: 'CustomerListTable',
  filters: {
    // 状态
    statusFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  components: {
    AddEditRoleDialog
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [],
      deptOptions: [],
      roleOptions: [],
      deptList: [],
      formInline: {
        start: '1',
        length: '10'
      },
      roleList: [],
      menuList: [],
      roleData: {
        addEditData: {},
        addOrEdit: 'add'
      },
      addEditRoleVisible: false
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        // console.log(val)
      },
      deep: true,
      immediate: true
    },
    formInline: {
      handler: function(val, oldVal) {
        // console.log('formInline', val)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getMenuTree()
  },
  methods: {
    // 获取菜单列表
    getMenuTree() {
      getSysMenuTree().then(response => {
        if (response.data.code === 10000) {
          this.menuList = response.data.data
        }
      }).catch((err) => {
        console.log(err)
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

    addRole() {
      this.addEditRoleVisible = true
      this.roleData.addEditData = {}
      this.roleData.addOrEdit = 'add'
    },

    editRole(val) {
      this.addEditRoleVisible = true
      this.roleData.addEditData = val
      this.roleData.addOrEdit = 'edit'
    },

    deleteRole(val) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSysRole(val).then(response => {
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
