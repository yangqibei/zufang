<template>
  <div class="main">
    <!-- 头部 -->
    <van-nav-bar title="房屋详情" left-arrow @click-left="$router.back()" />
    <van-swipe :autoplay="3000">
      <!-- 轮播图 -->
      <van-swipe-item v-for="(item, index) in homelist.houseImg" :key="index">
        <img v-lazy="'http://liufusong.top:8080' + item" />
      </van-swipe-item>
    </van-swipe>
    <!-- items -->
    <!-- 底部 -->
    <van-grid :border="true" :column-num="3" class="footer">
      <van-grid-item>
        <van-button plain>
          <van-icon
            :name="isFavorite ? 'star' : 'star-o'"
            :color="isFavorite ? 'red' : 'unset'"
            @click="collect"
          ></van-icon>
          收藏</van-button
        >
      </van-grid-item>
      <van-grid-item>
        <van-button plain>在线咨询</van-button>
      </van-grid-item>
      <van-grid-item>
        <van-button type="primary">电话预约</van-button>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getinfo } from '@/api/home'
import { getFavorites, delFavorites } from '@/api/user'
export default {
  created () {
    this.getinfo()
  },
  data () {
    return {
      homelist: [],
      likehome: '',
      isFavorite: null
    }
  },
  methods: {
    async getinfo () {
      const { data } = await getinfo(this.$store.state.homeCode)
      console.log(data)
      this.homelist = data.body
    },
    async iscollect () {
      console.log('是否收藏')
      const { data } = await getFavorites(this.$store.state.homeCode)
      console.log(data)
      this.isFavorite = data.body.isFavorite
    },
    async collect () {
      try {
        if (this.isFavorite) {
          this.$toast.loading('取消中...')
          console.log('取消收藏')
          const { data } = await delFavorites(this.$store.state.homeCode)
          console.log(data)
          this.isFavorite = false
          this.$toast('已取消收藏')
        } else {
          console.log('收藏')
          this.$toast.loading('收藏中...')
          const { data } = await getFavorites(this.$store.state.homeCode)
          console.log(data)
          this.isFavorite = true
          this.$toast.success('收藏成功')
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-swipe {
  height: 400px !important;
}
.footer {
  position: fixed;
  width: 100vw;
  bottom: 0;
}
</style>
