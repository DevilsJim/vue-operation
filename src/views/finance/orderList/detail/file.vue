/*
  退款订单 - 文件信息
*/
<template>
  <div class="file">
    <!-- 标题 -->
    附件信息： <span class="link" @click="handleClickShowDialog">上传文件</span>
    <!-- 列表 -->
    <el-table
      :data="[]"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center" width="80" />
      <el-table-column label=" 文件类型" align="center" />
      <el-table-column label="文件名称" align="center" />
      <el-table-column label="大小" align="center" />
      <el-table-column label="操作人" align="center" />
      <el-table-column label="上传时间" align="center" />
      <el-table-column label="操作" align="center" />
    </el-table>
    <!-- 上传文件弹窗 -->
    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="formData" label-width="120px">
        <el-form-item label="文件名：">
          <el-input v-model="formData.name" placeholder="请输入文件名" />
        </el-form-item>
        <el-form-item label="文件上传：">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept=".doc,.docx"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传word格式文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formData.desc" type="textarea" placeholder="请输入您的建议" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickFile">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 附件信息提示 -->
    <!-- <div class="note-wrap">
      <h3 class="title">附件信息</h3>
      <ul class="note">
        <li class="item">1、来源：CRM顾问填写信息或立案人员上传</li>
        <li class="item">2、操作：上传(暂时不上传)/下载查看或者删除附件(暂时不能删除)</li>
        <li class="item">3、格式：Word、PDF</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'File',
  data() {
    return {
      dialogVisible: false,
      formData: {
        name: '', // 文件名
        desc: '' // 备注
      }
    }
  },
  methods: {
    handleClickShowDialog() {
      this.dialogVisible = true
    },
    handleClickFile() {
      console.log(this.formData)
    }
  }
}
</script>

<style lang='scss' scoped>
.file {
  span.link {
    font-size: 12px;
    color: #FF0000;
    cursor: pointer;
    text-decoration: underline;
    user-select: none;
    &:hover {
      font-weight: 700;
    }
  }
  .el-table--border {
    margin-top: 20px;
  }
  /* .note-wrap {
    color: #FF4328;
    .title {
      font-weight: 500;
      font-size: 14px;
    }
    .note {
      margin: 0;
      list-style-type: none;
      .item {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }
  } */
}
</style>
