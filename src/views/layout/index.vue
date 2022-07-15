<template>
  <div>
    <!-- 二级路由界面 -->
    <router-view class="main"></router-view>
    <!-- tabber栏 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/findhouse" icon="search">
        找房
        <template #icon>
          <i class="toutiao toutiao-sousuo"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/info" icon="home-o">
        资讯
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search">
        我的
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-tabbar-item__icon {
  .toutiao {
    font-size: 44px;
  }
}
.van-tabbar-item__text {
  font-size: 24px;
}
.van-tabbar {
  position: fixed;
  height: 100px;
  bottom: 0;
}

/deep/.main {
  height: 100vh;
}
</style>
