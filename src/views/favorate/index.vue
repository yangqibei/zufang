<template>
  <div>
    <div class="header">
      <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" />
    </div>
    <div class="items">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="obj in favorateList" :key="obj.id">
          <img :src="'http://liufusong.top:8080' + obj.houseImg" alt="" />
          <div class="right">
            <h3>{{ obj.title }}</h3>
            <p>{{ obj.desc }}</p>
            <p>{{ obj.tags[0] }}</p>
            <p>
              <span>{{ obj.price }}</span
              >元/月
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getFavorites } from '@/api/user'
export default {
  created () {
    this.getFavorites()
  },
  data () {
    return {
      loading: false,
      finished: false,
      favorateList: [],
      morelist: []
    }
  },
  methods: {
    async getFavorites () {
      try {
        const res = await getFavorites()
        console.log(res)
        this.favorateList = res.data.body
        if (this.favorateList.length <= 50) {
          this.finished = true
        } else {
          this.morelist = res.data.body
        }
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getFavorites()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.items {
  padding-left: 20px;
  .item {
    width: 710px;
    height: 200px;
    display: flex;
    margin-top: 38px;
    img {
      width: 212px;
      height: 160px;
      margin-right: 24px;
    }
    .right {
      flex: 1;
      h3 {
        font-size: 30px;
        font-weight: 700;
        color: #394043;
      }
      p {
        margin-bottom: 15px;
        &:nth-child(2) {
          font-size: 24px;
          color: #afb2b3;
        }
        &:nth-child(3) {
          text-align: center;
          width: 92px;
          color: #39becd;
          background: #e1f5f8;
          font-size: 24px;
          border-radius: 6px;
          margin-left: 6px;
        }
        &:nth-child(4) {
          font-size: 24px;
          color: #fa5741;
        }
        span {
          font-size: 32px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
