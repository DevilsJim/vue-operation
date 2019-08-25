<template>
  <el-dialog title="分配商机" :close-on-click-modal="flag" :visible.sync="templateDialog" width="30%" @close="closeDia">
    <el-form ref="ruleFrom" :model="temp" label-width="100px">
      <!-- 水果名 -->
      <el-form-item label="分配至：" class="custom-prop">
        <el-autocomplete
          v-model="nickname"
          :fetch-suggestions="querySearchAsync"
          placeholder="请选择水果名"
          clearable
          size="small"
          @select="handleSelect"
        />
      </el-form-item>
      <!-- 释放原因 -->
      <el-form-item label="分配备注：">
        <el-input v-model="temp.mark" type="textarea" placeholder="请输入内容" resize="none" />
      </el-form-item>
    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleFrom')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessDeal } from 'api/business'
import { getUserPageList } from 'api/raw'
export default {
  inject: ['reload'],
  name: 'DistributionBusinessDialog',
  props: {
    visible: {
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
      flag: false,
      templateDialog: this.visible,
      temp: {},
      nickname: '', // 远程搜索绑定展示字段
      // 定义远程搜索传参
      userListParam: {
        start: '1',
        length: '10'
      }
    }
  },
  watch: {
    // 监听 弹框 状态
    visible: function() {
      this.templateDialog = this.visible
    }
  },
  created() {},
  methods: {
    /**
     *@desc queryString 为在框中输入的值
     *@desc callback 回调函数,将处理好的数据推回
     */
    querySearchAsync(queryString, callback) {
      const _this = this
      let userList = [{}]
      _this.userListParam.nickname = queryString
      getUserPageList(_this.userListParam).then(response => {
        if (response.data.code === 10000) {
          for (const item of response.data.data.list) {
            item.value = item.nickname // 将想要展示的数据作为value
          }
          userList = response.data.data.list
        }
        callback(userList)
      }).catch((err) => {
        this.$message.error(err)
      })
    },

    // 过滤
    createStateFilter(queryString) {
      return (queryString.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    },

    // 选中 接口返回来 的文字
    handleSelect(val) {
      console.log(val)
      this.nickname = val.nickname // 将 返回的 nickname 赋值给 输入框 绑定字段
      this.temp.businessOwner = val.pkSid // 将返回来的 psSid 赋值给 保存时 需要的字段
    },

    // 保存
    save() {
      const _this = this
      if (_this.temp.businessOwner) {
        _this.temp = Object.assign({}, _this.temp, {
          pkSid: this.itemInfo.pkSid,
          businessId: this.itemInfo.businessId,
          selectType: '1' // 操作模式 0.转移 1.分配 2.释放
        })
        businessDeal(_this.temp).then(response => {
          if (response.data.code === 10000) {
            _this.closeDia()
            _this.reload()
          } else {
            _this.$message.error('操作失败')
          }
        }).catch((err) => {
          _this.$message.error(err)
        })
      } else {
        _this.$message.error('请选择正确的水果名！')
        return false
      }
    },

    // 关闭弹框
    closeDia() {
      this.temp = {}
      this.$emit('update:visible', false)
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
    padding: 25px 120px 10px 50px;
  }
  /deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
    font-weight: normal;
    font-size: 15px;
  }
  /deep/ .el-form .el-radio{
    line-height: 1.5;
    margin-bottom: 15px;
  }
</style>
