<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="40%"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="ruleForm" :model="ruleForm" label-width="130px" class="demo-ruleForm">
      <!--添加 、编辑 显示-->
      <template v-if="showType!=='2'">
        <el-form-item
          v-for="(item, index) in ruleForm.domains"
          :key="item.key"
          label="汇入途径名称："
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: '汇入途径名称不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="item.value" style="width: 70%" />
          <!--添加按钮只有在 添加汇入途径才显示-->
          <el-button v-if="showType==='1'" type="primary" size="mini" @click="addChannel">添加</el-button>

          <!--保存按钮 只有在 编辑汇入途径才显示-->
          <el-button v-if="showType==='3'" type="primary" size="mini" @click.prevent="updateChannel('ruleForm',item)">保存</el-button>

          <el-button v-if="delShow" type="danger" size="mini" @click.prevent="removeChannel(item)">删除</el-button>
        </el-form-item>
      </template>

      <!--查看 显示-->
      <template v-if="showType==='2'">
        <template v-for="item in ruleForm.domains">
          <el-form-item :key="item.key" label="汇入途径名称：">
            <span>{{ item.value }}</span>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <!--底部-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button v-if="showType==='1'" size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
import { addChannel, getListByAccountId, updateChannel } from 'api/financeService'
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'AddOrEditOrSeeChannel',
  props: {
    addEditSeeChannel: {
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
    // 根据类型不同显示不同
    showType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: this.addEditSeeChannel,
      ruleForm: {
        domains: [
          {
            value: ''
          }
        ]
      },
      flag: false, // 不可通过点击外面关闭弹框
      importRouteList: [] // 保存接口处理数据
    }
  },
  computed: {
    delShow() {
      return this.ruleForm.domains.length > 1
    }
  },
  watch: {
    addEditSeeChannel() {
      this.visible = this.addEditSeeChannel
    }
  },
  methods: {
    // 打开弹框调取数据
    openDialog() {
      // 如果是编辑汇入途径、查看汇入途径，那么调这个接口
      if (this.showType === '3' || this.showType === '2') {
        this.getListByAccountId()
        // 如果是 编辑汇入途径，默认没有输入框，返显数据
        this.ruleForm = {
          domains: []
        }
      }
      // 如果是 添加汇入途径 默认有一个输入框
      if (this.showType === '1') {
        this.ruleForm = {
          domains: [
            {
              value: ''
            }
          ]
        }
      }
    },

    // 添加 汇入途径
    addChannel() {
      this.ruleForm.domains.push({
        value: '',
        key: Date.now()
      })
    },

    // 删除 汇入途径
    removeChannel(item) {
      // 如果是 添加汇入途径，从数组删除,不走接口
      if (this.showType === '1') {
        var index = this.ruleForm.domains.indexOf(item)
        if (index !== -1) {
          this.ruleForm.domains.splice(index, 1)
        }
      }
      // 如果是 编辑汇入途径，调接口进行删除
      if (this.showType === '3') {
        // 定义传参
        const params = {
          pkSid: item.key, // 列表里面的 进展公司业务id
          delStatus: 2 // 	删除状态：默认填2
        }
        // 调接口
        updateChannel(params).then(res => {
          if (res.data.code === 10000) {
            this.$message.success(res.data.message)
            this.resetForm('ruleForm')
            this.reload() // 自动刷新列表
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },

    // 取消/重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:addEditSeeChannel', false)
    },

    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },

    // 添加汇入途径 保存
    submitForm(formName) {
      // 处理数据
      this.importRouteList = []
      this.ruleForm.domains.forEach(item => {
        this.importRouteList.push(item.value)
      })
      // 定义传参
      const params = {
        accountId: this.itemInfo.accountId, // 列表里面的 进展公司业务id
        importRouteList: this.importRouteList // ["中国建设银行123","中国建设银行124"],
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          addChannel(params).then(res => {
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

    // 汇入途径返显
    getListByAccountId() {
      getListByAccountId(this.itemInfo.accountId).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          const list = response.data.data
          list.forEach(item => {
            this.ruleForm.domains.push({
              value: item.importRoute,
              key: item.pkSid
            })
          })
        }
      })
    },

    // 编辑汇入途径 保存
    updateChannel(formName, item) {
      // 定义传参
      const params = {
        pkSid: item.key, // 列表里面的 进展公司业务id
        importRoute: item.value
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          updateChannel(params).then(res => {
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

