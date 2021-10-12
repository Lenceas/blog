<template>
  <el-container style="height:100%">
    <!-- 左侧导航 -->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-button type="primary" @click="logout">退出登录</el-button>
        <!-- 面包屑 -->
      </el-header>
      <!-- 主体部分 -->
      <el-main>Main</el-main>
      <!-- 底部 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('TokenInfo') // 指定键删除
      //sessionStorage.clear() // 删除所有数据
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>