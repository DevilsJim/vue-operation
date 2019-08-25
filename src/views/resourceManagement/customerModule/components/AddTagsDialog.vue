<template>
  <el-dialog title="选择标签" :close-on-click-modal="flag" :visible.sync="templateDialog" width="700px" @close="closeDia">
    <el-form :model="temp" label-width="90px">
      <!-- 客户价值 -->
      <el-form-item v-for="tag in tagsList" :key="tag.tagId" :label="tag.tagName">
        <el-checkbox-group v-model="temp.tagIds">
          <el-checkbox v-for="item in tag.listTag" :key="item.tagId" :label="item.tagId">{{ item.tagName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addTag, getTagsList } from 'api/customerService'
export default {
  inject: ['reload'],
  name: 'AddTagsDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: String,
      default: null
    },
    existingTags: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: this.visible,
      tagsList: [], // 标签列表
      temp: {
        tagIds: []
      }
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
    },
    companyId: {
      handler(val, oldVal) {
        this.temp.companyId = val
      },
      deep: true,
      immediate: true
    },
    existingTags: {
      handler(val, oldVal) {
        val.forEach((tag) => {
          tag.listTag.forEach((item) => {
            this.temp.tagIds.push(item.tagId)
          })
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getTagsList()
  },
  methods: {
    // 标签总列表
    getTagsList() {
      const that = this
      getTagsList({}).then(response => {
        if (response.data.code === 10000) {
          that.tagsList = []
          response.data.data.forEach((item) => {
            if (item.listTag && item.listTag.length > 0) {
              that.tagsList.push(item)
            }
          })
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },
    closeDia() {
      this.temp = {
        tagIds: []
      }
      this.$emit('update:visible', false)
    },
    // 保存标签
    save() {
      const _this = this
      if (_this.temp.tagIds.length === 0) {
        _this.$message.warning('请选择要添加的标签！')
        return false
      }
      _this.$set(_this.temp, 'tagIds', _this.temp.tagIds.toString())
      addTag(_this.temp).then(response => {
        if (response.data.code === 10000) {
          _this.$message.success(response.data.message)
          _this.closeDia()
          _this.reload()
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog .el-dialog__header{
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
/deep/ .el-dialog .el-dialog__body{
  padding:30px 120px 20px 50px;
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
