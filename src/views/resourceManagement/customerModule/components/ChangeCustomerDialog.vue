<template>
  <el-dialog title="变更客户" :close-on-click-modal="flag" :visible.sync="templateDialog" width="600px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" size="mini" :model="temp" label-width="120px">
      <!-- 当前顾问 -->
      <el-form-item label="当前顾问:">{{ now }}</el-form-item>
      <!-- 变更顾问 -->
      <el-form-item label="将客户变更给:" prop="userId">
        <!--<el-select v-model="temp.userId" style="width: 45%" filterable placeholder="请选择部门" clearable>
          <el-option
            v-for="item in sysUserPageList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>-->
        <el-select v-model="temp.userId" style="width: 45%" value="" filterable placeholder="请选择顾问" clearable>
          <el-option
            v-for="item in sysUserPageList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="temp.checked">短信通知客户</el-checkbox>
      </el-form-item>

      <p>尊敬的客户您好：您办理的知识产权业务，原顾问[{{ now }}]因工作调整，

        将不能再继续服务。平台为您分配了新的知产顾问：[顾问名]，电话[顾问电话]，

        新的知产顾问将在3个工作日内和您联系，您也可以直接和新顾问取得联系。

        如果您对新顾问不满意，可以联系客服电话，我们会为您更换顾问</p>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="templateDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeCompanyToOther } from '@/api/customerService'
export default {
  inject: ['reload'],
  name: 'ChangeCustomerDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentCompanyId: {
      type: String,
      default: ''
    },
    sysUserPageList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      temp: {},
      rules: {
        userId: [
          { required: true, message: '请选则顾问', trigger: 'change' }
        ]
      },
      checked: false,
      now: '扁桃',
      new: ''

    }
  },
  watch: {
    visible: {
      handler: function(val, oldVal) {
        this.templateDialog = val
      },
      deep: true,
      immediate: true
    },
    'temp.userId': {
      handler: function(val, oldVal) {
        // console.log(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDia(formName) {
      this.temp = {}
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
    },
    save(formName) {
      const _this = this
      _this.temp.companyId = _this.currentCompanyId
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          changeCompanyToOther(_this.temp).then(response => {
            if (response.data.code === 10000) {
              _this.$message.success(response.data.message)
              _this.closeDia('ruleForm')
              _this.reload()
            } else {
              _this.$message.error(response.data.message)
            }
          }).catch((error) => {
            _this.$message.error(error.toString())
          })
        } else {
          _this.$message.error('请填写跟进信息')
        }
      })
    },
    selectChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog .el-dialog__body{
  padding:30px 80px 0 50px
}
/deep/ .el-form .el-form-item__content .el-select {
  width: 100%;
}
.el-date-editor {
  width: 100%;
}
.el-cascader{
  width: 100%;
}
/deep/ .el-date-editor .el-range-input{
  width: 80%;
}
</style>
