<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-container direction="vertical">
      <p style="margin-bottom: 20px; border-bottom: 1px solid #e6ebf5;">筛选条件</p>
      <el-form :inline="true" :model="formInline" size="small">
        <!-- 组织名称 -->
        <el-form-item prop="deptName" label-width="90px">
          <el-input v-model="formInline.deptName" placeholder="请输入组织名称" />
        </el-form-item>
        <!-- 负责人 -->
        <el-form-item>
          <el-select v-model="formInline.deptLeader" clearable placeholder="请选择负责人">
            <el-option
              v-for="(item, index) in deptLeaderOptions"
              :key="index"
              :label="item.leaderName"
              :value="item.deptLeaderId"
            />
          </el-select>
        </el-form-item>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
          <el-button type="success" size="small" @click="addDepartment({})">添加部门</el-button>
        </el-form-item>
      </el-form>
    </el-container>

    <!-- 列表 -->
    <el-container direction="vertical">
      <p>数据列表</p>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="pkSid"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="组织名称" width="300" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.deptName }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? '正常' : '隐藏' }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.leaderName }}
          </template>
        </el-table-column>
        <el-table-column label="上级组织" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.upperDeptName }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="180">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="operation" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="editDepartment(scope.row)">编辑</el-button>
            <el-button size="mini" plain @click="deleteDepartment(scope.row.pkSid)">删除</el-button>
            <el-button type="primary" size="mini" @click="handleDepartDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <!-- 创建客户 -->
    <edit-department-dialog :visible.sync="editDepartmentVisible" :dept-list.sync="deptList" :edit-data-visible.sync="editData" :leader-data-visible.sync="deptLeaderOptions" :add-or-edit-visible.sync="addOrEdit" />

    <!-- 释放到公海 -->
    <!--    <delete-department-dialog :visible.sync="deleteDepartmentVisible" :deletePksidVisible.sync="deletePksid"></delete-department-dialog>-->
  </div>
</template>

<script>
import EditDepartmentDialog from './EditDepartmentDialog'
// import DeleteDepartmentDialog from './DeleteDepartmentDialog'
import { deleteDept } from '../../../../api/raw'

export default {
  inject: ['reload'],
  name: 'CustomerListTable',
  components: {
    EditDepartmentDialog
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
      list: [],
      deptLeaderOptions: [],
      deptList: [],
      editData: {},
      deletePksid: 0,
      searchCriteria: null, // 搜索条件
      searchCon: '', // 搜索条件对应的输入框
      searchPlaceholder: null, // 搜索条件对应的输入框的输入内容信息提示
      isSearchConShow: false,
      formInline: {},
      editDepartmentVisible: false,
      addOrEdit: 'add'
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.list = val.list
        this.tableData = val.list
        this.deptLeaderOptions = []
        val.list.map((item, index) => {
          this.deptLeaderOptions.push({ leaderName: item.leaderName, deptLeaderId: item.deptLeaderId })
          this.deptList.push({ deptName: item.deptName, pkSid: item.pkSid })
          if (item.children) {
            item.children.map((items, indexs) => {
              this.deptLeaderOptions.push({ leaderName: items.leaderName, deptLeaderId: items.deptLeaderId })
              this.deptList.push({ deptName: items.deptName, pkSid: items.pkSid })
              if (items.children) {
                items.children.map((itemsc, indexsc) => {
                  if (itemsc.leaderName) {
                    this.deptLeaderOptions.push({
                      leaderName: itemsc.leaderName,
                      deptLeaderId: itemsc.deptLeaderId
                    })
                  }
                  this.deptList.push({ deptName: itemsc.deptName, pkSid: itemsc.pkSid })
                })
              }
            })
          }
        })
        const obj = {}
        this.deptLeaderOptions = this.deptLeaderOptions.reduce((cur, next) => {
          obj[next.deptLeaderId] ? '' : obj[next.deptLeaderId] = true && cur.push(next)
          return cur
        }, [])
        this.deptList = this.deptList.reduce((cur, next) => {
          obj[next.pkSid] ? '' : obj[next.pkSid] = true && cur.push(next)
          return cur
        }, [])
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
    },
    // 监听搜索条件
    searchCriteria: {
      handler: function(val, oldVal) {
        if (val !== null) {
          this.isSearchConShow = true
          this.searchPlaceholder = '请输入' + this.searchCriteriaTxt[val]
        } else {
          this.isSearchConShow = false
          this.searchPlaceholder = ''
        }
        this.searchCon = ''
        this.formInline.companyName = null
        this.formInline.latentNickName = null
        this.formInline.latentUserMobile = null
        this.formInline.latentTelephone = null
      },
      deep: true,
      immediate: true
    },
    // 监听搜索条件对应的输入框
    searchCon: {
      handler: function(val, oldVal) {
        if (this.searchCriteria !== null) {
          this.formInline[this.searchCriteria] = val
          console.log(this.formInline)
        }
      },
      deep: true,
      immediate: true
    },
    followUpVisible: function(newVal, oldVal) {
      if (!newVal) {
        this.$emit('fetchData', this.formInline)
      }
    }
  },
  methods: {

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
      this.searchCriteria = null
      this.followTime = null
      this.createdTime = null
      this.$message('重置搜索项!')
    },

    handleDepartDetail(val) {
      console.log(val)
      const urlData = '?upperDeptName=' + val.upperDeptName + '&leaderName=' + val.leaderName + '&status=' + val.status
      this.$router.push({ path: '/rightsManagement/departmentDetail' + urlData })
    },
    addDepartment(val) {
      this.editDepartmentVisible = true
      this.editData = val
      this.addOrEdit = 'add'
    },
    editDepartment(val) {
      this.editDepartmentVisible = true
      this.editData = val
      this.addOrEdit = 'edit'
    },
    deleteDepartment(val) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDept({ pkSid: val }).then(response => {
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
