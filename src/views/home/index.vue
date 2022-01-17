<template>
  <el-container>
    <!-- 主体部分 -->
    <el-main class="home-main">
      <!-- 主体部分 -->
      <el-main class="home-cmain"></el-main>
      <!-- 底部 -->
      <el-footer style="60px;">
        <span class="hfbq">Copyright © 2022 Lenceas.Blog - 卢杰晟的个人博客</span><br/>
        <span class="hfbq">Powered by .NET 6 & Vue 2.x on Docker & CentOS</span><br/>
        <el-link :underline='false' type="primary" href="http://beian.miit.gov.cn/" target="_blank">湘ICP备2021003806号-1</el-link>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style scoped>
@import "../../assets/css/home/index.css";
</style>