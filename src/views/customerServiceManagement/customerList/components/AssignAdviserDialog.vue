<template>
  <el-dialog title="分配顾问" :close-on-click-modal="flag1" :visible.sync="templateDialog" width="600px" @close="closeDia">
    <el-form ref="ruleFollowForm" :rules="followRules" size="mini" :model="followData" label-width="120px">
      <!-- 部门名称 -->
      <el-form-item label="部门名称:">
        <el-cascader
          v-model="selectDeptId"
          :props="propsDeptId"
          :options="searchData.deptTreeList"
          :show-all-levels="false"
          clearable
          placeholder="请选择部门"
          @change="handleDeptTree"
        />
      </el-form-item>

      <!-- 小组名称 -->
      <!--<el-form-item label="小组名称:">-->
      <!--<el-select v-model="followData.businessPurpose" clearable placeholder="请选择小组名称">-->
      <!--</el-select>-->
      <!--</el-form-item>-->

      <!-- 顾问名称 -->
      <el-form-item label="顾问名称:">
        <el-select v-model="followData.userId" filterable placeholder="请选择顾问名称" clearable>
          <el-option
            v-for="item in userList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="$emit('update:visible', false)">取消</el-button>
      <el-button size="small" type="primary" @click="saveFollowData(currentCompanyId)">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSysUserPageList, collectCompanyToOther } from '@/api/customerService'
export default {
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
    searchData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag1: false,
      templateDialog: false,
      followData: {
        userId: null
      },
      followRules: {
        followType: [
          { required: true, message: '请选择跟进方式', trigger: 'blur' }
        ],
        contactFlag: [
          { required: true, message: '请选择是否联系', trigger: 'blur' }
        ],
        customWorth: [
          { required: true, message: '请选择客户价值', trigger: 'blur' }
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
        this.followData.deptIds = val.slice(val.length - 1).toString()
        // console.log('formInline.deptIds', this.formInline.deptIds)
      } else {
        this.userList = this.searchData.sysUserPageList
        this.followData.userId = null
      }
    },
    // 根据部门id集合获取本部门及下级部门员工集合
    getSysUserPage(val) {
      getSysUserPageList({ deptList: val }).then(response => {
        this.userList = response.data.data
        this.followData.userId = null
      }).catch((err) => {
        console.log('err', err)
      })
    },
    closeDia() {
      this.$emit('update:visible', false)
      this.followData = {}
    },
    saveFollowData(formName) {
      this.followData.companyId = this.currentCompanyId
      const _this = this
      _this.$refs['ruleFollowForm'].validate((valid) => {
        if (valid) {
          collectCompanyToOther(_this.followData).then(response => {
            if (response.data.code === 10000) {
              _this.$message.success(response.data.message)
              _this.$emit('fetchData')
              _this.closeDia()
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
