<template>
  <div class="app-container customer-detail">
    <!-- header -->
    <el-container height="auto" direction="vertical">
      <el-row style="padding-bottom:16px;">
        <el-col :span="10">
          <h2>{{ businessInfo.bussinessName }}</h2>
        </el-col>
      </el-row>
      <div class="info">
        <span style="width:340px;"><i>商机名称：</i>{{ businessInfo.bussinessName }}</span>
        <span style="width: 150px"><i>意向业务：</i>{{ businessInfo.businessPurpose | businessPurposeFilter }}</span>
        <span><i style="width:112px;">创建时间：</i>{{ businessInfo.createTime }}</span>
      </div>
      <div class="info">
        <span style="width:340px;"><i>商机编号：</i>{{ businessInfo.businessId }}</span>
        <span style="width: 150px"><i>成交几率：</i>{{ businessInfo.dealPercent }}%</span>
        <span><i>下次跟进时间：</i>{{ businessInfo.nextFollowTime }}</span>
      </div>
      <div class="info">
        <span><i style="width:80px;">备注：</i> {{ businessInfo.remark }} </span>
      </div>
      <el-steps :active="businessInfo.businessProgress" align-center finish-status="success">
        <el-step title="初步洽谈" />
        <el-step title="是否发送函件" />
        <el-step title="是否约谈" />
        <el-step title="销售报价" />
        <el-step title="合同报价" />
        <el-step title="项目失败" />
        <el-step title="项目收款" />
      </el-steps>
    </el-container>

    <!-- 客户信息 -->
    <div class="container-sub">
      <h3>客户信息</h3>
      <el-table
        :data="companyInfo"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        class="company-info-table"
      >
        <el-table-column label="客户名称" width="220" class-name="company-name" align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/businessManagement/customerDetail/' + scope.row.companyId}">
              <div class="name">{{ scope.row.companyName }}</div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="客户类型" prop="companyType" width="120" class-name="tags" align="center">
          <template slot-scope="scope">{{ scope.row.companyType | companyTypeFilter }}</template>
        </el-table-column>
        <el-table-column label="联系人" width="nickname" align="center" prop="userMobile" />
        <el-table-column label="职位" prop="duty" width="120" align="center" />
        <el-table-column label="联系电话" prop="userMobile" width="180" align="center" />
        <el-table-column label="公司地址" prop="licenseAddress" width="120" align="center" />
        <el-table-column label="客户负责人" prop="sysUserName" width="200" align="center" />
      </el-table>
    </div>

    <!-- 跟进记录 -->
    <div class="container-sub list-con">
      <el-main>
        <el-tabs v-model="activeTabsName" type="border-card">
          <!-- 跟进记录 -->
          <el-tab-pane label="跟进记录" name="first">
            <el-table :data="businessFollowList.list" border>
              <el-table-column width="160" prop="currentFollowTime" label="时间" align="center" />
              <el-table-column width="120" prop="dealTime" label="跟进人" align="center" />
              <el-table-column width="120" prop="dealUserName" label="跟进方式" align="center" />
              <el-table-column width="120" label="商机进度" align="center">
                <template slot-scope="scope">{{ scope.row.businessProgress | businessProgressFilter }}</template>
              </el-table-column>
              <el-table-column width="160" prop="nextFollowTime" label="下次跟进时间" align="center" />
              <el-table-column min-width="200" prop="followMark" label="跟进/备注" align="center" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="businessFollowList.start"
              :page-size="businessFollowList.pagerSize"
              :total="businessFollowList.total"
              @size-change="followSizeChange"
              @current-change="followCurrentChange"
            />
          </el-tab-pane>

          <!-- 动态记录 -->
          <el-tab-pane label="动态记录" name="second">
            <el-table :data="businessDynamicList.list" border>
              <el-table-column width="150" prop="dynamicLogName" label="动态记录" align="center">
                <template slot-scope="scope">{{ scope.row.dynamicLogName | dynamicLogNameFilter }}</template>
              </el-table-column>
              <el-table-column width="160" prop="dealTime" label="时间" align="center" />
              <el-table-column width="100" prop="dealUserName" label="操作人" align="center" />
              <el-table-column width="200" label="操作内容">
                <template slot-scope="scope">
                  <el-row>老顾问： {{ scope.row.oldCounselorName }}</el-row>
                  <el-row>新顾问： {{ scope.row.newCounselorName }}</el-row>
                </template>
              </el-table-column>
              <el-table-column width="90" prop="ifFollowLog" label="是否跟进" align="center">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.ifFollowLog == 0">是</el-row>
                  <el-row v-if="scope.row.ifFollowLog == 1">否</el-row>
                </template>
              </el-table-column>
              <el-table-column min-width="200" prop="dealRemark" label="跟进/备注" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="businessDynamicList.start"
              :page-size="businessDynamicList.pagerSize"
              :total="businessDynamicList.total"
              @size-change="dynamicSizeChange"
              @current-change="dynamicCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </div>
  </div>
</template>

<script>
import { getBusinessList, getBusinessFollowList, getBusinessDynamic, getCompanyDetail } from 'api/business'

export default {
  name: 'BusinessDetail',
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
    // 动态记录
    dynamicLogNameFilter(status) {
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
    },
    // 公司类型
    companyTypeFilter(status) {
      const statusMap = {
        '0': '个人',
        '1': '公司',
        '2': '个体工商户'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeTabsName: 'first',
      currentBusinessId: null, // 当前商机Id
      currentIfOwnCompany: null, // 客户归属 1.客户归属于当前用户 2.不归属于当前用户
      editBusinessData: {}, // 编辑商机传参
      businessInfo: {}, // 当前商机信息
      companyInfoOption: {}, // 获取当前公司信息的接口参数
      companyInfo: [], // 当前公司信息
      followListOption: { // 商机跟进记录参数
        start: 1,
        length: 10
      },
      businessFollowList: { // 商机跟进记录
        list: [],
        total: 0,
        listLoading: true
      },
      dynamicListOption: { // 商机动态记录参数
        start: 1,
        length: 10
      },
      businessDynamicList: { // 商机动态记录
        list: [],
        total: 0,
        listLoading: true
      }
    }
  },
  watch: {
    currentBusinessId(val, oldVal) {
      if (val) this.init()
    },
    companyInfoOption: {
      handler(val, oldVal) {
        if (val.companyId && val.mainLatentUserId) this.getCompanyDetail()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.currentBusinessId = this.$route.params.currentBusinessId
    this.$set(this.followListOption, 'businessId', this.currentBusinessId)
    this.$set(this.dynamicListOption, 'businessId', this.currentBusinessId)
  },
  methods: {
    // 初始化
    init() {
      this.getBusinessDetail()
      this.getBusinessFollowList()
      this.getBusinessDynamic()
    },
    // 获取商机详情
    getBusinessDetail() {
      const _this = this
      getBusinessList({
        start: 1,
        length: 10,
        businessId: this.currentBusinessId,
        selectType: 0,
        businessType: -2,
        dealType: -1,
        businessPurpose: -1,
        businessProgress: -1,
        releasingFlage: -1
      }).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data && response.data.data.length === 1) {
            const resData = response.data.data[0]
            if (resData.dealPercent && resData.dealPercent >= 0) {
              resData.dealPercent = resData.dealPercent * 10
            } else {
              resData.dealPercent = 0
            }
            _this.businessInfo = resData
          }
          _this.companyInfoOption = Object.assign({}, _this.companyInfoOption, {
            companyId: response.data.data[0].companyId, // 当前公司Id
            mainLatentUserId: response.data.data[0].userId // 联系人Id
          })
          _this.currentIfOwnCompany = response.data.data[0].ifOwnCompany
        } else {
          _this.$message.error(response.data.code)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 获取商机跟进记录
    getBusinessFollowList() {
      const _this = this
      this.$set(_this.businessFollowList, 'listLoading', true)
      getBusinessFollowList(_this.followListOption).then(response => {
        if (response.data.code === 10000) {
          this.businessFollowList = Object.assign({}, this.businessFollowList, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            length: response.data.pagerSize,
            listLoading: false
          })
          console.log('跟进记录', this.businessFollowList)
        } else {
          _this.$message.error(response.data.code)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // // 获取公司的动态记录
    getBusinessDynamic() {
      const _this = this
      this.$set(_this.businessDynamicList, 'listLoading', true)
      getBusinessDynamic(this.dynamicListOption).then(response => {
        if (response.data.code === 10000) {
          _this.businessDynamicList = Object.assign({}, _this.businessDynamicList, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            length: response.data.pagerSize,
            listLoading: false
          })
          console.log('动态记录', _this.businessDynamicList)
        } else {
          _this.$message.error(response.data.code)
          this.$set(_this.businessDynamicList, 'listLoading', false)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // // 获取公司的详细信息
    getCompanyDetail() {
      const _this = this
      getCompanyDetail(_this.companyInfoOption).then(response => {
        if (response.data.code === 10000) {
          _this.companyInfo = response.data.data
        } else {
          _this.$message.error(response.data.code)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 商机跟进每页条数
    followSizeChange(val) {
      this.$set(this.followListOption, 'pagerSize', val)
      this.getBusinessDynamic()
    },
    // 商机跟进分页切换
    followCurrentChange(val) {
      this.$set(this.followListOption, 'start', val)
      this.getBusinessDynamic()
    },
    // 动态记录每页条数
    dynamicSizeChange(val) {
      this.$set(this.dynamicListOption, 'pagerSize', val)
      this.getBusinessDynamic()
    },
    // 动态记录分页切换
    dynamicCurrentChange(val) {
      this.$set(this.dynamicListOption, 'start', val)
      this.getBusinessDynamic()
    },
    // 编辑商机
    handlerEditBusiness() {
      this.editBusinessVisible = true
      this.editBusinessData = Object.assign({}, this.editBusinessData, {
        pkSid: this.businessInfo.pkSid,
        businessId: this.businessInfo.businessId,
        bussinessName: this.businessInfo.bussinessName
      })
      console.log(this.editBusinessData)
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-detail{
    background: #f5f7fa;
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
      .info{
        span{
          color: #222;
          display: inline-block;
          width: 270px;
          margin: 0 15px 12px 0;
          i{
            font-style: normal;
            color: #7b7b7b;
            display: inline-block;
            text-align:right;
          }
        }
      }
      .el-steps{
        padding: 30px 0 40px
      }
    }
    .container-sub{
      background: #fff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      padding: 18px 18px 20px;
      margin-bottom: 50px;
      h3{
        font-weight: normal;
        margin: 8px 0 20px ;
      }
      &.list-con{
        margin-bottom: 25px;
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
              &.business{
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
          .business-title{
            margin: 0;
            padding: 0 17px;
            i{
              cursor: pointer;
            }
          }
          .business-con{
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
                  .el-row {
                    line-height: 1.5;
                    color: #525252;
                    border-bottom: 1px solid #dfe6ec;
                    .el-col {
                      padding: 12px 10px;
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
          .el-table{
            /deep/ .el-table__header{
              th{
                background: transparent;
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
          background: #f5f7fa;
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
    }
    .el-pagination{
      text-align: right;
      /deep/ .el-pager li, /deep/ span, /deep/ span .el-input__inner{
        font-size: 14px;
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
