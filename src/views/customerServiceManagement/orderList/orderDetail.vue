<template>
  <div class="app-container customer-detail">
    <!-- header -->
    <el-container height="auto" direction="horizontal">
      <div style="width: 50%">
        <h2>
          <el-popover
            placement="bottom"
            trigger="hover"
            :disabled="gridData.length == 0"
          >
            <el-table :data="gridData">
              <el-table-column min-width="200" prop="companyName" label="公司" />
              <el-table-column width="50" label="主显" class-name="is-primary-display" align="center">
                <template slot-scope="scope">
                  <el-tooltip v-if="scope.row.ifParentCompany == 1" class="item" effect="dark" content="主显公司" placement="right-start">
                    <svg-icon icon-class="home" class-name="home" style="font-size: 18px;" />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <svg-icon slot="reference" icon-class="menu2" class-name="menu2" />
          </el-popover>
          {{ companyInfo.companyName }}
        </h2>
      </div>
      <div style="width: 50%; text-align: right; padding-top: 20px;" class="con-right">
        <el-button size="small" type="primary" @click="pickUpPrivate">捡入私海</el-button>
      </div>
    </el-container>

    <!-- table -->
    <el-table
      v-loading="tableData3.listLoading"
      :data="tableData3.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="联系人姓名" prop="nickname" width="120" class-name="user-info" align="center" />
      <el-table-column label="职位" prop="duty" width="120" class-name="tags" align="center" />
      <el-table-column label="电话" prop="userMobile" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userMobile.substr(0,3) + "****" + scope.row.userMobile.substr(7,scope.row.userMobile.length -6) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="座机号" prop="telephone" width="120" align="center" />
      <el-table-column label="微信" prop="wxNumber" width="180" align="center" />
      <el-table-column label="QQ" prop="qqNumber" width="120" align="center" />
      <el-table-column label="邮箱" prop="userEmail" width="200" align="center" />
      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="scope"><span v-if="scope.row.onJobFlag == 0">在职</span><span v-if="scope.row.onJobFlag == 1">离职</span></template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      :current-page="listQuery.start"
      :page-size="listQuery.length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData3.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- tab -->
    <el-container direction="horizontal" class="list-con">
      <el-main>
        <el-tabs v-model="activeTabsName" type="border-card">
          <!-- 动态记录 -->
          <el-tab-pane label="动态记录" name="first">
            <el-table :data="gridData1.list" border>
              <el-table-column width="150" label="动态名称">
                <template slot-scope="scope">
                  <el-row>{{ DYNAMIC_NAME_MAP[scope.row.dynamicLogName] }}</el-row>
                </template>
              </el-table-column>
              <el-table-column width="160" prop="dealTime" label="时间" align="center" />
              <el-table-column width="100" prop="dealUserName" label="操作人" align="center" />
              <el-table-column min-width="200" prop="operationContent" label="操作内容">
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
              :current-page="listQueryDynamic.start"
              :page-size="listQueryDynamic.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="gridData1.total"
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
            />
          </el-tab-pane>
          <!-- 工商信息 -->
          <el-tab-pane label="工商信息" name="second" class="business-info">
            <!-- 行业类型, 组织机构代码 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">行业类型</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.companyBusinessProfession }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">组织机构代码</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.organizationCode }}</el-col>
            </el-row>
            <!-- 成立日期, 核准日期 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">成立日期</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.establishDate }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">核准日期</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.authorizeDate }}</el-col>
            </el-row>
            <!-- 注册号, 核准机构 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册号</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.licenseNumber }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">核准机构</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.authorizeAgency }}</el-col>
            </el-row>
            <!-- 注册地址, 营业期限开始日期 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册地址</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.licenseAddress }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">营业期限开始日期</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.licenseBeginTime }}</el-col>
            </el-row>
            <!-- 企业法人, 营业期限结束日期 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">企业法人</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.companyLegalPerson }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">营业期限结束日期</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.licenseEndTime }}</el-col>
            </el-row>
            <!-- 注册资金, 公司URL -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册资金</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.registrationAmount }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">公司URL</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.companyUrl }}</el-col>
            </el-row>
            <!-- 实收注册资金, 行业平分(总分10000) -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">实收注册资金</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.actualRegistrationAmount }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">行业平分(总分10000)</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.companyBusinessScore }}</el-col>
            </el-row>
            <!-- 企业类型, 公司评分(总分10000) -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">企业类型</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ COMPANY_TYPE_MAP[companyInfo.companyType] }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">公司评分(总分10000)</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.companyScore }}</el-col>
            </el-row>
            <!-- 经营范围 -->
            <el-row style="background:rgba(240, 247, 252, 0.6)">
              <el-col :span="4">经营范围</el-col>
              <el-col :span="20" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266; background:#fff;">{{ companyInfo.businessRange }}</el-col>
            </el-row>
          </el-tab-pane>
          <!-- 商标信息 -->
          <el-tab-pane label="商标信息" name="third">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="商标图片" />
              <el-table-column width="160" prop="time" label="商标名" align="center" />
              <el-table-column width="100" prop="operator" label="申请号" align="center" />
              <el-table-column min-width="200" prop="operationContent" label="类别" />
              <el-table-column width="90" prop="isFollowUp" label="代理机构" align="center" />
              <el-table-column min-width="200" prop="remarks" label="申请日期" />
              <el-table-column min-width="200" prop="remarks" label="当前状态" />
              <el-table-column min-width="200" prop="remarks" label="专用端" />
              <el-table-column min-width="200" label="操作" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              :current-page="currentPage4"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <!-- 订单信息 -->
          <el-tab-pane label="订单信息" name="fourth">
            <el-tabs v-model="activeTabsName1" class="item-tabs" tab-position="left">
              <el-tab-pane label="商标服务" name="fourth1">
                <el-table :data="gridData2" border>
                  <el-table-column width="100" prop="dynamicName" label="订单号" />
                  <el-table-column width="100" prop="time" label="支付时间" align="center" />
                  <el-table-column width="100" prop="operator" label="流程节点" align="center" />
                  <el-table-column width="100" prop="operationContent" label="客户名称" />
                  <el-table-column width="100" prop="isFollowUp" label="业务类型" align="center" />
                  <el-table-column width="100" prop="isFollowUp" label="金额" align="center" />
                  <el-table-column width="100" prop="isFollowUp" label="联系人" align="center" />
                  <el-table-column width="100" prop="isFollowUp" label="开票状态" align="center" />
                  <el-table-column width="100" prop="isFollowUp" label="保件日期" align="center" />
                  <el-table-column min-width="120" label="操作" fixed="right" />
                </el-table>
                <!-- 分页 -->
                <el-pagination
                  background
                  :current-page="currentPage4"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="100"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </el-tab-pane>
              <el-tab-pane label="版权服务" name="fourth2" />
              <el-tab-pane label="专利服务" name="fourth3" />
              <el-tab-pane label="其他服务" name="fourth4" />
            </el-tabs>
          </el-tab-pane>
          <!-- 咨询记录 -->
          <el-tab-pane label="咨询记录" name="fifth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="客户状态" />
              <el-table-column width="160" prop="time" label="意向产品" align="center" />
              <el-table-column width="100" prop="operator" label="创建时间" align="center" />
              <el-table-column min-width="200" prop="operationContent" label="关闭原因" />
              <el-table-column width="90" prop="isFollowUp" label="线索来源" align="center" />
              <el-table-column width="90" prop="isFollowUp" label="联系方式" align="center" />
              <el-table-column min-width="200" label="操作" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              :current-page="currentPage4"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <!-- 发票记录 -->
          <el-tab-pane label="发票记录" name="sixth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="基本信息" />
              <el-table-column width="160" prop="time" label="服务信息" align="center" />
              <el-table-column width="100" prop="operator" label="发票信息" align="center" />
              <el-table-column min-width="200" prop="operationContent" label="收件人信息" />
              <el-table-column width="90" prop="isFollowUp" label="发票状态" align="center" />
              <el-table-column min-width="200" label="操作" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              :current-page="currentPage4"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <!-- 文件记录 -->
          <el-tab-pane label="文件记录" name="seventh">
            <el-tabs v-model="activeTabsName1" class="item-tabs" tab-position="left">
              <el-tab-pane label="所有文件" name="fourth1">
                <el-table :data="gridData2" border>
                  <el-table-column width="100" prop="dynamicName" label="申请人" />
                  <el-table-column width="100" prop="time" label="商品信息" align="center" />
                  <el-table-column width="100" prop="operator" label="分类信息" align="center" />
                  <el-table-column width="100" prop="operationContent" label="文件名称" />
                  <el-table-column min-width="120" label="操作" fixed="right" />
                </el-table>
                <!-- 分页 -->
                <el-pagination
                  background
                  :current-page="currentPage4"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="100"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </el-tab-pane>
              <el-tab-pane label="官文" name="fourth2" />
              <el-tab-pane label="所有客户" name="fourth3" />
            </el-tabs>
          </el-tab-pane>
          <!-- 其他顾问订单 -->
          <el-tab-pane label="其他顾问订单" name="eighth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="顾问" />
              <el-table-column width="160" prop="time" label="商标服务" align="center" />
              <el-table-column width="100" prop="operator" label="版权服务" align="center" />
              <el-table-column min-width="200" prop="operationContent" label="专利服务" />
              <el-table-column width="90" prop="isFollowUp" label="其他" align="center" />
              <el-table-column min-width="200" prop="remarks" label="商标交易" />
              <el-table-column min-width="200" label="操作" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              :current-page="currentPage4"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { getCompanyRelation, getUserPrivate, getCompanyInfo, getUserPrivateList, getCrmDynamicLog, pickUpPrivate } from '@/api/table'
import { COMPANY_TYPE_MAP, DYNAMIC_NAME_MAP, TRUE_OR_FALSE } from '@/store/constants'

export default {
  name: 'OrderDetail',
  data() {
    return {
      activeTabsName: 'first',
      activeTabsName1: 'fourth1',
      list: null,
      postForm: {
        companyId: ''
      },
      listQuery: {
        start: '1',
        length: '10',
        companyId: this.companyId
      },
      listQueryDynamic: {
        start: '1',
        length: '10',
        companyId: this.companyId
      },
      companyId: null,
      companyInfo: {},
      COMPANY_TYPE_MAP: COMPANY_TYPE_MAP,
      DYNAMIC_NAME_MAP: DYNAMIC_NAME_MAP,
      TRUE_OR_FALSE: TRUE_OR_FALSE,
      userPrivate: {
        createUserName: '',
        createTime: ''
      },
      listLoading: true,
      tableData3: {
        list: [],
        listLoading: true,
        total: 0
      },
      gridData: [

      ],
      gridData1: {
        list: [],
        listLoading: true,
        total: 0
      },
      gridData2: [],
      temp: {},
      currentPage4: 4,
      activeNames: ['1'],
      editCustomerDetailVisible: false,
      addEditContactsVisible: false,
      addFollowUpVisible: false,
      releasePrivateCustomerVisible: false
    }
  },
  created() {
    this.companyId = this.$route.params.currentCompanyId
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    fetchData() {
      this.listLoading = true
      if (this.tableData) {
        this.list = this.tableData
        this.listLoading = false
      }
      // 关系
      this.postForm.companyId = this.companyId
      getCompanyRelation(this.postForm).then(response => {
        this.gridData = response.data.data
      })
      // 公司信息
      getCompanyInfo(this.postForm).then(response => {
        this.companyInfo = response.data.data[0]
      })
      // 负责人信息
      getUserPrivate(this.postForm).then(response => {
        this.userPrivate = Object.assign({}, this.userPrivate, {
          createUserName: response.data.data[0].createUserName,
          createTime: response.data.data[0].createTime
        })
      })
      // 联系人列表
      this.fetchUserData()
      this.getCrmDynamicLog()
    },
    // 获取联系人列表
    fetchUserData(val) {
      if (typeof val !== 'undefined') {
        this.listQuery = val
      }
      this.listQuery.companyId = this.$route.params.currentCompanyId
      this.$set(this.tableData3, 'listLoading', true)
      getUserPrivateList(this.listQuery).then(response => {
        this.tableData3 = Object.assign({}, this.tableData3, {
          list: response.data.data,
          total: response.data.total,
          listLoading: false
        })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 获取动态记录
    getCrmDynamicLog(val) {
      if (typeof val !== 'undefined') {
        this.listQueryDynamic = val
      }
      this.listQueryDynamic.companyId = this.$route.params.currentCompanyId
      this.$set(this.gridData1, 'listLoading', true)
      getCrmDynamicLog(this.listQueryDynamic).then(response => {
        this.gridData1 = Object.assign({}, this.gridData1, {
          list: response.data.data,
          total: response.data.total,
          listLoading: false
        })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 捡入私海
    pickUpPrivate() {
      // 关系
      this.postForm.companyId = this.companyId
      pickUpPrivate(this.postForm).then(response => {
        // 跳转到我的客户
        this.$router.push({ path: '/customerManagement/myCustomer' })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.listQuery, 'start', val)
      this.fetchUserData(this.listQuery)
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.listQueryDynamic, 'start', val)
      this.getCrmDynamicLog(this.listQueryDynamic)
    },
    handleEditCustomerDetail() {
      this.editCustomerDetailVisible = true
    },
    setPrimaryDisplay(val) {
      console.log(val)
    },
    handleFollowUp() {
      this.followUpVisible = true
    },
    handleChooseOrderWay() {
      this.chooseOrderWayVisible = true
    },
    handleAddEditContacts() {
      this.addEditContactsVisible = true
    },
    handleAddFollowUp() {
      this.addFollowUpVisible = true
    },
    handleReleasePrivateCustomer() {
      this.releasePrivateCustomerVisible = true
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
          font-size: 16px;
        }
      }
    }
    &.list-con{
      padding: 0;
      .el-aside{
        border: 1px solid #dfe6ec;
        p.title-p{
          position: relative;
          font-size: 18px;
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
      padding: 11px 15px;
      margin-left: 20px;
      &:first-child{
        margin-left: 10px;
      }
      &:last-child{
        margin-left: 40px;
      }
      /deep/ span{
        font-size: 16px;
      }
    }
  }
  .el-table{
    margin-bottom: 45px;
    /deep/ .el-table__header{
      th{
        color: #808080;
      }
    }
    /deep/ td{
      padding: 6px 0;
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
    margin: 20px 0 1px;
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
