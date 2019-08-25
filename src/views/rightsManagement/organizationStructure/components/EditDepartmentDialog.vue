<template>
  <el-dialog
    title="创建新的部门（或组织）"
    :visible.sync="templateDialog"
    :close-on-click-modal="flag"
    width="500px"
    @close="closeDia"
    @open="openDia"
  >

    <el-form ref="ruleForm" size="mini" :model="deptInfo" label-width="120px">
      <!-- 上级部门 -->
      <el-form-item label="上级部门:">
        <el-select v-model="deptInfo.upperDeptId" clearable placeholder="请选择上级部门">
          <el-option
            v-for="(item, index) in deptOptions"
            :key="index"
            :label="item.deptName"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 部门名称 -->
      <el-form-item label="部门名称:">
        <el-input v-model="deptInfo.deptName" placeholder="请输入部门名称" clearable />
      </el-form-item>
      <!-- 负责人 -->
      <el-form-item label="负责人:">
        <el-select v-model="deptInfo.deptLeaderId" clearable placeholder="请选择负责人">
          <el-option
            v-for="(item, index) in leaderOptions"
            :key="index"
            :label="item.leaderName"
            :value="item.deptLeaderId"
          />
          <el-option
            label="测试1"
            value="2"
          />
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态:" prop="onJobFlag">
        <el-radio v-model="deptInfo.status" :label="1">正常</el-radio>
        <el-radio v-model="deptInfo.status" :label="2">隐藏</el-radio>
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="templateDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="addOrEdit === 'edit' ? save('ruleForm') : add('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDept, updateDept } from '../../../../api/raw'

export default {
  inject: ['reload'],
  name: 'EditDepartmentDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentCompanyId: {
      type: String,
      default: null
    },
    currentContactId: {
      type: String,
      default: null
    },
    addEditContact: {
      type: Boolean,
      default: false
    },
    deptList: {
      type: Array,
      default: () => {
        return []
      }
    },
    editDataVisible: {
      type: Object,
      default: null
    },
    leaderDataVisible: {
      type: Array,
      default: () => {
        return []
      }
    },
    addOrEditVisible: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: this.visible,
      deptOptions: [],
      editDeptData: {},
      leaderOptions: [],
      deptInfo: {
        deptName: '',
        status: 1,
        pkSid: 0,
        deptLeaderId: '',
        upperDeptId: ''
      },
      postData: {},
      addOrEdit: 'add'
    }
  },
  watch: {
    visible() {
      this.templateDialog = this.visible
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:visible', false)
      this.deptInfo = {
        deptName: '',
        status: 1,
        pkSid: 0,
        deptLeaderId: '',
        upperDeptId: ''
      }
      this.editDeptData = {}
      this.leaderOptions = []
    },
    openDia() {
      this.deptOptions = this.deptList
      this.leaderOptions = this.leaderDataVisible
      if (this.addOrEditVisible === 'edit') {
        this.deptInfo.deptName = this.editDataVisible.deptName
        this.deptInfo.pkSid = this.editDataVisible.pkSid
        this.deptInfo.status = this.editDataVisible.status
        this.deptInfo.deptLeaderId = this.editDataVisible.deptLeaderId
        this.deptInfo.upperDeptId = this.editDataVisible.upperDeptId
      }
      this.addOrEdit = this.addOrEditVisible
    },
    save(formName) {
      console.log(this.deptInfo)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDept(this.deptInfo).then(response => {
            if (response.data.code === 10000) {
              this.$message.success(response.data.message)
              this.reload()
            } else {
              this.$message.error(response.data.message)
            }
            this.closeDia()
          }).catch((error) => {
            this.$message.warning(error)
          })
        } else {
          this.$message.warning('请完善您的数据')
          return false
        }
      })
    },
    add(formName) {
      this.postData = {
        deptLeaderId: this.deptInfo.deptLeaderId,
        deptName: this.deptInfo.deptName,
        status: this.deptInfo.status,
        upperDeptId: this.deptInfo.upperDeptId
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addDept(this.postData).then(response => {
            if (response.data.code === 10000) {
              this.$message.success(response.data.message)
              this.reload()
            } else {
              this.$message.error(response.data.message)
            }
            this.closeDia()
          }).catch((error) => {
            this.$message.warning(error)
          })
        } else {
          this.$message.warning('请完善您的数据')
          return false
        }
      })
      console.log(this.postData)
    }
  }
}
</script>

<style scoped>
  /deep/ .el-dialog .el-dialog__header{
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  /deep/ .el-dialog .el-dialog__body{
    padding:30px 80px 0 50px
  }
  /deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
    font-weight: normal;
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
