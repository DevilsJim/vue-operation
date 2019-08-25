<template>
  <div class="customer-list-table">
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
        <el-table-column label="菜单名称" width="300" align="center" prop="name" />
        <el-table-column label="请求地址" width="180" align="center" prop="url" />
        <el-table-column label="类目" width="180" align="center">
          <template slot-scope="scope">
            <el-tag size="medium" effect="dark" :type="scope.row.menuType | tagTypeFilter">{{ scope.row.menuType | menuTypeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="operation" fixed="right" min-width="240">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="editMenu(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.menuType !== 4" type="success" size="mini" @click="addMenu(scope.row)">添加</el-button>
            <el-button size="mini" plain @click="deleteMenu(scope.row.pkSid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <!-- 创建客户 -->
    <add-edit-menu-dialog :visible.sync="addEditMenuVisible" :menu-data="menuData" />
  </div>
</template>

<script>
import { delSysMenu } from '@/api/raw'
import addEditMenuDialog from './AddEditMenuDialog'

export default {
  inject: ['reload'],
  name: 'CustomerListTable',
  filters: {
    // 类目
    menuTypeFilter(status) {
      const statusMap = {
        1: '页签',
        2: '目录',
        3: '菜单',
        4: '按钮',
        5: '字段'
      }
      return statusMap[status]
    },
    // tag类型
    tagTypeFilter(status) {
      const statusMap = {
        1: 'info',
        2: '',
        3: 'success',
        4: 'danger',
        5: 'warning'
      }
      return statusMap[status]
    },
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
    addEditMenuDialog
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tableData: [],
      addEditMenuVisible: false,
      menuData: {
        addEditData: {},
        addOrEdit: 'add'
      },
      deletePksid: 0
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.tableData = val.list
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addMenu(val) {
      this.addEditMenuVisible = true
      this.menuData = Object.assign({}, this.menuData, {
        addEditData: val,
        addOrEdit: 'add'
      })
    },
    editMenu(val) {
      this.addEditMenuVisible = true
      this.menuData = Object.assign({}, this.menuData, {
        addEditData: val,
        addOrEdit: 'edit'
      })
    },
    deleteMenu(val) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSysMenu(val).then(response => {
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
