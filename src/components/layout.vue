<template>
  <el-container class="home-container">
    <!-- 左侧导航 -->
    <el-aside class="home-aside">
      <!-- 侧边栏菜单区域 -->
      <el-menu class="home-menu" :default-active="this.$route.path" background-color="rgb(48, 65, 86)" text-color="#fff" router>

        <template v-for="m in this.menuList">
          <el-menu-item :index="m.MenuUrl" :key="m.MenuUrl">
            <i :class="m.MenuIcon"></i>
            <span slot="title">{{m.MenuName}}</span>
          </el-menu-item>
        </template>

        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>一级菜单</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>二级菜单</span>
            </template>
            <el-menu-item index="2-1-1">
              <i class="el-icon-s-home"></i>
              <span slot="title">三级菜单</span>
            </el-menu-item>
          </el-submenu>
        </el-submenu> -->

      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="home-header">
        <span>博客后台管理系统</span>
        <el-dropdown style="height:100%">
          <el-avatar class="el-dropdown-link" :size="50" @error="errorHandler">
            <img src="../../src/assets/images/my-header.jpg" />
          </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-monitor" @click.native="jumphome">博客首页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-back" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  -->
        <!-- 面包屑 -->
      </el-header>
      <!-- 主体部分 -->
      <el-main class="home-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      isCollapse: true,
      menuList: []
    }
  },
  created() {
    if (this.menuList.length == 0) {
      this.getMenuTree()
    }
  },
  methods: {
    jumphome() {
      window.open('/home', '_blank')
    },
    logout() {
      // localStorage.removeItem('TokenInfo') // 指定键删除
      localStorage.clear() // 删除所有数据
      this.$router.push('/login')
    },
    errorHandler() {
      return true
    },
    getMenuTree() {
      this.$api({
        method: 'get',
        url: '/Menu/GetList',
        data: {}
      }).then(res => {
        if (res != null && res.data != null) {
          let { status, msg, data } = res.data
          if (status == 200) {
            this.$msg.success('获取菜单列表成功')
            this.menuList = data
            console.log(this.menuList)
          }
          else {
            this.$msg.error(msg)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../../src/assets/css/admin/layout.css";
</style>