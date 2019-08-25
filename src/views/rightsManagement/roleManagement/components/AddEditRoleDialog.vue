<template>
  <el-dialog
    :title="title"
    width="550px"
    :visible.sync="templateDialog"
    :close-on-click-modal="flag"
    @close="closeDia('ruleForm')"
    @open="openDia"
  >

    <el-form ref="ruleForm" :rules="rules" size="mini" :model="roleInfo" label-width="120px">
      <!-- 角色名称 -->
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="roleInfo.name" placeholder="请输入角色名称" style="width: 220px" />
      </el-form-item>
      <!-- 启用状态 -->
      <el-form-item label="启用状态:" prop="status">
        <el-switch
          v-model="roleInfo.status"
          active-color="#13ce66"
          active-value="1"
          inactive-value="2"
        />
      </el-form-item>
      <!-- 树形结构 -->
      <el-form-item label="菜单权限:" prop="menuTree">
        <el-tree
          ref="tree"
          show-checkbox
          check-strictly
          default-expand-all
          empty-text="还没有菜单，快去新增菜单吧！"
          node-key="pkSid"
          :data="menuList"
          :props="menuListProps"
          :default-checked-keys="roleInfo.menuIds"
          @check="handleCheck"
        />
        <div ref="menuTreeError" class="el-form-item__error menu-tree-error">请输入角色名称</div>
      </el-form-item>
    </el-form>

    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button size="small" type="primary" @click="roleData.addOrEdit === 'edit' ? updateSave('ruleForm') : addSave('ruleForm')">完成</el-button>
    </div>

  </el-dialog>

</template>

<script>
import { addSysRole, updateSysRole, getRoleMenuList } from '@/api/raw'

export default {
  inject: ['reload'],
  name: 'AddEditRoleDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleData: {
      type: Object,
      default: null
    },
    menuList: {
      type: Array,
      default: null
    }
  },
  data() {
    const menuTreeMobile = (rule, value, callback) => {
      if (this.roleInfo.menuIds.length === 0) {
        return callback(new Error('请选择菜单权限！'))
      } else {
        callback()
      }
    }
    return {
      flag: false,
      title: '新增角色',
      checkStrictly: true,
      templateDialog: false, // 外部弹层显示隐藏标识
      innerVisible: false, // 内部弹层显示隐藏标识
      roleInfo: {
        status: '1',
        menuIds: []
      }, // 当前角色列表
      menuListProps: { // 菜单树的 props
        children: 'children',
        label: 'name'
      },
      rules: { // 表单验证
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 0, max: 20, message: '角色名称不能超过20个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        menuTree: [
          { validator: menuTreeMobile, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible() {
      this.templateDialog = this.visible
    },
    'roleInfo.menuIds'(val) {
      console.log('roleInfo.menuIds', val)
    }
  },
  methods: {
    // 获取角色所配菜单详情
    getRoleMenuList(val) {
      const menuIds = []
      getRoleMenuList({ roleId: val }).then(response => {
        if (response.data.code === 10000) {
          if (response.data.code && response.data.data.length > 0) {
            response.data.data.forEach((item) => {
              menuIds.push(item.menuId)
            })
            this.$set(this.roleInfo, 'menuIds', menuIds)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 关闭外部弹层
    closeDia(formName) {
      this.$emit('update:visible', false)
      this.roleInfo = {
        status: '1',
        menuIds: []
      }
      this.$refs[formName].resetFields()
      this.$refs.tree.setCheckedKeys([])
      // this.$set(this.roleInfo, 'menuIds', [])
    },
    // 打开外部弹层
    openDia() {
      const addEditData = this.roleData.addEditData
      if (this.roleData.addOrEdit === 'edit') {
        this.roleInfo = Object.assign({}, this.roleInfo, {
          pkSid: addEditData.pkSid,
          name: addEditData.name,
          status: String(addEditData.status)
        })
        this.getRoleMenuList(addEditData.pkSid)
        this.title = '编辑角色'
      } else {
        this.title = '新增角色'
      }
    },
    // 新增角色
    addSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addSysRole(this.roleInfo).then(response => {
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
    // 修改角色
    updateSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateSysRole(this.roleInfo).then(response => {
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
    // 外部弹层取消
    resetForm(formName) {
      this.templateDialog = false
    },
    // 菜单树选中事件
    handleCheck(data, checkData) {
      this.roleInfo.menuIds = checkData.checkedKeys
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog{
    min-height: 337px;
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
    }
    .el-dialog__body{
      min-height: 200px;
      padding:30px 80px 0 50px
    }
    .el-dialog__footer{
      padding: 20px 30px 30px;
      .el-button {
        width: 170px;
      }
    }
  }
  .el-form-item__error.menu-tree-error{
    display: none;
  }
</style>
