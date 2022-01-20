import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab: [], // 所有打开路由
    activeIndex: '/admin/index' // 激活状态
  },
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      state.openTab.push(data)
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0
      for (let option of state.openTab) {
        if (option.route == route) {
          break
        }
        index++
      }
      state.openTab.splice(index, 1)
    },
    // 设置当前激活的tabs
    set_active_index(state, index) {
      state.activeIndex = index
    }
  },
  actions: {},
  modules: {}
})