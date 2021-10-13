import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/all.css'
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
// 本地开发环境 'http://localhost:8079/api/v1'
// 生产环境 'http://api.lujiesheng.cn/api/v1'
axios.defaults.baseURL = 'http://localhost:8079/api/v1'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')