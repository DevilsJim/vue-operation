<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="商品打款账户" name="0">
        <el-button type="primary" size="small" style="margin-bottom: 15px;float: right" @click="handleCompany"><i class="el-icon-plus" />添加公司</el-button>
        <el-table
          v-loading="listData.listLoading"
          :data="listData.list"
          element-loading-text="Loading"
          fit
          border
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column label="公司名称">
            <template slot-scope="scope">
              {{ scope.row.deptName }}
            </template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="scope">{{ scope.row.createName }}</template>
          </el-table-column>
          <el-table-column label="操作时间">
            <template slot-scope="scope">{{ scope.row.createDate }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--flag	是否配置产品进展公司：true 是 false 否-->
              <!--flag false 显示 添加-->
              <el-button v-if="scope.row.flag===false" size="mini" type="primary" @click="handleAdd(scope.row)">添加</el-button>
              <!--flag true 显示 编辑-->
              <el-button v-if="scope.row.flag===true" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="handleSee(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
    <!--添加 / 编辑 / 查看 -->
    <add-or-edit-company :add-or-edit-company.sync="addOrEditCompany" :item-info="itemInfo" :title="title" :type="type" />

    <!--添加公司-->
    <add-company :add-company.sync="addCompany" />

  </div>
</template>

<script type="text/ecmascript-6">
import AddOrEditCompany from './components/AddOrEditCompany.vue'
import AddCompany from './components/AddCompany.vue'
import { getList } from 'api/financeService'
export default {
  name: 'AccountSettings',
  components: {
    AddOrEditCompany,
    AddCompany
  },
  data() {
    return {
      listData: {
        list: [],
        listLoading: false
      },
      addOrEditCompany: false, // 默认弹框关闭
      addCompany: false, // 默认添加公司弹框关闭
      itemInfo: {}, // 弹框传过去的参数
      title: '', // 弹框title
      type: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listData.listLoading = true
      getList().then(response => {
        if (response.data.code === 10000) {
          this.listData.list = response.data.data
          this.listData.listLoading = false
        }
      })
    },
    // 添加公司
    handleCompany() {
      this.addCompany = true
    },

    // 添加
    handleAdd(item) {
      this.addOrEditCompany = true
      this.title = '商品入账设置'
      this.itemInfo = item
      this.type = '1'
    },

    // 编辑
    handleEdit(item) {
      this.addOrEditCompany = true
      this.itemInfo = item
      this.title = '商品入账设置'
      this.type = '3'
    },

    // 查看
    handleSee(item) {
      this.addOrEditCompany = true
      this.itemInfo = item
      this.title = '商品入账详情'
      this.type = '2'
    }
  }
}

</script>

<style>

</style>

