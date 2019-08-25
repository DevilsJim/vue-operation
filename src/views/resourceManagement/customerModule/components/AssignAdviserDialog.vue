<template>
  <el-dialog title="分配顾问" :close-on-click-modal="flag" :visible.sync="templateDialog" width="600px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" size="mini" :model="temp" label-width="120px">
      <el-form-item label="将客户变更给:">
        <!--<el-select v-model="temp.userId" style="width: 45%" filterable placeholder="请选择部门" clearable>-->
        <!--<el-option-->
        <!--v-for="item in propsDeptId"-->
        <!--:key="item.pkSid"-->
        <!--:label="item.nickname"-->
        <!--:value="item.pkSid"-->
        <!--/>-->
        <!--</el-select>-->

        <el-select v-model="temp.userId" style="width: 45%" value="" filterable placeholder="请选择顾问" clearable>
          <el-option
            v-for="item in sysUserPageList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分配备注:">
        <el-input v-model="temp.remark" type="textarea" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="templateDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSysUserPageList, collectCompanyToOther } from '@/api/customerService'
export default {
  inject: ['reload'],
  name: 'AssignConsultantsDialog',
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
      temp: {
        userId: null
      },
      rules: {
        userId: [
          { required: true, message: '请选则顾问', trigger: 'change' }
        ]
      },
      selectDeptId: [],
      propsDeptId: {
        label: 'deptName',
        value: 'pkSid',
        children: 'children',
        checkStrictly: true
      }, // 选择部门props设置
      userList: []
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
    'searchData.sysUserPageList': {
      handler: function(val, oldVal) {
        this.userList = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleDeptTree(val) {
      if (val.length > 0) {
        this.getSysUserPage(val.slice(val.length - 1))
        this.temp.deptIds = val.slice(val.length - 1).toString()
        // console.log('formInline.deptIds', this.formInline.deptIds)
      } else {
        this.userList = this.searchData.sysUserPageList
        this.temp.userId = null
      }
    },
    // 根据部门id集合获取本部门及下级部门员工集合
    getSysUserPage(val) {
      getSysUserPageList({ deptList: val }).then(response => {
        this.userList = response.data.data
        this.temp.userId = null
      }).catch((err) => {
        console.log('err', err)
      })
    },
    closeDia(formName) {
      this.temp = {}
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
    },
    save(formName) {
      this.temp.companyId = this.currentCompanyId
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          collectCompanyToOther(_this.temp).then(response => {
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
        }
      })
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
