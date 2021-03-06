import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/public/all.css'
import ElementUI, {
  Message,
  Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 消息提示
Vue.prototype.$msg = function (msg) {
  return Message({
    message: msg,
    duration: 2000,
    center: true
  })
}
Vue.prototype.$msg.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 2000,
    center: true
  })
}
Vue.prototype.$msg.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 2000,
    center: true
  })
}
Vue.prototype.$msg.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 2000,
    center: true
  })
}

// 通知
Vue.prototype.$notify = function (title, msg) {
  return Notification({
    title: title,
    message: msg,
  })
}
Vue.prototype.$notify.success = function (title, msg) {
  return Notification.success({
    title: title,
    message: msg,
  })
}
Vue.prototype.$notify.warning = function (title, msg) {
  return Notification.warning({
    title: title,
    message: msg,
  })
}
Vue.prototype.$notify.error = function (title, msg) {
  return Notification.error({
    title: title,
    message: msg,
  })
}

Vue.config.productionTip = false
Vue.prototype.$api = axios
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8079/api/v1'
  } else if (process.env.NODE_ENV === 'production') {
    return 'http://api.lujiesheng.cn/api/v1'
  }
}
axios.defaults.baseURL = getBaseUrl()

// 退出登录
export const logOut = params => {
  localStorage.clear()
  router.push('/login')
}

// 保存刷新时间
export const saveRefreshtime = params => {
  let nowtime = new Date()
  let TokenExpire = localStorage.getItem('TokenExpire')
  let refreshtime = localStorage.getItem('refreshtime')
  let lastRefreshtime = refreshtime ? new Date(refreshtime) : new Date(-1)
  let expiretime = new Date(Date.parse(TokenExpire))
  let refreshCount = 5 //滑动系数
  if (lastRefreshtime >= nowtime) {
    lastRefreshtime = nowtime > expiretime ? nowtime : expiretime
    lastRefreshtime.setMinutes(lastRefreshtime.getMinutes() + refreshCount)
    localStorage.setItem('refreshtime', lastRefreshtime)
  } else {
    localStorage.setItem('refreshtime', new Date(-1))
  }
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  saveRefreshtime()
  // 判断是否存在token,如果存在将每个页面header添加token
  let tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
  if (tokeninfo) {
    config.headers.common['Authorization'] = 'Bearer ' + tokeninfo.token
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      if (error.response.status == 401) {
        var curTime = new Date()
        var refreshtime = new Date(Date.parse(localStorage.getItem('refreshtime')))
        var tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
        // 在用户操作的活跃期内
        if (localStorage.getItem('refreshtime') && (curTime <= refreshtime)) {
          // 直接将整个请求 return 出去，不然的话，请求会晚于当前请求，无法达到刷新操作
          return axios({
            method: 'post',
            url: '/Auth/RefreshToken',
            params: {
              token: tokeninfo.token
            }
          }).then(res => {
            let {
              status,
              msg,
              data
            } = res.data
            if (status == 200) {
              localStorage.setItem('TokenInfo', JSON.stringify(data))
              var newTokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
              var curTime = new Date()
              var expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + newTokeninfo.expires_in))
              localStorage.setItem('TokenExpire', expiredate)
              error.config.__isRetryRequest = true
              error.config.headers.Authorization = 'Bearer ' + newTokeninfo.token
              // error.config 包含了当前请求的所有信息
              return axios(error.config)
            } else {
              // 刷新token失败 清除token信息并跳转到登录页面
              Message.error({
                message: msg,
                duration: 2000,
                center: true
              })
              logOut()
            }
          })
        } else {
          // 返回 401，并且不在用户操作活跃期内 清除token信息并跳转到登录页面
          Message.error({
            message: '登录超时请重新登录！',
            duration: 2000,
            center: true
          })
          logOut()
        }
      }
      // 403 无权限
      if (error.response.status == 403) {
        Message.error({
          message: '失败！该操作无权限！',
          duration: 2000,
          center: true
        })
        return null
      }
    }
    // 返回接口返回的错误信息
    return ""
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')