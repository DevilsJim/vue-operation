<template>
  <div class="app-container customer-detail">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h2 class="title-h2">基本信息</h2>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">上级部门：{{ upperDeptName == 'null' ? '无' : upperDeptName }}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">负责人：{{ leaderName }}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">状态：{{ status }}</div></el-col>
      </el-row>
    </div>

    <!-- 成员列表 -->
    <h2 class="title-h2" style="margin-left: 10px;">成员列表</h2>
    <el-table
      :data="listData.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      class="company-info-table"
    >
      <el-table-column label="序号" type="index" width="100" align="center" />
      <el-table-column label="水果名" class-name="tags" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.realname }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleNames }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.offWorkFlag == 1 ? '在职' : '离职' }}
        </template>
      </el-table-column>
      <el-table-column label="加入时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
    </el-table>

    <!--分页信息-->
    <el-pagination
      background
      :current-page="listData.start"
      :page-size="listData.length"
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination-table"
      :total="listData.total"
      @size-change="handleLatentSizeChange"
      @current-change="handleLatentCurrentChange"
    />

  </div>
</template>

<script>
import { getSysUserPageList } from '../../../api/raw'

export default {
  name: 'DepartmentDetail',
  components: {},
  data() {
    return {
      upperDeptName: '',
      leaderName: '',
      listData: {
        list: [],
        listLoading: true,
        total: 0,
        start: 1,
        length: 10
      },
      formInline: {
        start: 1,
        length: 10
      }
    }
  },
  watch: {},
  created() {
    this.upperDeptName = this.$route.query.upperDeptName
    this.leaderName = this.$route.query.leaderName
    this.status = this.$route.query.status === 1 ? '正常' : '隐藏'
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getList()
    },
    getList() {
      getSysUserPageList(this.formInline).then(response => {
        this.listData = {
          list: response.data.data.list,
          total: response.data.data.totalCount,
          start: response.data.data.currentPageNumber,
          length: response.data.data.pageSize,
          listLoading: false
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },

    handleLatentCurrentChange(val) {
      this.formInline.start = val
      this.getList()
    },
    handleLatentSizeChange(val) {
      this.formInline.length = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-detail{
  .basic-info{
    padding: 0 0 20px 10px;
    border-bottom: 1px solid #dfe4ed;
    margin-bottom: 40px;
  }
  .title-h2{
    margin-top: 0;
    font-size:20px;
  }
  .el-form{
    .el-date-editor {
      width: 410px;
      /deep/ .el-range-input{ // 加 /deep/ 或 >>> 是为了给 element 元素添加自定义样式
        width: 80%;
      }
    }
    .el-button{
      /deep/ span{
        font-size: 16px;
      }
    }
  }
  .el-table{
    margin-bottom: 20px;
    /deep/ td{
      padding: 6px 0;
    }
    /deep/ .el-table__header{
      th{
        color: #808080;
      }
    }
    .svg-icon{
      cursor: pointer;
      display: inline-block;
      font-size: 18px;
    }
    .name{
      span{
        display: inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 160px;
        vertical-align: top;
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
    .tags{
      .el-tag{
        margin-right: 5px;
        font-size: 14px;
        height: 30px;
        line-height: 28px;
        padding: 0 8px;
      }
      .el-tag:last-child{
        margin-right: 0;
      }
    }
    .el-switch {
      /deep/ .el-switch__label{
        color: #777;
        &.is-active{
          color: #1890ff;
        }
      }
    }
  }
  .el-pagination{
    text-align: right;
    &.pagination-table{
      margin: 0 0 35px;
    }
  }
}

.el-popover.el-popper.stage-change{
  h2{
    font-size: 16px;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 12px;
  }
}
</style>
