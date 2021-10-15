import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/public/all.css'
import ElementUI, {
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
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
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  let tokeninfo = JSON.parse(sessionStorage.getItem('TokenInfo'))
  if (tokeninfo) {
    config.headers.common['Authorization'] = 'Bearer ' + tokeninfo.token
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')