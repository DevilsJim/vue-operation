<template>
  <el-dialog :title="title" :close-on-click-modal="flag" :visible.sync="visible" width="600px" @close="closeDia('ruleForm')" @open="openDia('ruleForm')">
    <el-form ref="ruleForm" :model="formInline" :rules="rules" label-width="100px" size="mini">
      <!--用户名-->
      <el-form-item label="用户名:" prop="passport">
        <el-input v-model="formInline.passport" placeholder="请输入用户名" :disabled="disabled.passport" />
      </el-form-item>
      <!--姓名-->
      <el-form-item label="姓名:" prop="realname">
        <el-input v-model="formInline.realname" placeholder="请输入真实姓名" :disabled="disabled.realname" />
      </el-form-item>
      <!--水果名-->
      <el-form-item label="水果名:" prop="nickname">
        <el-input v-model="formInline.nickname" placeholder="请输入水果名" :disabled="disabled.nickname" />
      </el-form-item>
      <!--手机号-->
      <el-form-item label="手机号:" prop="tel">
        <el-input v-model="formInline.tel" placeholder="请输入手机号" :disabled="disabled.tel" />
      </el-form-item>
      <!--邮箱-->
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="formInline.email" placeholder="请输入邮箱" :disabled="disabled.email" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码:" prop="pwd" class="custom-prop">
        <el-input v-model="formInline.pwd" placeholder="请输入密码" :disabled="disabled.pwd" show-password />
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别:" prop="sex" class="custom-prop">
        <el-radio v-model="formInline.sex" label="1" :disabled="disabled.sex">男</el-radio>
        <el-radio v-model="formInline.sex" label="2" :disabled="disabled.sex">女</el-radio>
      </el-form-item>
      <!-- 所属部门 -->
      <el-form-item label="所属部门:" prop="deptId" class="custom-prop">
        <el-select v-model="formInline.deptList" value="" placeholder="请选择所属部门" size="mini" multiple :disabled="disabled.deptList" filterable>
          <el-option
            v-for="item in userData.deptList"
            :key="item.pkSid"
            :label="item.deptName"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色" prop="roleId" class="custom-prop">
        <el-select v-model="formInline.roleList" value="" placeholder="请选择所角色" size="mini" multiple :disabled="disabled.roleList" filterable>
          <el-option
            v-for="item in userData.roleList"
            :key="item.pkSid"
            :label="item.name"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态:" prop="offWorkFlag">
        <el-radio v-model="formInline.offWorkFlag" label="1" :disabled="disabled.offWorkFlag">在职</el-radio>
        <el-radio v-model="formInline.offWorkFlag" label="2" :disabled="disabled.offWorkFlag">离职</el-radio>
      </el-form-item>
      <!-- 上传头像, 上传微信二维码 -->
      <el-row>
        <el-col :span="12">
          <!--上传头像-->
          <el-form-item label="头像:" prop="headImg">
            <div v-if="userData.addOrEdit === 'detail'" class="upload-img">
              <img :src="formInline.headImg">
            </div>
            <div v-else>
              <!-- 上传图片 -->
              <upload-picture :upload-url="uploadUrl" :cus-file-list="headImgFileList" :file-type="true" :is-disabled="disabled.headImg" @resFileData="uploadFileData" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!--上传微信二维码-->
          <el-form-item label="微信二维码:" prop="weixinUrl">
            <div v-if="userData.addOrEdit === 'detail'" class="upload-img">
              <img :src="formInline.weixinUrl">
            </div>
            <!-- 上传图片 -->
            <div v-else>
              <upload-picture :upload-url="uploadUrl" :cus-file-list="weiXinFileList" :file-type="true" :is-disabled="disabled.weixinUrl" @resFileData="uploadFileDataWeiXin" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作 -->
    <div v-if="userData.addOrEdit !== 'detail'" slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="userData.addOrEdit === 'edit' ? updateSave('ruleForm') : addSave('ruleForm')">保存</el-button>
    </div>
    <div v-else slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="visible = false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UploadPicture from '@/views/UploadPicture'
import { addUser, getUserDetail, updateUserInfo } from '@/api/raw'

export default {
  inject: ['reload'],
  name: 'AddEditUser',
  components: { UploadPicture },
  props: {
    addEditUserVisible: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: null
    }
  },
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入联系人手机号！'))
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      flag: false,
      visible: false,
      userId: null,
      formInline: {
        deptList: [],
        roleList: []
      },
      disabled: {
        passport: false,
        realname: false,
        nickname: false,
        email: false,
        tel: false,
        headImg: false,
        weixinUrl: false,
        pwd: false,
        deptList: false,
        roleList: false,
        offWorkFlag: false,
        sex: false
      },
      rules: {
        passport: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输真实姓名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入水果名', trigger: 'blur' }
        ],
        tel: [
          { validator: checkTel, required: true, type: 'number' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        deptList: [
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        roleList: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        offWorkFlag: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ]
      },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/upload', // uploadUrl: 'http://192.168.91.112:8001/api/v1/common/upload',
      /*
      * 头像对应数组，用于图片上传和图片回显，回显图片时，新增数组记录需要注意
      * headImgFileList: [{ name: 'abc.jpeg', url: 'https://abc.jpeg' }, { name: 'efg.jpeg', url: 'https://efg.jpeg' }]
      * */
      headImgFileList: [],
      weiXinFileList: [],
      pkSid: null
    }
  },
  watch: {
    addEditUserVisible: function() {
      this.visible = this.addEditUserVisible
    },
    userData: {
      handler(val, oldVal) {
        console.log('userData', val)
      },
      immediater: true,
      deep: true
    }
  },
  methods: {
    closeDia(formName) {
      this.formInline = {
        deptList: [],
        roleList: []
      }
      this.headImgFileList = []
      this.weiXinFileList = []
      this.disabled = Object.assign({}, this.disabled, {
        passport: false,
        realname: false,
        nickname: false,
        email: false,
        tel: false,
        headImg: false,
        weixinUrl: false,
        pwd: false,
        deptList: false,
        roleList: false,
        offWorkFlag: false,
        sex: false
      })
      this.$emit('update:addEditUserVisible', false)
      this.$refs[formName].resetFields()
    },
    openDia(formName) {
      switch (this.userData.addOrEdit) {
        case 'add':
          this.title = '新增用户'
          break
        case 'edit':
          this.title = '编辑用户'
          this.$set(this.disabled, 'passport', true)
          this.$set(this.disabled, 'pwd', true)
          this.fetchData(this.userData.userId)
          break
        case 'detail':
          this.title = '用户详情'
          this.disabled = Object.assign({}, this.disabled, {
            passport: true,
            realname: true,
            nickname: true,
            email: true,
            tel: true,
            headImg: true,
            weixinUrl: true,
            pwd: true,
            deptList: true,
            roleList: true,
            offWorkFlag: true,
            sex: true
          })
          this.fetchData(this.userData.userId)
          break
      }
      // this.$refs[formName].resetFields()
    },
    fetchData(userId) {
      getUserDetail(userId).then(response => {
        if (response.data.code === 10000) {
          this.formInline = Object.assign({}, this.formInline, {
            passport: response.data.data.passport,
            realname: response.data.data.realname,
            nickname: response.data.data.nickname,
            tel: response.data.data.tel,
            email: response.data.data.email,
            headImg: response.data.data.headImg,
            weixinUrl: response.data.data.weixinUrl,
            pwd: response.data.data.pwd,
            sex: String(response.data.data.sex),
            offWorkFlag: String(response.data.data.offWorkFlag),
            deptList: response.data.data.deptList,
            roleList: response.data.data.roleList
          })
          if (response.data.data.headImg !== '') {
            this.$set(this.headImgFileList, 0, {
              url: response.data.data.headImg
            })
          }
          if (response.data.data.weixinUrl !== '') {
            this.$set(this.weiXinFileList, 0, {
              url: response.data.data.weixinUrl
            })
          }
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 编辑用户
    updateSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formInline.pkSid = this.userData.userId
          updateUserInfo(this.formInline).then(response => {
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
        } else {
          this.$message.warning('请完善您的数据')
          return false
        }
      })
    },
    // 添加用户
    addSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formInline.sex = Number(this.formInline.sex)
          this.formInline.offWorkFlag = Number(this.formInline.offWorkFlag)
          addUser(this.formInline).then(response => {
            if (response.data.code === 10000) {
              this.$message.success('添加成功')
              this.closeDia()
              this.reload()
            } else {
              this.$message.error(response.data.message)
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        } else {
          this.$message.warning('请完善您的数据')
          return false
        }
      })
    },
    uploadFileData(file) {
      if (file.isRemove) {
        this.formInline.headImg = ''
      } else {
        this.formInline.headImg = file.url
      }
    },
    uploadFileDataWeiXin(file) {
      if (file.isRemove) {
        this.formInline.weixinUrl = ''
      } else {
        this.formInline.weixinUrl = file.url
      }
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-form{
    padding-right: 50px;
    /deep/ .el-form-item__label, /deep/ .el-form-item__content, /deep/ .el-radio{
      font-weight: normal;
    }
    /deep/ .el-form-item__content .el-select {
      width: 100%;
    }
    .upload-img{
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin-top: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .uploader{
      margin-top: 10px;
    }
  }
</style>
