<template>
  <el-container>
    <!-- 主体部分 -->
    <el-main class="home-main">
      <!-- 主体部分 -->
      <el-main class="home-cmain"></el-main>
      <!-- 底部 -->
      <el-footer style="30px;">
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