<template>
  <el-container>
    <!-- 主体部分 -->
    <el-main class="home-main">
      <!-- 主体部分 -->
      <el-main class="home-cmain">
        <el-header class="home-top">
          <el-row>
            <el-col class="home-top-left" :span="6"><span class="home-top-left-span">卢杰晟的个人博客</span></el-col>
            <el-col class="home-top-middle" :span="12">
              <el-menu :router="true" class="home-top-middle-menu" mode="horizontal" text-color="#0B0B22">
                <el-menu-item index="/home">博客首页</el-menu-item>
                <el-menu-item index="/">博文日记</el-menu-item>
                <el-menu-item index="/">文摘畅读</el-menu-item>
                <el-menu-item index="/">我的相册</el-menu-item>
                <el-menu-item index="/">我的视频</el-menu-item>
                <el-menu-item index="/">个人简历</el-menu-item>
              </el-menu>
            </el-col>
            <el-col class="home-top-right" :span="6">
              <el-input class="home-search" placeholder="请输入搜索关键字" v-model.trim="searchKey">
                <el-button slot="append" icon="el-icon-search" @click="search(searchKey)"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="home-body">
          <router-view />
        </el-main>
      </el-main>
      <!-- 底部 -->
      <el-footer>
        <el-link class="blog-address" :underline='false' type="primary" href="http://www.lujiesheng.cn/" target="_blank">Copyright © 2022 Lenceas.Blog - 卢杰晟的个人博客</el-link><br />
        <span class="hfbq">Powered by .NET 6 & Vue 2.x on Docker & CentOS</span><br />
        <el-link :underline='false' type="primary" href="http://beian.miit.gov.cn/" target="_blank">湘ICP备2021003806号-1</el-link>&nbsp;
        <el-tooltip content="Lenceas" placement="top" effect="light">
          <el-button class="home-footer-links">WeChat</el-button>
        </el-tooltip>
        <el-tooltip content="18890550991" placement="top" effect="light">
          <el-button class="home-footer-links">Tel</el-button>
        </el-tooltip>
        <el-tooltip content="2923280915" placement="top" effect="light">
          <el-button class="home-footer-links">QQ</el-button>
        </el-tooltip>
        <el-tooltip content="2923280915@qq.com" placement="top" effect="light">
          <el-button class="home-footer-links">Email</el-button>
        </el-tooltip>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'home-layout',
  data() {
    return {
      searchKey: ''
    };
  },
  methods: {
    search(searchKey) {
      if (searchKey) {
        //console.log("searchKey:", searchKey)
        // todo:
        this.$msg.warning('未查询到相关内容！')
        this.searchKey = ""
      }
      else {
        this.$msg.error('请输入搜索关键字！')
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/css/home/home-layout.css";
</style>