<template>
  <el-container style="height:100%">
    <el-main class="login_wrap">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>Lenceas.Blog</h2>
        </div>
        <div class="body-card">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon:true class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model.trim="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model.trim="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item class="btn-card">
              <el-button type="primary" @click="register('ruleForm')" ref="register">注册</el-button>
              <el-button @click="login()" style="margin-left: 40px">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'register',
  data() {
    const validatePsdReg = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/.test(value)) {
        callback(new Error('请输入6-18位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePsdReg, trigger: 'change' }
        ]
      },
      fullscreenLoading: false
    }
  },
  created() {
    this.enterRegister()
  },
  methods: {
    enterRegister() {
      document.onkeydown = e => {
        //console.log(e.keyCode)
        if (e.keyCode === 13 && e.target.baseURI.match(/register/)) {
          this.$refs.register.$el.click()
        }
      }
    },
    register(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        //console.log(valid)
        if (valid) {
          let { username, password } = this.ruleForm;
          this.$api({
            method: 'post',
            url: '/Auth/Register',
            params: { name: username.trim(), pwd: password.trim() }
          }).then(res => {
            //console.log(res.data)
            let { status, msg, data } = res.data
            if (status == 200) {
              this.$msg.success(msg)
              localStorage.setItem('TokenInfo', JSON.stringify(data))
              this.$router.push('/login')
              let tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
              //console.log(tokeninfo)
            }
            else {
              this.$msg.error(msg)
              this.$refs[ruleForm].resetFields()
            }
          })
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    login() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$router.push('/login')
      loading.close()
    }
  }
}
</script>

<style scoped>
@import "../assets/css/register.css";
</style>