<template>
  <div class="app-container customer-detail">
    <!-- header -->
    <el-container height="auto" direction="horizontal">
      <div style="width: 100%;">
        <strong style="float: left;font-size: 20px;font-weight: bold">
          {{ cluesInfo.companyName ? cluesInfo.companyName : '-' }}
        </strong>
      </div>
    </el-container>
    <el-container height="auto" direction="horizontal">
      <div style="width: 100%;margin-top: 10px;">
        <span style="font-size: 14px">
          <span>
            公司地址： {{ cluesInfo.companyAddress }}
          </span>
          <span style="margin-left: 10%">
            初始来源： {{ cluesInfo.threadSource }}
          </span>
          <span style="margin-left: 10%">
            录入时间： {{ cluesInfo.createTime }}
          </span>
        </span>
      </div>
    </el-container>
    <el-container height="auto" direction="horizontal">
      <div style="width: 100%;margin-top: 10px;">
        <span style="font-size: 14px">
          线索备注：{{ cluesInfo.threadRemark }}
        </span>
      </div>
    </el-container>

    <el-container direction="horizontal" class="list-con">
      <el-aside style="width: 100%">
        <p class="title-p">
          联系人
        </p>
        <!-- table -->
        <el-table
          :data="gridDataLatent.list"
          element-loading-text="Loading"
          fit
          border
          highlight-current-row
          class="company-info-table"
        >
          <el-table-column label="姓名" prop="nickname" width="120" class-name="user-info" align="center" />
          <el-table-column label="职位" prop="duty" width="120" class-name="tags" align="center" />
          <el-table-column label="电话" width="120" align="center">
            <template slot-scope="scope">
              {{ scope.row.userMobile ? scope.row.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '' }}
            </template>
          </el-table-column>
          <el-table-column label="座机号" prop="telephone" width="120" align="center" />
          <el-table-column label="微信" prop="wxNumber" width="180" align="center" />
          <el-table-column label="QQ" prop="qqNumber" width="120" align="center" />
          <el-table-column label="邮箱" prop="userEmail" width="200" align="center" />
          <el-table-column label="状态" width="150" align="center">
            <template slot-scope="scope"><span v-if="scope.row.onJobFlag == 1">在职</span><span v-if="scope.row.onJobFlag == 0">离职</span></template>
          </el-table-column>
        </el-table>
        <!--分页信息-->
        <el-pagination
          background
          :current-page="gridDataLatent.userParams.start"
          :page-size="gridDataLatent.userParams.length"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination-table"
          :total="gridDataLatent.userParams.total"
          @size-change="handleLatentSizeChange"
          @current-change="handleLatentCurrentChange"
        />
      </el-aside>
    </el-container>
    <br>
    <el-container direction="horizontal" class="list-con">
      <el-tabs v-model="activeTabsName" type="border-card" style="width: 100%">
        <!-- 动态记录 -->
        <el-tab-pane label="动态记录" name="first">
          <el-table :data="gridData3.list" border>
            <el-table-column width="200" label="动态名称" align="center">
              <template slot-scope="scope">
                {{ scope.row.threadLogType | threadLogTypeToName }}
              </template>
            </el-table-column>
            <el-table-column width="200" prop="dealTime" label="时间" align="center" />
            <el-table-column width="200" prop="dealUserName" label="操作人" align="center" />
            <el-table-column prop="operationContent" label="操作内容" align="center">
              <template slot-scope="scope">
                {{ scope.row.dealRemark }}
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <!--<el-pagination
            background
            :current-page="gridData3.start"
            :page-size="gridData3.length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="gridData3.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />-->
        </el-tab-pane>
      </el-tabs>
    </el-container>

  </div>
</template>

<script>
import { getCommonCluesCustomerList, getCommonCluesDetail } from '../../../api/clues'

export default {
  inject: ['closeSelectedTag'],
  name: 'CluesDetail',
  filters: {
    threadLogTypeToName(status) {
      const statusMap = {
        0: '导入线索',
        1: '后台创建',
        2: '关闭',
        3: '稍后处理',
        4: '捡入',
        5: '完善信息',
        6: '释放线索',
        7: '转为客户'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      currentThreadId: null,
      currentContactId: null,
      activeTabsName: 'first',
      activeTabsName1: 'fourth1',
      list: null,
      cluesData: {},
      formInline: {
        start: 1,
        length: 10,
        threadId: this.currentThreadId
      },
      listLoading: true,
      gridData3: {
        list: [],
        listLoading: true,
        total: 0
      },
      gridDataLatent: {
        list: [],
        listLoading: true,
        userParams: {
          start: 1,
          length: 10,
          companyId: null
        }
      },
      companyChildren: [],
      activeNames: [],
      addEditContactsVisible: false,
      cluesInfo: {},
      leader: {},
      businessList: []
    }
  },
  watch: {},
  created() {
    console.log(this.$route.params)
    this.currentThreadId = this.$route.params.currentThreadId
    this.gridDataLatent.userParams.companyId = this.currentCompanyId
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getThreadDetail()
      this.getCustomerList()
    },

    /*
    * 获取详情数据
    * */
    getThreadDetail() {
      getCommonCluesDetail({ threadId: this.currentThreadId }).then(response => {
        if (response.data.code === 10000) {
          this.cluesInfo = response.data.data
          this.gridData3.list = response.data.data.dynamicLogList
        }
        console.log(this.cluesInfo)
      }).catch((err) => {
        console.log('err', err)
      })
    },

    /*
    * 获取联系人列表
    * */
    getCustomerList() {
      this.gridDataLatent.userParams.threadId = this.currentThreadId
      getCommonCluesCustomerList(this.gridDataLatent.userParams).then(response => {
        console.log(response.data)
        if (response.data.code === 10000) {
          this.gridDataLatent.list = response.data.data
          this.gridDataLatent.userParams.total = response.data.total
          this.gridDataLatent.userParams.start = response.data.start
          this.gridDataLatent.userParams.length = response.data.length
        }
        console.log(this.cluesInfo)
      }).catch((err) => {
        console.log('err', err)
      })
    },
    handleSizeChange(val) {
      this.formInline.length = val
      this.getCustomerDynamic()
    },
    handleCurrentChange(val) {
      this.formInline.start = val
      this.getCustomerDynamic()
    },

    handleLatentCurrentChange(val) {
      this.gridDataLatent.userParams.start = val
      this.getLatentInfo()
    },
    handleLatentSizeChange(val) {
      this.gridDataLatent.userParams.length = val
      this.getLatentInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-detail{
    .el-container{
      padding: 0 0 5px 10px;
      h2{
        vertical-align: top;
        margin: 0;
        .svg-icon{
          font-size: 22px;
          vertical-align: top;
          margin-top: 4px;
          cursor: pointer;
          &.edit{
            font-size: 20px;
            margin-left: 5px;
          }
        }
      }
      p.info{
        color: #4a4a4a;
      }
      .con-right{
        /deep/ .el-button{
          span{
            font-size: 15px;
          }
        }
      }
      &.list-con{
        padding: 0;
        .el-aside{
          border: 1px solid #dfe6ec;
          p.title-p{
            position: relative;
            font-size: 16px;
            color: #4a4a4a;
            background: #f5f7fa;
            margin: 0;
            padding: 15px;
            .svg-icon{
              vertical-align: top;
              &.opportunity{
                margin-right: 5px;
              }
              &.plus-square{
                cursor: pointer;
                position: absolute;
                top: 15px;
                right: 20px;
              }
            }
          }
          .el-row{
            color: #606266;
            font-size: 15px;
            padding: 0 5px;
            margin: 0 10px;
            /*border-bottom: 1px solid #dfe6ec;*/
            height: 45px;
            line-height: 45px;
          }
          .opportunity-title{
            margin: 0;
            padding: 0 17px;
            i{
              cursor: pointer;
            }
          }
          .opportunity-con{
            border-bottom: 1px solid #dfe6ec;
          }
          .el-tag{
            cursor: default;
          }
          .svg-icon{
            &.right{
              font-size: 18px;
              color: #1890ff;
              cursor: pointer;
              vertical-align: top;
              margin: 15px 0 0 0;
            }
            &.flag{
              color: #13954d;
              font-size: 24px;
              margin: 0 2px 0 -5px;
            }
          }
          .el-collapse{
            .el-collapse-item{
              border-bottom: 1px solid #e6ebf5;
            }
            /deep/ .el-collapse-item__header{
              font-size: 16px;
              color: #4a4a4a;
              font-weight: normal;
              padding: 0 15px;
              border-bottom-color: transparent;
              &.is-active{
                border-bottom-color: #e6ebf5;
              }
            }
            /deep/ .el-collapse-item__content{
              padding-bottom: 5px;
            }
            /deep/ .el-collapse-item__wrap{
              border-bottom: none;
            }
          }
        }
        .el-main{
          padding: 0;
          .el-tabs{
            &.el-tabs--border-card{
              box-shadow: none;
              border-left: none;
              /deep/ .el-tabs__header{
                height: 51px;
                line-height: 51px;
                .el-tabs__item{
                  height: 52px;
                  line-height: 52px;
                  font-size: 15px;
                  color: #4a4a4a;
                  font-weight: normal;
                  &.is-active{
                    color: #1890ff;
                  }
                }
              }
            }
            .el-tabs__content{
              .el-tab-pane{
                &.business-info {
                  font-size: 15px;
                  border: 1px solid #dfe6ec;
                  border-bottom: none;
                  /*border-left: none;*/
                  .el-row {
                    /*height: 48px;*/
                    line-height: 1.5;
                    /*text-align: center;*/
                    color: #525252;
                    border-bottom: 1px solid #dfe6ec;
                    .el-col {
                      padding: 12px 10px;
                      /*border-left: 1px solid #dfe6ec;*/
                    }
                  }
                }
                .item-tabs{
                  /deep/ .el-tabs__header {
                    height: auto;
                    line-height: 1.5;
                    .el-tabs__item{
                      font-size: 15px;
                      padding-left: 5px;
                    }
                  }
                }
              }
            }
          }
        }
      }
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
