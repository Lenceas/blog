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
              <el-button type="primary" @click="login('ruleForm')" ref="login">登录</el-button>
              <el-button @click="register()" style="margin-left: 40px">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'login',
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
    };
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePsdReg, trigger: 'change' }
        ]
      },
      fullscreenLoading: false,
      notifyPromise: Promise.resolve()
    }
  },
  created() {
    this.enterLogin()
  },
  methods: {
    enterLogin() {
      document.onkeydown = e => {
        //console.log(e.keyCode)
        if (e.keyCode === 13 && e.target.baseURI.match(/login/)) {
          this.$refs.login.$el.click()
        }
      }
    },
    login(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let { username, password } = this.ruleForm;
          this.$api({
            method: 'post',
            url: '/Auth/Login',
            params: { name: username.trim(), pwd: password.trim() }
          }).then(res => {
            let { status, msg, data } = res.data
            if (status == 200) {
              localStorage.clear()
              localStorage.setItem('TokenInfo', JSON.stringify(data))
              let tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
              var curTime = new Date()
              var expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + tokeninfo.expires_in))
              localStorage.setItem('TokenExpire', expiredate)
              localStorage.setItem('refreshtime', expiredate)
              this.$router.push('/admin')
              var minute = tokeninfo.expires_in / 60
              this.notifyPromise = this.notifyPromise.then(() => { this.$notify.success('成功获取令牌，项目初始化中...') })
              this.notifyPromise = this.notifyPromise.then(() => { this.$notify.success('令牌将在' + minute + '分钟后过期！') })
              this.$store.state.openTab = []
              this.$store.state.activeIndex = '/admin/index'
            }
            else {
              this.$msg.error(msg)
              this.$refs[ruleForm].resetFields()
            }
          })
        } else {
          return false;
        }
      })
    },
    register() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$router.push('/register')
      loading.close()
    }
  }
}
</script>

<style scoped>
@import "../assets/css/login.css";
</style>