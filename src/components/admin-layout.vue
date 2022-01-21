<template>
  <el-container class="home-container">
    <!-- 左侧导航 start -->
    <el-aside class="home-aside">
      <!-- 侧边栏菜单区域 start -->
      <el-menu class="home-menu" :default-active="this.$route.path" exact background-color="rgb(48, 65, 86)" text-color="#fff" router>
        <template v-for="m in this.menuList">
          <!-- 一级菜单 start -->
          <template v-if="m.SubMenuList.length>0">
            <el-submenu :index="m.MenuUrl" :key="m.MenuUrl">
              <template slot="title">
                <i :class="m.MenuIcon"></i>
                <span>{{m.MenuName}}</span>
              </template>
              <!-- 二级菜单 start -->
              <template v-if="m.SubMenuList.length>0">
                <template v-for="mm in m.SubMenuList">
                  <el-submenu :index="mm.MenuUrl" :key="mm.MenuUrl">
                    <template slot="title">
                      <i :class="mm.MenuIcon"></i>
                      <span>{{mm.MenuName}}</span>
                    </template>
                    <!-- 三级菜单 start -->
                    <template v-if="mm.SubMenuList.length>0">
                      <template v-for="mmm in mm.SubMenuList">
                        <el-submenu :index="mmm.MenuUrl" :key="mmm.MenuUrl">
                          <template slot="title">
                            <i :class="mmm.MenuIcon"></i>
                            <span>{{mmm.MenuName}}</span>
                          </template>
                        </el-submenu>
                      </template>
                    </template>
                    <template v-else>
                      <el-menu-item :index="mm.MenuUrl" :key="mm.MenuUrl">
                        <i :class="mm.MenuIcon"></i>
                        <span slot="title">{{mm.MenuName}}</span>
                      </el-menu-item>
                    </template>
                    <!-- 三级菜单 end -->
                  </el-submenu>
                </template>
              </template>
              <template v-else>
                <el-menu-item :index="m.MenuUrl" :key="m.MenuUrl">
                  <i :class="m.MenuIcon"></i>
                  <span slot="title">{{m.MenuName}}</span>
                </el-menu-item>
              </template>
              <!-- 二级菜单 end -->
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="m.MenuUrl" :key="m.MenuUrl">
              <i :class="m.MenuIcon"></i>
              <span slot="title">{{m.MenuName}}</span>
            </el-menu-item>
          </template>
          <!-- 一级菜单 end -->
        </template>
      </el-menu>
      <!-- 侧边栏菜单区域 end -->
    </el-aside>
    <!-- 左侧导航 end -->
    <el-container>
      <!-- 头部 start -->
      <el-header class="home-header">
        <el-row :gutter="24" style="width:100%;height:100%;">
          <el-col :span="3" style="height:100%;">博客后台管理系统</el-col>
          <el-col :span="16" style="height:100%;">
            <!-- 面包屑 start -->
            <el-breadcrumb class="home-header-breadcrumb" separator-class="el-icon-loading">
              <el-breadcrumb-item v-for="item in this.breadcrumbList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 面包屑 end -->
          </el-col>
          <el-col :span="3" style="height:100%;float:right;text-align:right;">
            <el-dropdown style="height:100%;line-height:100%;">
              <el-avatar style="height:55px;width:55px;" class="el-dropdown-link" :size="50" @error="errorHandler">
                <img src="../../src/assets/images/my-header.jpg" />
              </el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-monitor" @click.native="jumphome">博客首页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-back" @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <!-- 头部 end -->
      <!-- 主体部分 start -->
      <el-main class="home-main">
        <!-- 动态路由结合标签页 start -->
        <el-tabs class="homa-main-tabs" v-model="$store.state.activeIndex" type="border-card" closable v-if="this.$store.state.openTab.length" @tab-click="tabClick" @tab-remove="tabRemove">
          <el-tab-pane :key="item.name" v-for="item in this.$store.state.openTab" :label="item.title" :name="item.route">
            <router-view />
          </el-tab-pane>
        </el-tabs>
        <!-- 动态路由结合标签页 start -->
      </el-main>
      <!-- 主体部分 end -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      isCollapse: true,
      menuList: [],
      breadcrumbList: [],
    }
  },
  created() {
    if (this.menuList.length == 0) {
      this.getMenuTree()
    }
    this.breadcrumbList = this.$route.matched
  },
  mounted() {
    // 刷新时以当前路由作为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/admin' && this.$route.path !== '/admin/index') {
      this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name, title: this.$route.meta.title })
      this.$store.commit('set_active_index', this.$route.path)
    }
    else {
      this.$store.commit('add_tabs', { route: '/admin/index', name: 'index', title: '系统面板' })
      this.$store.commit('set_active_index', '/admin/index')
    }
  },
  watch: {
    $route(to, from) {
      let matched = to.matched
      this.breadcrumbList = matched

      // 判断路由是否已经打开
      // 已经打开的，将其置为active
      // 未打开的，将其放入队列里
      let flag = false
      for (let item of this.$store.state.openTab) {
        if (item.name === to.name) {
          this.$store.commit('set_active_index', to.path)
          flag = true
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', { route: to.path, name: to.name, title: to.meta.title })
        this.$store.commit('set_active_index', to.path)
      }
    }
  },
  methods: {
    jumphome() {
      window.open('/home', '_blank')
    },
    logout() {
      var tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
      this.$api({
        method: 'post',
        url: '/Auth/Logout',
        params: {
          token: tokeninfo.token
        }
      }).then(res => {
        let { status, msg, data } = res.data
        console.log('res.data', res.data);
        if (status == 200) {
          this.$store.state.openTab = []
          this.$store.state.activeIndex = '/admin/index'
          // localStorage.removeItem('TokenInfo') // 指定键删除
          localStorage.clear() // 删除所有数据
          this.$router.push('/login')
        }
        else {
          this.$msg.error(msg)
        }
      })
    },
    errorHandler() {
      return true
    },
    getMenuTree() {
      this.$api({
        method: 'get',
        url: '/Menu/GetMenuTree',
        data: {}
      }).then(res => {
        if (res != null && res.data != null) {
          let { status, msg, data } = res.data
          if (status == 200) {
            this.$msg.success('菜单初始化成功！')
            this.menuList = data
          }
          else {
            this.$msg.error(msg)
          }
        }
      })
    },
    // tab标签点击时，切换相应的路由
    tabClick(tab) {
      this.$router.push({ path: tab.name })
    },
    // 移除tab标签
    tabRemove(targetName) {
      // 首页不删
      if (targetName == '/admin' || targetName == '/admin/index') { return }
      this.$store.commit('delete_tabs', targetName)
      if (this.$store.state.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.$store.state.openTab && this.$store.state.openTab.length >= 1) {
          this.$store.commit('set_active_index', this.$store.state.openTab[this.$store.state.openTab.length - 1].route)
          this.$router.push({ path: this.$store.state.activeIndex })
        }
        else {
          this.$router.push({ path: '/admin/index' })
        }
      }
    }
  }
}
</script>

<style scoped>
@import "../../src/assets/css/admin/admin-layout.css";
</style>