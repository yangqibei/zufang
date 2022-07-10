<template>
  <div>
    <div class="header">
      <van-nav-bar title="房屋管理" left-arrow @click-left="$router.back()" />
    </div>
    <div class="noitems" v-if="rentList.length == 0">
      <img src="@/assets/not-found.png" alt="" />
      <p>
        您还没有房源<span @click="$router.push('/rent/add')">去发布房源</span
        >吧~
      </p>
    </div>
    <div class="items" v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="obj in rentList" :key="obj.id">
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
import { getRent } from '@/api/user'
export default {
  name: 'rent',
  created () {
    this.getRent()
  },
  data () {
    return {
      rentList: [],
      morelist: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getRent () {
      try {
        const res = await getRent()
        console.log(res)
        this.rentList = res.data.body
        if (this.rentList.length <= 50) {
          this.finished = true
        } else {
          this.morelist = res.data.body
        }
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getRent()
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
.noitems {
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 300px;
    height: 200px;
    margin-bottom: 60px;
  }
  p {
    font-size: 28px;
    span {
      color: #33be85;
    }
  }
}
</style>
