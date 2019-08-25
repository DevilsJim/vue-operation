<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="公司账户列表" name="0">
        <el-button type="primary" size="small" style="margin-bottom: 15px;float: right" @click="handleAddAccount"><i class="el-icon-plus" />添加账户</el-button>
        <el-table
          v-loading="listData.listLoading"
          :data="listData.list"
          element-loading-text="Loading"
          fit
          border
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column label="账户名称">
            <template slot-scope="scope">
              {{ scope.row.accountCompany }}
            </template>
          </el-table-column>
          <el-table-column label="开户行">
            <template slot-scope="scope">{{ scope.row.bankName }}</template>
          </el-table-column>
          <el-table-column label="账号">
            <template slot-scope="scope">{{ scope.row.bankNum }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--flag 进账公司是否有汇入途径-->
              <!--添加 按钮 一直显示-->
              <el-button size="mini" type="primary" @click="handleAdd(scope.row)">添加</el-button>
              <!--flag 为 true 显示 编辑 按钮-->
              <el-button v-if="scope.row.flag===true" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.flag===true" size="mini" type="primary" @click="handleSee(scope.row)">查看</el-button>
              <!--去掉删除了-->
              <!--<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
    <!--添加账户-->
    <add-account :add-account.sync="addAccount" />

    <!--添加 / 编辑 / 查看-->
    <add-or-edit-or-see-channel :add-edit-see-channel.sync="addEditSeeChannel" :item-info="itemInfo" :title="title" :show-type="showType" />

  </div>
</template>

<script type="text/ecmascript-6">
import AddAccount from './components/AddAccount.vue'
import AddOrEditOrSeeChannel from './components/AddOrEditOrSeeChannel.vue'
import { getAllZgAccout } from 'api/financeService'
export default {
  name: 'ZhList',
  components: {
    AddAccount,
    AddOrEditOrSeeChannel
  },
  data() {
    return {
      listData: {
        list: [],
        listLoading: false
      },
      addAccount: false, // 添加账户弹框默认关闭
      addEditSeeChannel: false, // 添加、编辑、查看 汇入途径 弹框默认关闭
      itemInfo: {}, // 弹框传过去的参数
      title: '', // 弹框title
      showType: '' // 弹框类型
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.$set(this.listData, 'listLoading', true)
      getAllZgAccout().then(response => {
        if (response.data.code === 10000) {
          this.listData = Object.assign({}, this.listData, {
            list: response.data.data,
            listLoading: false
          })
        }
      })
    },

    // 添加账户
    handleAddAccount() {
      this.addAccount = true
    },

    // 添加汇入途径
    handleAdd(item) {
      this.addEditSeeChannel = true
      this.itemInfo = item
      this.title = '添加汇入途径'
      this.showType = '1'
    },

    // 编辑汇入途径
    handleEdit(item) {
      this.addEditSeeChannel = true
      this.itemInfo = item
      this.title = '编辑汇入途径'
      this.showType = '3'
    },

    // 查看汇入途径
    handleSee(item) {
      this.addEditSeeChannel = true
      this.itemInfo = item
      this.title = '查看汇入途径'
      this.showType = '2'
    }
  }
}

</script>

<style>

</style>
