<template>
  <el-dialog
    title="匹配进账"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="30%"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="流水号：" prop="streamId">
        <el-input v-model="ruleForm.streamId" placeholder="请输入流水号" />
      </el-form-item>
      <el-form-item label="汇入途径：" prop="importRoute">
        <el-select v-model="ruleForm.importRoute" placeholder="请选择汇入途径">
          <template v-for="item in importRoutList">
            <el-option :key="item.importRouteId" :label="item.importRoute" :value="item.importRoute" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="到账时间：" prop="remitTime">
        <el-date-picker
          v-model="ruleForm.remitTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择到账时间"
        />
      </el-form-item>
      <el-form-item label="到账金额：" prop="money">
        <el-input v-model="ruleForm.money" placeholder="请输入到账金额" />
      </el-form-item>
      <el-form-item label="打款账户：" prop="customerName">
        <el-input v-model="ruleForm.customerName" placeholder="请输入打款账户" />
      </el-form-item>
      <el-form-item label="客户开户行：" prop="customerBank">
        <el-input v-model="ruleForm.customerBank" placeholder="请输入客户开户行" />
      </el-form-item>
      <el-form-item label="开户行账号：" prop="customerAccount">
        <el-input v-model="ruleForm.customerAccount" placeholder="请输入开户行账号" />
      </el-form-item>
      <el-form-item label="备注信息：" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注信息" resize="none" />
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
import { manMatchZgCustomerPayment, getImportRoutList } from 'api/financeService'
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'MatchedEntry',
  props: {
    matchedEntryDia: {
      type: Boolean,
      default: false
    },
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: this.matchedEntryDia,
      ruleForm: {},
      flag: false, // 不可通过点击外面关闭弹框
      rules: {
        streamId: [
          { required: true, message: '请输入流水号', trigger: 'blur' }
        ],
        importRoute: [
          { required: true, message: '请选择汇入途径', trigger: 'change' }
        ],
        remitTime: [
          { required: true, message: '请选择到账时间', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入到账金额', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '请输入打款账户', trigger: 'blur' }
        ],
        customerBank: [
          { required: true, message: '请输入客户开户行', trigger: 'blur' }
        ],
        customerAccount: [
          { required: true, message: '请输入开户行账号', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注信息', trigger: 'blur' }
        ]
      },
      importRoutList: [] // 汇入途径接口
    }
  },
  watch: {
    // 监听弹框是否显示
    matchedEntryDia() {
      this.visible = this.matchedEntryDia
    }
  },
  methods: {
    // 打开弹框
    openDialog() {
      this.ruleForm = {
        payId: this.itemInfo.payId // 支付表业务id
      }
      this.getImportRoutList()
    },

    // 汇入途径下拉框 数据
    getImportRoutList() {
      getImportRoutList().then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.importRoutList = response.data.data
        }
      })
    },

    // 取消/重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:matchedEntryDia', false)
    },

    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },

    // 保存
    submitForm(formName) {
      // 调接口
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          manMatchZgCustomerPayment(this.ruleForm).then(res => {
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
