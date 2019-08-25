<template>
  <el-dialog
    title="添加公司"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="45%"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <!--保存时只穿children 里面的 pkSid 和 deptName-->
      <!--<el-tree
        ref="tree"
        :data="list"
        show-checkbox
        default-expand-all
        node-key="pkSid"
        highlight-current
        :default-checked-keys="defaultChecked"
        :props="defaultProps"
        @check="handleCheckChange"
      />-->
      <!--变成单选-->
      <!--<el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="pkSid"
        highlight-current-row
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="deptName"
          label=""
        >
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">

            <el-button size="mini" @click="handleEdit(scope.row)">选择</el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55" />

      </el-table>-->
      <template v-for="item in list">
        <el-form-item :key="item.pkSid" :label="item.deptName+'：'">
          <el-radio-group v-model="resource">
            <el-radio v-for="i in item.children" :key="i.pkSid" :label="i"> {{ i.deptName }} </el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </el-form>
    <!--底部-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import { getDeptTreeList, save } from 'api/financeService'
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'AddCompany',
  props: {
    addCompany: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.addCompany,
      ruleForm: {},
      flag: false, // 不可通过点击外面关闭弹框
      rules: {
        name: [
          { required: true, message: '请选择入款公司', trigger: 'change' }
        ]
      },
      defaultChecked: [2005], // 默认选中的菜单
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      list: [], // 部门树状列表
      resource: {}
    }
  },
  watch: {
    addCompany() {
      this.visible = this.addCompany
    }
  },
  methods: {
    // 打开弹框调取数据
    openDialog() {
      this.getDeptTreeList()
      // 清空上一次点击记录过的数据
      this.resource = {}
    },

    // 部门树状列表
    getDeptTreeList() {
      getDeptTreeList({}).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.list = response.data.data
        }
      })
    },

    // 取消/重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:addCompany', false)
    },
    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },
    // 保存
    submitForm(formName) {
      // 获取到选中的值
      const params = {
        deptId: this.resource.pkSid,
        deptName: this.resource.deptName
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断 是否没选
          if (Object.keys(this.resource).length === 0) {
            this.$message.error('请选择')
          } else {
            // 调接口
            save(params).then(res => {
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
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    // 暂时不需要
    /* handleCheckChange(data, checked, indeterminate) {
      checked.checkedNodes.forEach(item => {
        this.saveList.push({ deptId: item.pkSid, deptName: item.deptName })
      })
    }*/
  }
}

</script>

<style scoped>
  .el-table td, .el-table th.is-leaf{
    border-bottom: 0;
  }
  .el-radio{
    padding: 5px 10px;
  }
</style>

