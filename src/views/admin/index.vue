<template>
  <el-container class="home-container">
    <!-- 左侧导航 -->
    <el-aside class="home-aside">
      <!-- 侧边栏菜单区域 -->
      <el-menu class="home-menu" @open="handleOpen" @close="handleClose" background-color="rgb(48, 65, 86)" text-color="#fff">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">系统概况</span>
        </el-menu-item>
        <el-submenu index="2">
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
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="home-header">
        <span>博客后台管理系统</span>
        <el-dropdown style="height:100%">
          <el-avatar :size="50" src="../../assets/images/my-header.jpg" @error="errorHandler">
            <img class="el-dropdown-link" src="../../assets/images/my-header.jpg" />
          </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">系统配置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user">用户中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-back" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--  -->
        <!-- 面包屑 -->
      </el-header>
      <!-- 主体部分 -->
      <el-main class="home-main"></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('TokenInfo') // 指定键删除
      //sessionStorage.clear() // 删除所有数据
      this.$router.push('/login')
    },
    errorHandler() {
      return true
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/admin/index.css";
</style>