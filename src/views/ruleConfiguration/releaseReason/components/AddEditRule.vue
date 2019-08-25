<template>
  <el-dialog title="编辑释放原因" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()" @open="openDia">
    <el-form ref="dataForm" label-width="90px" size="mini">
      <el-row>
        <el-col style="padding-right: 15px;">
          <el-form-item label="原因名称:" prop="name" label-width="90px">
            <el-input v-model="formInline.descConfig" placeholder="请输入释放原因" />
          </el-form-item>
          <el-form-item label="释放规则:" prop="reason" label-width="90px">
            <el-radio v-model="formInline.releaseConfig" label="1">释放后立即在公海显示</el-radio>
            <el-radio v-model="formInline.releaseConfig" label="0">释放后<el-input v-model="formInline.releaseTimeConfig" />天后在公海显示</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="ruleData ? handleUpdate() : handleSave()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addReleaseReason, updateReleaseReason } from '../../../../api/rule'

export default {
  inject: ['reload'],
  name: 'AddEditRule',
  props: {
    addEditRuleVisible: {
      type: Boolean,
      default: false
    },
    ruleData: {
      type: Object,
      default: () => {
        return {
          descConfig: '',
          releaseConfig: '',
          releaseTimeConfig: ''
        }
      }
    }
  },
  data() {
    return {
      flag: false,
      visible: this.addEditRuleVisible,
      privatePoolNum: 0,
      formInline: {},
      reasonRadio: '1'
    }
  },
  watch: {
    addEditRuleVisible: function() {
      this.visible = this.addEditRuleVisible
    }
  },
  methods: {
    closeDia() {
      this.formInline = {}
      this.$emit('update:addEditRuleVisible', false)
      this.$emit('update:ruleData', false)
    },
    openDia() {
      this.formInline = {
        pkSid: this.ruleData.pkSid,
        descConfig: this.ruleData.descConfig,
        releaseConfig: this.ruleData.releaseConfig === 2 ? this.ruleData.releaseConfig = '1' : String(this.ruleData.releaseConfig),
        releaseTimeConfig: this.ruleData.releaseTimeConfig
      }
    },
    // 编辑释放原因
    handleUpdate() {
      const postData = {
        pkSid: this.formInline.pkSid,
        descConfig: this.formInline.descConfig,
        releaseConfig: this.formInline.releaseConfig,
        releaseTimeConfig: this.formInline.releaseTimeConfig
      }
      updateReleaseReason(postData).then(response => {
        if (response.data.code === 10000) {
          this.$message.success(response.data.message)
          this.closeDia()
          this.reload()
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
      console.log(postData)
    },
    // 添加编辑原因
    handleSave() {
      addReleaseReason(this.formInline).then(response => {
        if (response.data.code === 10000) {
          this.$message.success(response.data.message)
          this.closeDia()
          this.reload()
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
      console.log(this.formInline)
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-row{
    padding: 0 20px;
  }
  /deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
    font-weight: normal;
  }
  /deep/ .el-form .el-form-item__content .el-select {
    width: 100%;
  }
  /deep/ .el-form .label-style .el-form-item__label{
    font-weight: bold;
  }
  /deep/ .el-form .label-style .el-form-item__content{
    margin-top: 10px;
  }
</style>
