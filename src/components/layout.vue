<template>
  <el-container class="home-container">
    <!-- 左侧导航 start -->
    <el-aside class="home-aside">
      <!-- 侧边栏菜单区域 start -->
      <el-menu class="home-menu" :default-active="this.$route.path" background-color="rgb(48, 65, 86)" text-color="#fff" router>
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
      <!-- 头部 end -->
      <!-- 主体部分 start -->
      <el-main class="home-main">
        <router-view />
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
        url: '/Menu/GetMenuTree',
        data: {}
      }).then(res => {
        if (res != null && res.data != null) {
          let { status, msg, data } = res.data
          if (status == 200) {
            this.$msg.success('获取菜单列表成功！')
            this.menuList = data
            //console.log(this.menuList)
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