<template>
  <el-carousel :interval="2000" type="card" height="200px">
    <el-carousel-item v-for="item in banners" :key="item">
      <el-image style="height:300px;width:100%" :src="item" fit="fill">></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import b1 from "../../assets/images/banner-1.jpg"
import b2 from "../../assets/images/banner-2.jpg"
import b3 from "../../assets/images/banner-3.jpg"
import b4 from "../../assets/images/banner-4.jpg"
export default {
  name: 'admin',
  data() {
    return {
      banners: [b1, b2, b3, b4]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "../../assets/css/admin/index.css";
</style>