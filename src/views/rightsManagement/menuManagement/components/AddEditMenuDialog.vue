<template>
  <el-dialog
    :title="title"
    :visible.sync="templateDialog"
    :close-on-click-modal="flag"
    width="520px"
    @close="closeDia('ruleForm')"
    @open="openDia"
  >

    <el-form ref="ruleForm" :rules="rules" size="mini" :model="menuInfo" label-width="120px">
      <!-- 上级菜单 -->
      <el-form-item v-if="menuData.addOrEdit === 'add'" label="上级菜单:">
        <el-tag size="medium" effect="dark" :type="addMenuData.addMenuType | tagTypeFilter">{{ addMenuData.pkName }}</el-tag>
      </el-form-item>
      <!-- 菜单类型 -->
      <el-form-item label="菜单类型:" prop="menuType">
        <template v-if="menuData.addOrEdit === 'add'">
          <el-radio v-if="[1].indexOf(addMenuData.addMenuType) > -1" v-model="menuInfo.menuType" :label="2">目录</el-radio>
          <el-radio v-if="[2, 3].indexOf(addMenuData.addMenuType) > -1" v-model="menuInfo.menuType" :label="3">菜单</el-radio>
          <el-radio v-if="addMenuData.addMenuType === 3" v-model="menuInfo.menuType" :label="4">按钮</el-radio>
        </template>
        <el-tag v-else size="medium" effect="dark" :type="menuInfo.menuType | tagTypeFilter">{{ menuInfo.menuType | menuTypeFilter }}</el-tag>
      </el-form-item>
      <!-- 菜单中文名称 -->
      <el-form-item label="菜单中文名称:" prop="name">
        <el-input v-model="menuInfo.name" placeholder="请输入菜单中文名称" clearable />
      </el-form-item>
      <!-- 菜单中文名称 -->
      <el-form-item v-if="menuInfo.menuType !== 4" label="菜单英文名称:" prop="ename">
        <el-input v-if="menuData.addOrEdit === 'add'" v-model="menuInfo.ename" placeholder="请输入菜单英文名称" clearable />
        <el-input v-else v-model="menuInfo.ename" placeholder="请输入菜单英文名称" clearable disabled />
      </el-form-item>
      <!-- 请求地址 -->
      <el-form-item v-if="menuInfo.menuType !== 4" label="请求地址:" prop="url">
        <el-input v-if="menuData.addOrEdit === 'add'" v-model="menuInfo.url" placeholder="请输入请求地址" clearable />
        <el-input v-else v-model="menuInfo.url" placeholder="请输入请求地址" clearable disabled />
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序:" prop="sort">
        <el-input v-model="menuInfo.sort" placeholder="请输入排序编号" clearable />
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态:" prop="status">
        <el-radio v-model="menuInfo.status" :label="1">启用</el-radio>
        <el-radio v-model="menuInfo.status" :label="2">停用</el-radio>
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button size="small" type="primary" @click="menuData.addOrEdit === 'edit' ? updateSave('ruleForm') : addSave('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSysMenu, updateSysMenu } from '@/api/raw'

export default {
  inject: ['reload'],
  name: 'EditDepartmentDialog',
  filters: {
    // 类目
    menuTypeFilter(status) {
      const statusMap = {
        1: '页签',
        2: '目录',
        3: '菜单',
        4: '按钮',
        5: '字段'
      }
      return statusMap[status]
    },
    // tag类型
    tagTypeFilter(status) {
      const statusMap = {
        1: 'info',
        2: '',
        3: 'success',
        4: 'danger',
        5: 'warning'
      }
      return statusMap[status]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Object,
      default: null
    }
  },
  data() {
    const sortValidator = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入排序编号'))
      } else {
        if (isNaN(value) || !(/^-?[1-9]\d*$/.test(value))) {
          return callback(new Error('请输入整数'))
        }
        callback()
      }
    }
    return {
      flag: false,
      title: '编辑菜单',
      templateDialog: this.visible,
      menuInfo: {},
      addMenuData: {},
      rules: {
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入菜单中文名称', trigger: 'blur' },
          { min: 0, max: 20, message: '菜单中文名称不能超过20个字符', trigger: 'blur' }
        ],
        ename: [
          { required: true, message: '请输入菜单英文名称', trigger: 'blur' },
          { min: 0, max: 50, message: '菜单英文名称不能超过20个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入请求地址', trigger: 'blur' }
        ],
        sort: [
          { validator: sortValidator, required: true, trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
    }
  },
  methods: {
    closeDia(formName) {
      this.$emit('update:visible', false)
      this.menuInfo = {}
      this.title = '编辑菜单'
      this.$refs[formName].resetFields()
    },
    openDia() {
      const addEditData = this.menuData.addEditData
      if (this.menuData.addOrEdit === 'edit') {
        this.title = '编辑菜单'
        this.menuInfo = Object.assign({}, this.menuInfo, {
          pkSid: addEditData.pkSid,
          pid: addEditData.pid,
          name: addEditData.name,
          ename: addEditData.ename,
          sort: addEditData.sort,
          status: addEditData.status,
          url: addEditData.url,
          menuType: addEditData.menuType
        })
      } else {
        this.title = '新增子菜单'
        this.menuInfo = Object.assign({}, this.menuInfo, {
          pid: addEditData.pkSid
        })
        this.addMenuData = Object.assign({}, this.addMenuData, {
          pkName: addEditData.name,
          addMenuType: addEditData.menuType
        })
      }
    },
    // 编辑
    updateSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateSysMenu(this.menuInfo).then(response => {
            if (response.data.code === 10000) {
              this.$message.success(response.data.message)
              this.reload()
            } else {
              this.$message.error(response.data.message)
            }
            this.closeDia(formName)
          }).catch((error) => {
            this.$message.warning(error)
          })
        } else {
          this.$message.warning('请完善您的数据')
          return false
        }
      })
    },
    // 新增
    addSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addSysMenu(this.menuInfo).then(response => {
            if (response.data.code === 10000) {
              this.$message.success(response.data.message)
              this.reload()
            } else {
              this.$message.error(response.data.message)
            }
            this.closeDia(formName)
          }).catch((error) => {
            this.$message.warning(error)
          })
        } else {
          this.$message.warning('请完善您的数据')
          return false
        }
      })
    },
    // 取消
    resetForm(formName) {
      this.templateDialog = false
      this.$refs[formName].resetFields()
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
