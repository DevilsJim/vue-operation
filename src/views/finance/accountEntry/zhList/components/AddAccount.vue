<template>
  <el-dialog
    title="添加账户"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="30%"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账户：" prop="accountCompany">
        <el-input v-model="ruleForm.accountCompany" placeholder="请输入账户" />
      </el-form-item>
      <el-form-item label="开户行：" prop="bankName">
        <el-input v-model="ruleForm.bankName" placeholder="请输入开户行" />
      </el-form-item>
      <el-form-item label="账号：" prop="bankNum">
        <el-input v-model="ruleForm.bankNum" placeholder="请输入账号" />
      </el-form-item>
    </el-form>
    <!--底部-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
import { saveZgAccount } from 'api/financeService'
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'AddAccount',
  props: {
    addAccount: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.addAccount,
      ruleForm: {},
      flag: false, // 不可通过点击外面关闭弹框
      rules: {
        accountCompany: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        bankNum: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    addAccount() {
      this.visible = this.addAccount
    }
  },
  methods: {
    // 打开弹框调取数据
    openDialog() {},

    // 取消/重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:addAccount', false)
    },

    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },

    // 添加账户保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          saveZgAccount(this.ruleForm).then(res => {
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

<style>

</style>
