<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="30%"
    class="addOrEditCompany"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <!--点击【添加】显示内容-->
      <div v-if="type=='1'">
        <el-form-item label="公司名称：">
          <span>{{ itemInfo.deptName }}</span>
        </el-form-item>
        <!--循环 商品份分类-->
        <template v-for="(item,index) in ruleForm.zgBcompanyPtypeAccountList">
          <div :key="item.ptypeId">
            <el-form-item label="商品分类：" style="margin-bottom: 0;">
              <el-radio-group v-model="item.ptypeId">
                <el-radio label="1">{{ item.ptypeName }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="入款公司："
              :prop="'zgBcompanyPtypeAccountList.'+index+'.accountId'"
              :rules="rules.accountId"
            >
              <el-select v-model="item.accountId" placeholder="请选择入款公司">
                <template v-for="i in allZgAccoutList">
                  <el-option :key="i.accountId" :label="i.accountCompany" :value="i.accountId" />
                </template>
              </el-select>
            </el-form-item>
          </div>
        </template>
      </div>

      <!--【编辑】 显示内容-->
      <div v-if="type=='3'">
        <el-form-item label="公司名称：">
          <span>{{ itemInfo.deptName }}</span>
        </el-form-item>
        <!--循环 商品份分类-->
        <template v-for="item in ruleForm.zgBcompanyPtypeAccountList">
          <div :key="item.ptypeId">
            <el-form-item label="商品分类：" style="margin-bottom: 0;">
              <el-radio-group v-model="item.ptypeId">
                <el-radio label="1">{{ item.ptypeName }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="入款公司：">
              <el-select v-model="item.accountId" placeholder="请选择入款公司">
                <template v-for="i in allZgAccoutList">
                  <el-option :key="i.accountId" :label="i.accountCompany" :value="i.accountId" />
                </template>
              </el-select>
            </el-form-item>
          </div>
        </template>
      </div>

      <!--点击【查看】显示内容-->
      <div v-if="type=='2'">
        <el-form-item label="公司名称：">
          <span>{{ itemInfo.deptName }}</span>
        </el-form-item>
        <template v-for="item in ruleForm.zgBcompanyPtypeAccountList">
          <div :key="item.ptypeId">
            <el-form-item label="商品分类：" style="margin-bottom: 0;">
              <el-radio-group v-model="item.ptypeId">
                <el-radio label="1">{{ item.ptypeName }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="入款公司：">
              <span>{{ item.accountCompany }} </span>
            </el-form-item>
          </div>
        </template>

      </div>
    </el-form>
    <!--底部-->
    <span v-if="type !=='2'" slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button size="small" type="primary" @click="type==='1'?submitForm('ruleForm'):updateMany('ruleForm')">确定</el-button>
    </span>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
import { getZgProductCategoryList } from 'api/productService'
import { getAllZgAccout, saveMany, getListByBranchCompanyId, updateMany } from 'api/financeService'
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'AddOrEditCompany',
  props: {
    addOrEditCompany: {
      type: Boolean,
      default: false
    },
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: this.addOrEditCompany,
      flag: false, // 不可通过点击外面关闭弹框
      rules: {
        accountId: [
          { required: true, message: '请选择入款公司', trigger: 'change' }
        ]
      },
      productCategoryList: [], // 商品类型列表
      allZgAccoutList: [], // 入账公司列表
      ruleForm: {
        branchCompanyId: this.itemInfo.branchCompanyId,
        zgBcompanyPtypeAccountList: [
          {
            ptypeId: '',
            ptypeName: ''
          }
        ]
      }
    }
  },
  watch: {
    addOrEditCompany() {
      this.visible = this.addOrEditCompany
    }
  },
  methods: {
    // 打开弹框调取数据
    openDialog() {
      this.ruleForm = {
        branchCompanyId: this.itemInfo.branchCompanyId,
        zgBcompanyPtypeAccountList: []
      }
      // 添加的时候调取
      if (this.type === '1') {
        // 调商品分类 接口
        this.getZgProductCategoryList()
      }
      // 如果是 编辑 、查看
      if (this.type === '2' || this.type === '3') {
        // 直接调取详情接口
        this.getListByBranchCompanyId()
      }
      this.getAllZgAccout()
    },

    // 查询商品一级分类
    getZgProductCategoryList() {
      getZgProductCategoryList({ parentId: 0, deleted: 0 }).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          console.log(response.data)
          // 赋值给 商品分类：
          this.productCategoryList = response.data.data
          const list = []
          this.productCategoryList.forEach(item => {
            list.push({
              ptypeId: item.categoryId,
              ptypeName: item.typeName
            })
          })
          this.ruleForm.zgBcompanyPtypeAccountList = list
        }
      })
    },

    // 入账公司 下拉框 接口
    getAllZgAccout() {
      getAllZgAccout().then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          console.log(response.data)
          // 赋值给 入账公司下拉框
          this.allZgAccoutList = response.data.data
          console.log('下拉框列表', this.allZgAccoutList)
        }
      })
    },

    // 取消/重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:addOrEditCompany', false)
    },

    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },

    // 添加 保存
    submitForm(formName) {
      // 调接口
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          saveMany(this.ruleForm).then(res => {
            if (res.data.code === 10000) {
              this.$message.success(res.data.message)
              this.resetForm(formName)
              this.reload() // 自动刷新列表
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 根据分公司业务id获取进账公司配置详情
    getListByBranchCompanyId() {
      getListByBranchCompanyId(this.itemInfo.branchCompanyId).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.ruleForm.zgBcompanyPtypeAccountList = response.data.data
        }
      })
    },

    // 编辑 保存
    updateMany(formName) {
      // 调接口
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          updateMany(this.ruleForm).then(res => {
            if (res.data.code === 10000) {
              this.$message.success(res.data.message)
              this.resetForm(formName)
              this.reload() // 自动刷新列表
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>

<style scoped>
  .addOrEditCompany /deep/ .el-radio__input{
    display: none;
  }
</style>

