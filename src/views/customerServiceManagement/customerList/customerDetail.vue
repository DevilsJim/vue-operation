<template>
  <div class="app-container customer-detail">
    <!-- header -->
    <el-container height="auto" direction="horizontal">
      <div style="width: 50%">
        <h2>{{ companyInfo.companyName }}</h2>
        <p class="info"><span>当前负责人：{{ leader.createUserName }}</span><span> 开始负责：{{ leader.createTime }}</span></p>
      </div>
      <div style="width: 50%; text-align: right; padding-top: 20px;" class="con-right">
        <el-button v-if="leader.createUserName !== null && roleIds.indexOf(11201) !== -1" type="primary" size="small" @click="handleChangeCustomer(companyInfo.companyId)">变更</el-button>
        <el-button v-else-if="roleIds.indexOf(11201) !== -1" type="primary" size="small" @click="handleAssignAdvisor(companyInfo.companyId)">分配</el-button>
        <el-button v-if="companyInfo.needApprove === 1" type="primary" size="small" @click="handleAuditCustomer(companyInfo.companyId)">审核</el-button>
      </div>
    </el-container>

    <!-- table -->
    <el-table
      :data="gridDataLatent.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      class="company-info-table"
    >
      <el-table-column label="联系人姓名" prop="nickname" width="120" class-name="user-info" align="center" />
      <el-table-column label="职位" prop="duty" width="120" class-name="tags" align="center" />
      <el-table-column label="电话" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}
        </template>
      </el-table-column>
      <el-table-column label="座机号" prop="telephone" width="120" align="center" />
      <el-table-column label="微信" prop="wxNumber" width="180" align="center" />
      <el-table-column label="QQ" prop="qqNumber" width="120" align="center" />
      <el-table-column label="邮箱" prop="userEmail" width="200" align="center" />
      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="scope"><span v-if="scope.row.onJobFlag == 1">在职</span><span v-if="scope.row.onJobFlag == 0">离职</span></template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="230" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="mini" icon="el-icon-edit" @click="handleAddEditContacts(true, scope.row.userId)">编辑</el-button>
          <el-button v-if="scope.row.mainUserFlag === 1" type="primary" size="mini" @click="handleChooseOrderWay(scope.row.userId)">设为主显</el-button>
          <el-button v-if="scope.row.mainUserFlag !== 1" type="primary" size="mini" disabled plain>主显信息</el-button>
        </template>
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

    <!-- tab -->
    <el-container direction="horizontal" class="list-con">
      <el-main>
        <el-tabs v-model="activeTabsName" type="border-card">
          <!-- 动态记录 -->
          <el-tab-pane label="动态记录" name="first">
            <el-table :data="gridData3.list" border>
              <el-table-column width="150" prop="dynamicLogName" label="动态记录" />
              <el-table-column width="160" prop="dealTime" label="时间" align="center" />
              <el-table-column width="100" prop="dealUserName" label="操作人" align="center" />
              <el-table-column width="200" prop="operationContent" label="操作内容">
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
              :current-page="gridData3.start"
              :page-size="gridData3.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="gridData3.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
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
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ companyInfo.licenseBeginTime }}</el-col>
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
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ companyInfo.companyBusinessProfession }}</el-col>
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
          <!--<el-tab-pane label="商标信息" name="third">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="商标图片"></el-table-column>
              <el-table-column width="160" prop="time" label="商标名" align="center"></el-table-column>
              <el-table-column width="100" prop="operator" label="申请号" align="center"></el-table-column>
              <el-table-column min-width="200" prop="operationContent" label="类别"></el-table-column>
              <el-table-column width="90" prop="isFollowUp" label="代理机构" align="center"></el-table-column>
              <el-table-column min-width="200" prop="remarks" label="申请日期"></el-table-column>
              <el-table-column min-width="200" prop="remarks" label="当前状态"></el-table-column>
              <el-table-column min-width="200" prop="remarks" label="专用端"></el-table-column>
              <el-table-column min-width="200" label="操作"></el-table-column>
            </el-table>
             分页
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.start"
              :page-size="formInline.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="formInline.total">
            </el-pagination>
          </el-tab-pane>
           订单信息
          <el-tab-pane label="订单信息" name="fourth">
            <el-tabs class="item-tabs" tab-position="left" v-model="activeTabsName1">
              <el-tab-pane label="商标服务" name="fourth1">
                <el-table :data="gridData2" border>
                  <el-table-column width="100" prop="dynamicName" label="订单号"></el-table-column>
                  <el-table-column width="100" prop="time" label="支付时间" align="center"></el-table-column>
                  <el-table-column width="100" prop="operator" label="流程节点" align="center"></el-table-column>
                  <el-table-column width="100" prop="operationContent" label="客户名称"></el-table-column>
                  <el-table-column width="100" prop="isFollowUp" label="业务类型" align="center"></el-table-column>
                  <el-table-column width="100" prop="isFollowUp" label="金额" align="center"></el-table-column>
                  <el-table-column width="100" prop="isFollowUp" label="联系人" align="center"></el-table-column>
                  <el-table-column width="100" prop="isFollowUp" label="开票状态" align="center"></el-table-column>
                  <el-table-column width="100" prop="isFollowUp" label="保件日期" align="center"></el-table-column>
                  <el-table-column min-width="120" label="操作" fixed="right"></el-table-column>
                </el-table>
                 分页
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="formInline.start"
                  :page-size="formInline.length"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="formInline.total">
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="版权服务" name="fourth2"></el-tab-pane>
              <el-tab-pane label="专利服务" name="fourth3"></el-tab-pane>
              <el-tab-pane label="其他服务" name="fourth4"></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
           咨询记录
          <el-tab-pane label="咨询记录" name="fifth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="客户状态"></el-table-column>
              <el-table-column width="160" prop="time" label="意向产品" align="center"></el-table-column>
              <el-table-column width="100" prop="operator" label="创建时间" align="center"></el-table-column>
              <el-table-column min-width="200" prop="operationContent" label="关闭原因"></el-table-column>
              <el-table-column width="90" prop="isFollowUp" label="线索来源" align="center"></el-table-column>
              <el-table-column width="90" prop="isFollowUp" label="联系方式" align="center"></el-table-column>
              <el-table-column min-width="200" label="操作"></el-table-column>
            </el-table>
             分页
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.start"
              :page-size="formInline.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="formInline.total">
            </el-pagination>
          </el-tab-pane>
           发票记录
          <el-tab-pane label="发票记录" name="sixth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="基本信息"></el-table-column>
              <el-table-column width="160" prop="time" label="服务信息" align="center"></el-table-column>
              <el-table-column width="100" prop="operator" label="发票信息" align="center"></el-table-column>
              <el-table-column min-width="200" prop="operationContent" label="收件人信息"></el-table-column>
              <el-table-column width="90" prop="isFollowUp" label="发票状态" align="center"></el-table-column>
              <el-table-column min-width="200" label="操作"></el-table-column>
            </el-table>
             分页
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.start"
              :page-size="formInline.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="formInline.total">
            </el-pagination>
          </el-tab-pane>
           文件记录
          <el-tab-pane label="文件记录" name="seventh">
            <el-tabs class="item-tabs" tab-position="left" v-model="activeTabsName1">
              <el-tab-pane label="所有文件" name="fourth1">
                <el-table :data="gridData2" border>
                  <el-table-column width="100" prop="dynamicName" label="申请人"></el-table-column>
                  <el-table-column width="100" prop="time" label="商品信息" align="center"></el-table-column>
                  <el-table-column width="100" prop="operator" label="分类信息" align="center"></el-table-column>
                  <el-table-column width="100" prop="operationContent" label="文件名称"></el-table-column>
                  <el-table-column min-width="120" label="操作" fixed="right"></el-table-column>
                </el-table>
                 分页
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="formInline.start"
                  :page-size="formInline.length"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="formInline.total">
                </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="官文" name="fourth2"></el-tab-pane>
              <el-tab-pane label="所有客户" name="fourth3"></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
           其他顾问订单
          <el-tab-pane label="其他顾问订单" name="eighth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="顾问"></el-table-column>
              <el-table-column width="160" prop="time" label="商标服务" align="center"></el-table-column>
              <el-table-column width="100" prop="operator" label="版权服务" align="center"></el-table-column>
              <el-table-column min-width="200" prop="operationContent" label="专利服务"></el-table-column>
              <el-table-column width="90" prop="isFollowUp" label="其他" align="center"></el-table-column>
              <el-table-column min-width="200" prop="remarks" label="商标交易"></el-table-column>
              <el-table-column min-width="200" label="操作"></el-table-column>
            </el-table>
             分页
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.start"
              :page-size="formInline.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="formInline.total">
            </el-pagination>
          </el-tab-pane>-->
        </el-tabs>
      </el-main>
    </el-container>

    <!-- 分配顾问 -->
    <assign-advisor-dialog :visible.sync="assignAdvisorVisible" :current-company-id="currentCompanyId" :search-data="searchData" />

    <!-- 变更客户 -->
    <change-customer-dialog :visible.sync="changeCustomerVisible" :current-company-id="currentCompanyId" :sys-user-page-list="searchData.sysUserPageList" />

    <!-- 审核无效客户 -->
    <audit-customer-dialog :visible.sync="dialogVisible.auditCustomerVisible" :current-company-id="currentCompanyId" />
  </div>
</template>

<script>
import { getCustomerDynamics, getCompanyDetail, getLatentUserPager, getCompanyChildrenDetail, setChild2Parent, getLeaderInfo, getBusinessPager, updateBusiness, updateCompanyInfo, updateLatentUserDetail } from '@/api/customerDetail'

import AssignAdvisorDialog from './components/AssignAdviserDialog'
import ChangeCustomerDialog from './components/ChangeCustomerDialog'
import { getLoginRoleId } from '@/utils/auth'
import { getDeptTreeList, getCurrentUserDeptUsers } from '@/api/customerService'
import AuditCustomerDialog from './components/AuditCustomerDialog'

export default {
  name: 'CustomerDetail',
  components: { AuditCustomerDialog, ChangeCustomerDialog, AssignAdvisorDialog },
  data() {
    return {
      currentCompanyId: null,
      roleIds: [],
      addEditContact: true,
      currentContactId: null,
      activeTabsName: 'first',
      activeTabsName1: 'fourth1',
      addBusiness: false,
      editBusiness: false,
      businessPkSid: null,
      list: null,
      formInline: {
        start: 1,
        length: 10,
        deleteStatus: '0',
        companyId: this.currentCompanyId
      },
      commonParams: {
        deleteStatus: '0'
      },
      businessFormInline: {
        start: 1,
        length: 3
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
      gridData2: [],
      activeNames: [],
      editCustomerDetailVisible: false,
      addEditContactsVisible: false,
      addFollowUpVisible: false,
      releasePrivateCustomerVisible: false,
      companyInfo: {},
      leader: {},
      businessList: [],
      stageVisible: false, // 阶段变更 按钮弹窗显示因此按钮
      assignAdvisorVisible: false,
      changeCustomerVisible: false,
      sysUserPageList: {},
      searchData: {
        deptTreeList: [],
        sysUserPageList: []
      },
      dialogVisible: {
        assignAdviserVisible: false, // 分配顾问 弹窗标示
        changeCustomerVisible: false, // 变更客户 弹窗标示
        auditCustomerVisible: false // 审核无效客户 弹窗标示
      }
    }
  },
  watch: {
    businessList: {
      handler: function(val, oldVal) {
        if (val.length > 0) {
          this.$set(this.activeNames, 0, val[0].businessId)
        }
      },
      deep: true,
      immediate: true
    },
    addFollowUpVisible: function(valnew, valold) {
      const _this = this
      if (!valnew) {
        _this.getBusinessPagerInfo()
        _this.getCustomerDynamic()
      }
    }
  },
  created() {
    this.currentCompanyId = this.$route.params.currentCompanyId
    this.gridDataLatent.userParams.companyId = this.currentCompanyId
    this.commonParams.companyId = this.$route.params.currentCompanyId
    const temp = getLoginRoleId()
    this.roleIds = temp
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getCustomerDynamic()
      this.getCompanyInfo()
      this.getLatentInfo()
      this.getBusinessPagerInfo()
      this.getDeptTree()
      this.getCurUserPage()
    },
    // 获取部门树状列表
    getDeptTree() {
      const _this = this
      getDeptTreeList().then(response => {
        if (response.data.code === 10000 && response.data.data !== null) {
          this.$set(this.searchData, 'deptTreeList', response.data.data)
        } else {
          _this.$message.warning(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 获取当前用户及下属用户列表
    getCurUserPage() {
      const _this = this
      getCurrentUserDeptUsers().then(response => {
        if (response.data.code === 10000 && response.data.data !== null) {
          this.$set(this.searchData, 'sysUserPageList', response.data.data)
        } else {
          _this.$message.warning(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 获取公司的动态记录
    getCustomerDynamic() {
      const map = new Map()
      map.set(1, '跟进记录')
      map.set(2, '释放到海')
      map.set(3, '转移客户')
      map.set(4, '捡入私海')
      map.set(5, '分配客户')
      map.set(6, '变更客户')
      map.set(7, '创建客户')
      map.set(8, '无效释放审核')
      map.set(9, '延期释放')
      this.$set(this.gridData3, 'listLoading', true)
      this.formInline.companyId = this.$route.params.currentCompanyId
      getCustomerDynamics(this.formInline).then(response => {
        this.gridData3 = Object.assign({}, this.gridData3, {
          list: response.data.data,
          total: response.data.total,
          start: response.data.start,
          length: response.data.length,
          listLoading: false
        })
        this.formInline.total = response.data.total
        this.gridData3.list.map(customerDynamic => {
          customerDynamic.dynamicLogName = map.get(customerDynamic.dynamicLogName)
          if (customerDynamic.oldCounselorName === null || customerDynamic.newCounselorName === null) {
            customerDynamic.info = ''
          } else {
            customerDynamic.info = ` 旧顾问: ${customerDynamic.oldCounselorName}  新顾问：${customerDynamic.newCounselorName}`
          }
          return customerDynamic
        })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    //  获取公司的详细信息
    getCompanyInfo() {
      const _this = this
      // 查询主公司信息
      if (_this.currentCompanyId == null) {
        _this.currentCompanyId = _this.$route.params.currentCompanyId
      }
      getCompanyDetail(this.commonParams).then(response => {
        if (response.data.data.length === 1) {
          this.companyInfo = response.data.data[0]
        }
      }).catch((err) => {
        console.log('err', err)
      })
      // 查询子公司信息
      getCompanyChildrenDetail({ companyId: _this.currentCompanyId }).then(response => {
        if (response.data.data.length > 0) {
          this.companyChildren = response.data.data
        }
      })
      // 获取顾问信息
      getLeaderInfo({ companyId: _this.currentCompanyId }).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.leader = response.data.data[0]
        }
      })
    },
    // 获取公司下联系人信息
    getLatentInfo() {
      const _this = this
      _this.$set(_this.gridDataLatent, 'listLoading', true)
      getLatentUserPager(_this.gridDataLatent.userParams).then(response => {
        _this.gridDataLatent = Object.assign({}, _this.gridDataLatent, {
          list: response.data.data,
          listLoading: false
        })
        _this.$set(_this.gridDataLatent.userParams, 'total', response.data.total)
        _this.$set(_this.gridDataLatent.userParams, 'start', response.data.start)
        _this.$set(_this.gridDataLatent.userParams, 'length', response.data.length)

        _this.gridDataLatent.list.map(user => {
          if (user.onJobFlag === 0) {
            user.onJobFlag = true
            return user
          } else {
            user.onJobFlag = false
            return user
          }
        })
      }).catch((err) => {
        this.$message.error(err)
      })
    },

    // 设置为父公司信息
    setChild2ParentInfo(val) {
      const _this = this
      setChild2Parent({ companyId: val }).then(response => {
        if (response.data.code === 10000) {
          this.$message.success(response.data.message)
          getCompanyChildrenDetail({ companyId: _this.currentCompanyId }).then(response => {
            if (response.data.data.length > 0) {
              this.companyChildren = response.data.data
            }
          })
        } else {
          this.$message.error('操作失败')
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 获取商机分页信息
    getBusinessPagerInfo() {
      this.businessFormInline.companyId = this.$route.params.currentCompanyId
      getBusinessPager(this.businessFormInline).then(response => {
        if (response.data.code === 10000) {
          this.businessList = response.data.data
        }
      })
    },
    updateData(model, index) {
      const _this = this
      const stagePopperClass = 'stage-change' + index
      updateBusiness(model).then(response => {
        if (response.data.code === 10000) {
          clearTimeout(this.timer)
          _this.getBusinessPagerInfo()
          document.getElementsByClassName(stagePopperClass)[0].style.display = 'none'
          _this.$message.success(response.data.message)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
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
    },
    handleEditCustomerDetail() {
      this.editCustomerDetailVisible = true
    },
    handleFollowUp() {
      this.followUpVisible = true
    },
    /*
    * 设置用户为主显
    * pkSid: id
    * companyId: 公司ID
    * */
    handleChooseOrderWay(userId) {
      const _this = this
      const params = {
        companyId: _this.companyInfo.companyId,
        pkSid: _this.companyInfo.pkSid,
        mainLatentUserId: userId
      }
      updateCompanyInfo(params).then(response => {
        if (response.data.code === 10000) {
          _this.$message.success(response.data.message)
          this.getLatentInfo()
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
      this.chooseOrderWayVisible = true
    },

    /*
    * 添加/编辑联系人
    * type: 判断弹窗类型，true 编辑联系人， false 添加联系人
    * currentContactId: 当前用户的userId
    * */
    handleAddEditContacts(type, currentContactId) {
      this.currentContactId = currentContactId
      this.addEditContact = type
      this.addEditContactsVisible = true
    },

    handleAddFollowUp(type, ifEdit) {
      this.addBusiness = type
      this.editBusiness = ifEdit
      this.addFollowUpVisible = true
    },
    updateUserStatus(item) {
      const _this = this
      let onJobFlag = 0
      item.onJobFlag === true ? onJobFlag = 0 : onJobFlag = 1
      updateLatentUserDetail({ pkSid: item.pkSid, onJobFlag: onJobFlag }).then(response => {
        if (response.data.code === 10000) {
          _this.getLatentInfo()
          _this.$message.success(response.data.message)
        } else {
          _this.$message.errow(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
    },
    handleReleasePrivateCustomer() {
      this.releasePrivateCustomerVisible = true
    },
    // 分配顾问
    handleAssignAdvisor(val) {
      this.assignAdvisorVisible = true
      this.currentCompanyId = val
    },
    // 变更客户
    handleChangeCustomer(val) {
      this.changeCustomerVisible = true
      this.currentCompanyId = val
    },
    // 审核无效客户
    handleAuditCustomer(val) {
      this.dialogVisible.auditCustomerVisible = true
      this.currentCompanyId = val
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
