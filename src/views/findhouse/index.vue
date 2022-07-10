<template>
  <div>
    <van-nav-bar title="标题" left-arrow>
      <template #title>
        <div class="search-box">
          <van-search label="地址" placeholder="请输入小区或地址">
            <template #label>
              <span @click="$router.push('/citys')"
                >北京
                <i class="toutiao toutiao-gengduo"></i>
              </span>
            </template>
          </van-search>
        </div>
      </template>
      <template #right>
        <i class="toutiao toutiao-fenxiang" @click="$router.push('/maps')"></i>
      </template>
    </van-nav-bar>
    <!-- layout -->
    <van-sticky>
      <div class="nav">
        <van-tabbar v-model="active" class="nav-item">
          <van-tabbar-item class="nav-items" @click="isPickerShow = ture"
            >区域 <span>▼</span></van-tabbar-item
          >
          <van-tabbar-item class="nav-items"
            >方式 <span>▼</span></van-tabbar-item
          >
          <van-tabbar-item class="nav-items"
            >租金 <span>▼</span></van-tabbar-item
          >
          <van-tabbar-item class="nav-items"
            >筛选 <span>▼</span></van-tabbar-item
          >
        </van-tabbar>
      </div>
    </van-sticky>
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      v-show="isPickerShow"
    />
    <!-- 房屋列表 -->
    <div class="items">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="obj in houseList" :key="obj.id">
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
  created () { },
  data () {
    return {
      active: 0,
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ],
      isPickerShow: false,
      houseList: [],
      morelist: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    change () {
    },
    async getRent () {
      try {
        const res = await getRent()
        console.log(res)
        this.houseList = res.data.body
        if (this.houseList.length <= 50) {
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
.search-box {
  position: relative;
  height: 68px;
  width: 550px;
  z-index: 2;
}
.van-search {
  position: absolute;
  top: 0;
  left: -40px;
  height: 68px;
  background-color: #ffffff;
  font-size: 24px;
  color: #9c9fa1;
}
.toutiao-fenxiang {
  font-size: 48px;
  color: #fff;
  padding-left: 20px;
  padding-top: 10px;
  padding-right: 20px;
}
.nav-item {
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  color: #9c9fa1;
  .nav-items {
    font-size: 34px;
    color: #333;
  }
  span {
    font-size: 24px;
  }
}
.van-tabbar {
  position: static;
  top: 0px;
  border-bottom: 1px solid #e4e6f0;
}
// 房屋列表
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
