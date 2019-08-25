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
        <div class="tags">
          <template v-for="tag in companyInfo.tags">
            <el-tag v-for="item in tag.listTag" :key="item.tagId" :disable-transitions="false" size="small">{{ item.tagName }}</el-tag>
          </template>
          <el-button class="button-new-tag" size="small" @click="addTagsVisible = true">+ 标签</el-button>
        </div>
        <!--<p class="info"><span>客户地址：北京市海淀区清河街道23号院</span><span>默认发票抬头：北京知果科技公司</span></p>-->
        <!--<p class="info"><span>统一信用代码：LKJKJDK232039DKLKDKF239</span><span>默认收件人：张翰康</span></p>-->
      </div>
      <!--<div style="width: 50%; text-align: right; padding-top: 20px;" class="con-right">-->
      <!--<el-button size="small" type="primary" @click="pickUpPrivate">捡入私海</el-button>-->
      <!--</div>-->
    </el-container>

    <!-- 联系人 -->
    <div class="container-sub">
      <el-row>
        <el-col :span="12"><h3>联系人</h3></el-col>
        <el-col :span="12" style="text-align: right;" />
      </el-row>
      <el-table
        v-loading="gridDataLatent.listLoading"
        :data="gridDataLatent.list"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
      >
        <el-table-column label="姓名" prop="nickname" min-width="120" class-name="user-info" align="center" />
        <el-table-column label="职位" prop="duty" min-width="120" class-name="tags" align="center" />
        <el-table-column label="电话" prop="userMobile" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userMobile.substr(0,3) + "****" + scope.row.userMobile.substr(7,scope.row.userMobile.length -6) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座机号" prop="telephone" min-width="120" align="center" />
        <el-table-column label="微信" prop="wxNumber" min-width="180" align="center" />
        <el-table-column label="QQ" prop="qqNumber" min-width="120" align="center" />
        <el-table-column label="邮箱" prop="userEmail" min-width="200" align="center" />
        <el-table-column label="状态" min-width="150" align="center">
          <template slot-scope="scope"><span v-if="scope.row.onJobFlag === 0">在职</span><span v-if="scope.row.onJobFlag === 1">离职</span></template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="listQuery.start"
        :page-size="listQuery.length"
        :total="gridDataLatent.total"
        @size-change="handleLatentSizeChange"
        @current-change="handleLatentCurrentChange"
      />
    </div>

    <!-- 相关商机 -->
    <div class="container-sub">
      <el-row>
        <el-col :span="12"><h3>相关商机</h3></el-col>
      </el-row>
      <el-table
        :data="businessData.list"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        class="company-info-table"
      >
        <el-table-column label="商机编号" prop="businessId" width="250" class-name="user-info" align="center" />
        <el-table-column label="商机名称" width="220" class-name="company-name" header-align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/businessManagement/businessDetail/' + scope.row.businessId}">
              <div class="name">{{ scope.row.bussinessName }}</div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="userName" width="120" align="center" />
        <el-table-column label="意向业务" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
        </el-table-column>
        <el-table-column label="商机进度" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.businessProgress | businessProgressFilter }}</template>
        </el-table-column>
        <el-table-column label="成交几率" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.dealPercent }}%</template>
        </el-table-column>
        <el-table-column label="下次跟进时间" prop="nextFollowTime" width="200" align="center" />
        <el-table-column label="商机创建时间" prop="createTime" width="200" align="center" />
        <el-table-column label="操作" align="center" min-width="150" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{path:'/businessManagement/businessDetail/' + scope.row.businessId}">
              <el-button type="primary" size="mini">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="businessData.start"
        :page-size="businessData.length"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination-table"
        :total="businessData.total"
        @size-change="handleBusinessSizeChange"
        @current-change="handleBusinessCurrentChange"
      />
    </div>

    <!-- tab -->
    <div class="container-sub list-con">
      <el-main>
        <el-tabs v-model="activeTabsName" type="border-card">
          <!-- 动态记录 -->
          <el-tab-pane label="动态记录" name="first">
            <el-table :data="dynamicsInfo.list" border>
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
                  <el-row v-if="scope.row.ifFollowLog === 0">是</el-row>
                  <el-row v-if="scope.row.ifFollowLog === 1">否</el-row>
                </template>
              </el-table-column>
              <el-table-column min-width="200" prop="dealRemark" label="跟进/备注" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="dynamicsInfo.start"
              :page-size="dynamicsInfo.length"
              :total="dynamicsInfo.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>

          <!-- 工商信息 -->
          <el-tab-pane label="工商信息" name="second" class="business-info">
            <!-- 行业类型, 核准日期 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">行业类型</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.ntType }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">核准日期</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.apprDate }}</el-col>
            </el-row>
            <!-- 成立日期, 核准机构 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">成立日期</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.esDate }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">核准机构</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.regOrg }}</el-col>
            </el-row>
            <!-- 注册号, 营业期限制开始时间 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册号</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.regNo }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">营业期限制开始时间</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.opFrom }}</el-col>
            </el-row>
            <!-- 注册地址, 营业期限制结束时间 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册地址</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.dom }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">营业期限制结束时间</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.opTo }}</el-col>
            </el-row>
            <!-- 企业法人, 公司URL -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">企业法人</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.frName }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">公司URL</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.companyUrl }}</el-col>
            </el-row>
            <!-- 注册资本, 行业评分(总分10000) -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册资本</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.regCap }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">行业评分(总分10000)</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266" />
            </el-row>
            <!-- 实收注册资金, 行业平分(总分10000) -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">实收注册资金</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;" />
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">公司评分(总分10000)</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266" />
            </el-row>
            <!-- 企业类型, 经营范围 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">企业类型</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.ntType != 'N/A' ? commerceInfo.ntType : "" }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">经营范围</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.opScope }}</el-col>
            </el-row>
            <!-- 组织机构代码 -->
            <el-row style="background:rgba(240, 247, 252, 0.6)">
              <el-col :span="4">组织机构代码</el-col>
              <el-col :span="20" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266; background:#fff;">{{ commerceInfo.shxydm }}</el-col>
            </el-row>
          </el-tab-pane>
          <!-- 商标信息 -->
          <el-tab-pane label="商标信息" name="third">
            <el-table :data="trademarkInfo.list" border>
              <el-table-column width="200" prop="markName" label="商标名称" align="center" />
              <el-table-column width="100" prop="unionTypeCode" label="国际分类" align="center" />
              <el-table-column min-width="200" prop="typeDetailDesc" label="商品服务列表" />
              <el-table-column width="100" prop="beginDate" label="专用期起" align="center" />
              <el-table-column min-width="100" prop="endDate" label="专用期止" />
              <el-table-column min-width="100" prop="appDate" label="申请日期" />
            </el-table>
            <!--分页-->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="trademarkInfo.start"
              :page-size="trademarkInfo.pagerSize"
              :total="trademarkInfo.total"
              @size-change="handleTrademarkSizeChange"
              @current-change="handleTrademarkCurrentChange"
            />
          </el-tab-pane>
          <!-- 专利信息 -->
          <el-tab-pane label="专利信息" name="fourth">
            <el-table :data="parentInfo.list" border>
              <el-table-column min-width="200" prop="fzlMc" label="专利名称" align="center" />
              <el-table-column width="200" prop="fsqSqh" label="申请号" align="center" />
              <el-table-column min-width="200" prop="fzlZllx" label="专利类型" />
              <el-table-column prop="fzlZflh2" label="IPC/IDC分类" align="center" />
              <el-table-column min-width="200" prop="endDate" label="法律状态" />
              <el-table-column min-width="100" prop="fzlSqr" label="申请日期" />
            </el-table>
            <!--分页-->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="parentInfo.start"
              :page-size="parentInfo.pagerSize"
              :total="parentInfo.total"
              @size-change="handleParentSizeChange"
              @current-change="handleParentCurrentChange"
            />
          </el-tab-pane>
          <!-- 订单信息 -->
          <!--<el-tab-pane label="订单信息" name="fourth">
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
                 分页
                <el-pagination
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :current-page="1"
                  :page-size="10"
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
           咨询记录
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
             分页
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="1"
              :page-size="10"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
           发票记录
          <el-tab-pane label="发票记录" name="sixth">
            <el-table :data="gridData2" border>
              <el-table-column width="150" prop="dynamicName" label="基本信息" />
              <el-table-column width="160" prop="time" label="服务信息" align="center" />
              <el-table-column width="100" prop="operator" label="发票信息" align="center" />
              <el-table-column min-width="200" prop="operationContent" label="收件人信息" />
              <el-table-column width="90" prop="isFollowUp" label="发票状态" align="center" />
              <el-table-column min-width="200" label="操作" />
            </el-table>
             分页
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="1"
              :page-size="10"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
           文件记录
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
                 分页
                <el-pagination
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :current-page="1"
                  :page-size="10"
                  :total="100"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </el-tab-pane>
              <el-tab-pane label="官文" name="fourth2" />
              <el-tab-pane label="所有客户" name="fourth3" />
            </el-tabs>
          </el-tab-pane>
           其他顾问订单
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
             分页
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="1"
              :page-size="10"
              :total="100"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>-->
        </el-tabs>
      </el-main>
    </div>

    <!-- 添加标签 -->
    <add-tags-dialog :visible.sync="addTagsVisible" :existing-tags="companyInfo.tags" :company-id.sync="currentCompanyId" />

  </div>
</template>

<script>
import { COMPANY_TYPE_MAP, DYNAMIC_NAME_MAP, TRUE_OR_FALSE } from '@/store/constants'
import { getCompanyRelation, getUserPrivate, getCompanyInfo, getUserPrivateList, getCrmDynamicLog, pickUpPrivate } from '@/api/table'
import { getBusinessList } from '@/api/business'
import { getParentInfo, getTrademarkInfo, getCommerceInfo } from '@/api/customerService'
import AddTagsDialog from './components/AddTagsDialog'

export default {
  inject: ['closeSelectedTag'],
  name: 'CustomerDetail',
  components: {
    AddTagsDialog
  },
  props: {
    tagsList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      activeTabsName: 'first',
      activeTabsName1: 'fourth1',
      postForm: {
        companyId: ''
      },
      listQuery: {
        start: 1,
        length: 10,
        companyId: this.companyId
      },
      listQueryDynamic: {
        start: 1,
        length: 10,
        companyId: this.companyId
      },
      currentCompanyId: null,
      currentCompanyName: null,
      companyInfo: {
        tags: []
      },
      COMPANY_TYPE_MAP: COMPANY_TYPE_MAP,
      DYNAMIC_NAME_MAP: DYNAMIC_NAME_MAP,
      TRUE_OR_FALSE: TRUE_OR_FALSE,
      userPrivate: {
        createUserName: '',
        createTime: ''
      },
      listLoading: true,
      gridDataLatent: {
        list: [],
        listLoading: true,
        total: 0
      },
      gridData: [],
      dynamicsInfo: {
        list: [],
        listLoading: true,
        total: 0,
        pagerSize: 10,
        start: 1
      },
      gridData2: [],
      businessInfoParams: {
        start: '1',
        length: '10',
        selectType: '0', //  跟进时间 0.全部 1.近三天待跟进 2.近一周待跟进 3.近一月待跟进 4.超一个月未回访
        businessType: '-1', // 来源 -1.全部 0.我创建的 1.他人转入 2.组内释放商机-待处理（组内商机释放列表必填条件，待处理-值为2） 3.组内释放商机-已失效（组内商机释放列表必填条件，已失效-值为3）
        dealType: '-1', // 成交标识 -1.全部 0.未成交（即我的商机和他人转入列表错用参数） 1.已成交商机
        businessPurpose: '-1', // 意向业务： -1.全部 1，商标服务，2：专利，3：版权，4：财税，5：其他， 6.项目、7.高新、8.商标交易 9.法律服务、10.人事社保、11.工商 12.青苹果会员 13.红苹果会员
        businessProgress: '-1', // 阶段 -1.全部 0:初步洽谈，1：是否发送函件，2：是否约谈，3：销售报价，4：合同报价，5：项目失败，6：项目收款
        releasingFlage: '-1' // 即将掉落标识  -1.全部 0.非即将掉落 1.即将掉落（除即将掉落列表值为1外，其余都为0）
      }, // 相关商机参数
      businessData: {
        list: [],
        listLoading: true,
        total: 0
      }, // 相关商机信息
      addTagsVisible: false, // 添加标签
      parentInfoParams: {
        start: 1,
        length: 10
      }, // 专利信息参数
      parentInfo: {
        list: [],
        listLoading: true,
        total: 0
      }, // 专利信息
      trademarkInfoParams: {
        start: 1,
        length: 10
      }, // 商标信息参数
      trademarkInfo: {
        list: [],
        listLoading: true,
        total: 0
      }, // 商标信息
      commerceInfo: {
        list: [],
        listLoading: true,
        total: 0
      } // 工商信息
    }
  },
  watch: {
    currentCompanyName: {
      handler(val, oldVal) {
        if (val) {
          this.getParentInfo()
          this.getTrademarkInfo()
          this.getCommerceInfo()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.currentCompanyId = this.$route.params.currentCompanyId
    this.fetchData()
    this.getBusinessPagerInfo()
  },
  methods: {
    fetchData() {
      const _this = this
      _this.listLoading = true
      if (_this.tableData) {
        _this.list = _this.tableData
        _this.listLoading = false
      }
      // 关系
      _this.postForm.companyId = _this.currentCompanyId
      getCompanyRelation(_this.postForm).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.lenght > 0) {
            _this.gridData = response.data.data
          }
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error)
      })
      // 公司信息
      getCompanyInfo(_this.postForm).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length > 0) {
            _this.companyInfo = response.data.data[0]
            _this.currentCompanyName = response.data.data[0].companyName
          }
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error)
      })
      // 负责人信息
      getUserPrivate(_this.postForm).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length > 0) {
            _this.userPrivate = Object.assign({}, _this.userPrivate, {
              createUserName: response.data.data[0].createUserName,
              createTime: response.data.data[0].createTime
            })
          }
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error)
      })
      // 联系人列表
      _this.getLatentInfo()
      _this.getCrmDynamicLog()
    },
    // 获取联系人列表
    getLatentInfo(val) {
      if (typeof val !== 'undefined') {
        this.listQuery = val
      }
      this.listQuery.companyId = this.$route.params.currentCompanyId
      this.$set(this.gridDataLatent, 'listLoading', true)
      getUserPrivateList(this.listQuery).then(response => {
        this.gridDataLatent = Object.assign({}, this.gridDataLatent, {
          list: response.data.data,
          total: response.data.total,
          listLoading: false
        })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 获取相关商机列表
    getBusinessPagerInfo() {
      this.$set(this.businessData, 'listLoading', true)
      this.$set(this.businessInfoParams, 'companyId', this.currentCompanyId)
      getBusinessList(this.businessInfoParams).then(response => {
        if (response.data.code === 10000) {
          this.businessData = Object.assign({}, this.businessData, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            length: response.data.length,
            listLoading: false
          })
        } else {
          this.$message.error(response.data.message)
          this.$set(this.businessData, 'listLoading', false)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 获取动态记录
    getCrmDynamicLog(val) {
      const _this = this
      if (typeof val !== 'undefined') {
        _this.listQueryDynamic = val
      }
      _this.listQueryDynamic.companyId = _this.$route.params.currentCompanyId
      _this.$set(_this.dynamicsInfo, 'listLoading', true)
      getCrmDynamicLog(_this.listQueryDynamic).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length > 0) {
            _this.dynamicsInfo = Object.assign({}, _this.dynamicsInfo, {
              list: response.data.data,
              total: response.data.total,
              start: response.data.start,
              length: response.data.length,
              listLoading: false
            })
          }
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error)
      })
    },
    // 捡入私海
    pickUpPrivate() {
      // 关系
      const _this = this
      _this.postForm.companyId = this.currentCompanyId
      pickUpPrivate(_this.postForm).then(response => {
        // 跳转到我的客户
        _this.closeSelectedTag()
        _this.$router.push({ path: '/customerManagement/myCustomer' })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 联系人分页 - 当前页
    handleLatentCurrentChange(val) {
      this.gridDataLatent.userParams.start = val
      this.getLatentInfo()
    },
    // 联系人分页 - 每页条数
    handleLatentSizeChange(val) {
      this.gridDataLatent.userParams.length = val
      this.getLatentInfo()
    },
    // 商机分页 - 当前页
    handleBusinessCurrentChange(val) {
      this.$set(this.businessInfoParams, 'start', val)
      this.getBusinessPagerInfo()
    },
    // 商机分页 - 每页条数
    handleBusinessSizeChange(val) {
      this.$set(this.businessInfoParams, 'length', val)
      this.getBusinessPagerInfo()
    },
    // 动态记录分页 - 当前页
    handleDynamicSizeChange(val) {
      this.dynamicsInfoParams.length = val
      this.getCrmDynamicLog()
    },
    // 动态记录分页 - 每页条数
    handleDynamicCurrentChange(val) {
      this.dynamicsInfoParams.start = val
      this.getCrmDynamicLog()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 获取专利信息
    getParentInfo() {
      const _this = this
      _this.$set(_this.parentInfo, 'listLoading', true)
      _this.$set(_this.parentInfoParams, 'companyName', _this.currentCompanyName)
      getParentInfo(_this.parentInfoParams).then(response => {
        if (response.data.code === 10000) {
          _this.parentInfo = Object.assign({}, _this.parentInfo, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            pagerSize: response.data.pagerSize,
            listLoading: false
          })
          console.log(_this.parentInfo)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 专利分页 - 当前页
    handleParentCurrentChange(val) {
      this.$set(this.parentInfoParams, 'start', val)
      this.getParentInfo()
    },
    // 专利分页 - 每页条数
    handleParentSizeChange(val) {
      this.$set(this.parentInfoParams, 'length', val)
      this.getParentInfo()
    },
    // 获取商标信息
    getTrademarkInfo() {
      const _this = this
      _this.$set(_this.trademarkInfo, 'listLoading', true)
      _this.$set(_this.trademarkInfoParams, 'companyName', _this.currentCompanyName)
      getTrademarkInfo(_this.trademarkInfoParams).then(response => {
        if (response.data.code === 10000) {
          _this.trademarkInfo = Object.assign({}, _this.trademarkInfo, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            pagerSize: response.data.pagerSize,
            listLoading: false
          })
          console.log(_this.trademarkInfo)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 商标分页 - 当前页
    handleTrademarkCurrentChange(val) {
      this.$set(this.trademarkInfoParams, 'start', val)
      this.getTrademarkInfo()
    },
    // 商标分页 - 每页条数
    handleTrademarkSizeChange(val) {
      this.$set(this.trademarkInfoParams, 'length', val)
      this.getTrademarkInfo()
    },
    // 获取工商信息
    getCommerceInfo() {
      const _this = this
      getCommerceInfo({ companyName: _this.currentCompanyName }).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length === 1) {
            _this.commerceInfo = response.data.data[0]
          }
          console.log('commerceInfo', _this.commerceInfo)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
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
    .tags{
      margin: 18px 0;
      font-size:0;
      .el-tag{
        font-size: 12px;
        vertical-align: top;
        margin-right: 15px;
      }
      .button-new-tag {
        height: 24px;
        padding: 0 8px;
        line-height: 22px;
        font-size: 12px;
        background: transparent;
      }
      .input-new-tag {
        width: 90px;
        height: 24px;
        line-height: 22px;
        vertical-align: bottom;
        background: transparent;
        /deep/ .el-input__inner{
          height: 24px;
          line-height: 26px;
          font-size: 12px;
          background: transparent;
        }
      }
    }
    p.info{
      color: #4a4a4a;
      margin: 0 0 20px 0;
      span:last-child{
        margin-left: 50px;
      }
    }
    .con-right{
      /deep/ .el-button{
        span{
          font-size: 16px;
        }
      }
    }
  }
  .container-sub{
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    padding: 18px 18px 20px;
    margin-bottom: 50px;
    .el-row{
      margin-bottom: 15px;
      h3{
        font-weight: normal;
        margin: 8px 0 0 ;
      }
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
