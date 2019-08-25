<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 选择搜索条件 -->
      <el-form-item>
        <el-select v-model="searchCriteria" clearable placeholder="请选择搜索条件">
          <el-option label="公司名称" value="companyName" />
          <el-option label="联系人姓名" value="latentNickName" />
          <el-option label="联系人手机号" value="latentUserMobile" />
          <el-option label="联系人座机号" value="latentTelephone" />
        </el-select>
      </el-form-item>
      <!-- 输对应搜索条件的内容 -->
      <el-form-item :class="{'show': isSearchConShow}" class="search-con">
        <el-input v-model="searchCon" :placeholder="searchPlaceholder" clearable />
      </el-form-item>
      <!-- 下次跟进时间 -->
      <el-form-item>
        <el-date-picker
          v-model="createdTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始创建时间"
          end-placeholder="结束创建时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleCreatedTime"
        />
      </el-form-item>
      <!-- 是否付费 -->
      <el-form-item>
        <el-select v-model="formInline.companySign" clearable placeholder="请选择是否付费">
          <el-option label="新客户" value="0" />
          <el-option label="已付费" value="1" />
        </el-select>
      </el-form-item>
      <!-- 意向度 -->
      <el-form-item>
        <el-select v-model="formInline.intentionLevel" clearable placeholder="请选择意向度">
          <el-option label="无意向" value="0" />
          <el-option label="有意向" value="1" />
          <el-option label="高意向" value="2" />
        </el-select>
      </el-form-item>
      <!-- 客户价值 -->
      <el-form-item>
        <el-select v-model="formInline.worthLevel" clearable placeholder="请选择客户价值">
          <el-option label="低价值" value="0" />
          <el-option label="中价值" value="1" />
          <el-option label="高价值" value="2" />
        </el-select>
      </el-form-item>
      <!-- 公司所在地 -->
      <el-form-item>
        <el-input v-model="formInline.licenseAddress" placeholder="请输入公司所在地" />
      </el-form-item>
      <!-- 查询公司范围 -->
      <el-form-item>
        <el-select v-model="formInline.ifParentCompany" clearable placeholder="请选择查询公司范围">
          <el-option label="全部公司" value="1" />
          <el-option label="主显公司" value="1" />
          <el-option label="从显公司" value="2" />
        </el-select>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      v-loading="listData.listLoading"
      :data="listData.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="客户名称" width="220" class-name="company-name" header-align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/customerManagement/resourceCustomerDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}
              <el-popover
                placement="bottom"
                trigger="hover"
                popper-class="remark-popover"
              >
                <p class="remark-tit">最后一次跟进</p>
                <p class="remark-con">{{ scope.row.remark }}</p>
                <svg-icon slot="reference" icon-class="message" class-name="message" />
              </el-popover>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="联系人信息" width="195" class-name="user-info" header-align="center">
        <template slot-scope="scope">
          <span class="user-name">姓名: {{ scope.row.latentNickName }}</span>
          <span class="user-phone">电话: {{ (scope.row.latentUserMobile == null || scope.row.latentUserMobile == "") ? "" : scope.row.latentUserMobile.substr(0,3) + "****" + scope.row.latentUserMobile.substr(7,scope.row.latentUserMobile.length -6) }}</span>
          <el-tooltip placement="top" content="点击发送短信">
            <svg-icon icon-class="mail" class-name="mail" />
          </el-tooltip>
          <el-tooltip placement="top" content="点击拨打电话">
            <svg-icon icon-class="phone" class-name="phone" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="客户标签" width="190" class-name="tags" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.companySign != 2" size="mini">{{ scope.row.companySign | companySignFilter }}</el-tag>
          <el-tag v-if="scope.row.intentionLevel != 0" size="mini">{{ scope.row.intentionLevel | intentionLevelFilter }}</el-tag>
          <el-tag v-if="scope.row.worthLevel != 0" size="mini">{{ scope.row.worthLevel | worthLevelFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="释放原因" min-width="80" align="center">
        <template slot-scope="scope">{{ scope.row.lastDynamicLogRemark }}</template>
      </el-table-column>
      <el-table-column label="客户所在地" min-width="120">
        <template slot-scope="scope">{{ scope.row.licenseAddress }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="意向业务" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>
      <el-table-column label="行业" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.companyBusinessProfession }}</template>
      </el-table-column>
      <el-table-column label="最新动态" min-width="160" class-name="dynamic">
        <template slot-scope="scope">
          <span>{{ scope.row.lastDynamicLogOperator }}：{{ scope.row.lastDynamicLogName | lastDynamicLogNameFilter }}</span>
          <span>{{ scope.row.lastDynamicLogTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付费金额" prop="payMoney" sortable width="105" align="center" />
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$emit('pickUpPrivate', scope.row.companyId)">捡入私海</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page="listData.start"
      :page-size="listData.length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomerListTable',
  filters: {
    // 客户标签
    companySignFilter(status) {
      const statusMap = {
        0: '新客户',
        1: '渠道用户'
      }
      return statusMap[status]
    },
    // 意向级别
    intentionLevelFilter(status) {
      const statusMap = {
        0: '',
        1: '无意向',
        2: '有意向',
        3: '高意向'
      }
      return statusMap[status]
    },
    // 价值级别
    worthLevelFilter(status) {
      const statusMap = {
        0: '',
        1: '低价值',
        2: '中价值',
        3: '高价值'
      }
      return statusMap[status]
    },
    // 会员类型
    memberLevelFilter(status) {
      const statusMap = {
        0: '红苹果',
        1: '青苹果'
      }
      return statusMap[status]
    },
    // 意向业务
    businessPurposeFilter(status) {
      const statusMap = {
        1: '商标服务',
        2: '专利',
        3: '版权',
        4: '财税',
        5: '其他'
      }
      return statusMap[status]
    },
    // 客户类型
    companyTypeFilter(status) {
      const statusMap = {
        0: '个人',
        1: '公司',
        2: '个体工商户'
      }
      return statusMap[status]
    },
    // 客户类型
    lastDynamicLogNameFilter(status) {
      const statusMap = {
        1: '跟进记录',
        2: '释放到公海',
        3: '转移客户',
        4: '渐入私海',
        5: '分配客户',
        6: '变更客户',
        7: '创建客户'
      }
      return statusMap[status]
    }
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
      searchCriteriaTxt: { // 当选择搜索条件是，展示对应搜索条件输入框的 placeholder 值
        companyName: '公司名称',
        latentNickName: '联系人姓名',
        latentUserMobile: '联系人手机号',
        latentTelephone: '联系人座机号'
      },
      searchCriteria: null, // 搜索条件
      searchCon: '', // 搜索条件对应的输入框
      searchPlaceholder: null, // 搜索条件对应的输入框的输入内容信息提示
      isSearchConShow: false,
      createdTime: null, // 创建时间
      formInline: { // 传参字段
        start: '1',
        length: '10',
        deleteStatus: '0'
      }
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.list = val.list
      },
      deep: true,
      immediate: true
    },
    formInline: {
      handler: function(val, oldVal) {
        console.log('formInline', val)
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
    }
  },
  methods: {
    /**
     * @desc 选择创建时间
     * @author jinlijing
     */
    handleCreatedTime(val) {
      if (val !== null) {
        this.$set(this.formInline, 'startCreatedTime', val[0])
        this.$set(this.formInline, 'endCreatedTime', val[1])
      } else {
        this.$set(this.formInline, 'startCreatedTime', '')
        this.$set(this.formInline, 'endCreatedTime', '')
      }
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
      this.searchCriteria = null
      this.createdTime = null
      this.$message('重置搜索项!')
    },

    handleSelectionChange(val) {
      console.log(val)
    },

    /**
     * @desc 每页条数 listData.list.length
     * @author jinlijing
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    /**
     * @desc 当前页 listData.list.start
     * @author jinlijing
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-list-table{
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
    .el-form-item{
      &.search-con, &.follow-time, &.created-time{
        display: none;
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
