<template>
  <div>
    <!-- 搜索框 -->
    <div class="search-box">
      <van-search label="地址" placeholder="请输入小区或地址">
        <template #label>
          <span @click="$router.push('/citys')"
            >{{ $store.state.city.label }}
            <i class="toutiao toutiao-gengduo"></i>
          </span>
          <em>|</em>
        </template>
      </van-search>
      <i class="toutiao toutiao-fenxiang" @click="$router.push('/maps')"></i>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img
          v-lazy="'http://liufusong.top:8080' + image.imgSrc"
          width="100%"
          height="212px"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 服务图标 -->
    <div class="serve">
      <div class="serves zhengzu">
        <img
          src="@/assets/下载.png"
          alt=""
          @click="$router.push('/home/list')"
        />
        <p>整租</p>
      </div>
      <div class="serves hezu">
        <img
          src="@/assets/合租.png"
          alt=""
          @click="$router.push('/home/list')"
        />
        <p>合租</p>
      </div>
      <div class="serves dituzhaofang">
        <img src="@/assets/地图.png" alt="" @click="$router.push('/maps')" />
        <p>地图找房</p>
      </div>
      <div class="serves quchuzu">
        <img
          src="@/assets/去出租.png"
          alt=""
          @click="$router.push('/rent/add')"
        />
        <p>去出租</p>
      </div>
    </div>
    <!-- 租房小组 -->
    <div class="groups">
      <div class="groups-title">
        <h3>租房小组</h3>
        <p>更多</p>
      </div>
      <div class="item">
        <div class="groups-item items" v-for="obj in groupslist" :key="obj.id">
          <img :src="'http://liufusong.top:8080' + obj.imgSrc" alt="图片" />
          <div class="right">
            <span>{{ obj.title }}</span>
            <span>{{ obj.desc }}</span>
          </div>
        </div>
        <!-- <div class="groups-item items">
          <img src="" alt="图片" />
          <p>家住回龙观</p>
          <p>家住回龙观</p>
        </div>
      </div>
      <div class="item">
        <div class="groups-item items">
          <img src="" alt="图片" />
          <p>家住回龙观</p>
          <p>家住回龙观</p>
        </div>
        <div class="groups-item items">
          <img src="" alt="图片" />
          <p>家住回龙观</p>
          <p>家住回龙观</p>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getSwiper, getGroups } from '@/api/home'
export default {
  created () {
    this.getSwiperlist()
    this.getGroupslist()
  },
  data () {
    return {
      images: [
      ],
      groupslist: []
    }
  },
  methods: {
    async getSwiperlist () {
      try {
        const res = await getSwiper()
        // console.log(res)
        this.images = res.data.body
      } catch (error) {
        console.log('获取失败')
      }
    },
    async getGroupslist () {
      try {
        const res = await getGroups()
        // console.log(res)
        this.groupslist = res.data.body
      } catch (error) {
        console.log('获取失败')
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
// 轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
// 搜索框
.search-box {
  position: fixed;
  display: flex;
  top: 50px;
  width: 100%;
  height: 68px;
  z-index: 2;
  align-content: center;
  justify-content: space-between;
}
.van-search {
  padding: 0;
  flex: 1;
  background-color: #ffffff;
  font-size: 24px;
  color: #9c9fa1;
  margin-left: 40px;
  em {
    padding-left: 28px;
    padding-right: 24px;
    color: #9c9fa1;
  }
}
.van-field__left-icon {
  margin-left: 24px;
}
.toutiao-fenxiang {
  font-size: 48px;
  color: #fff;
  padding-left: 20px;
  padding-top: 10px;
  padding-right: 20px;
}
// 服务图标
.serve {
  width: 100%;
  height: 243px;
  display: flex;
  img {
    width: 120px;
    height: 120px;
  }
  p {
    margin: 24px 0;
  }
}
.serves {
  flex: 1;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
}
// 合租小组
.groups {
  background-color: #f6f5f6;
  padding: 0 20px;
  height: 380px;
  .groups-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0 30px 20px;
    h3 {
      font-size: 30px;
      font-weight: 700;
    }
    p {
      font-size: 28px;
      color: #787d82;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .groups-item {
      width: 49%;
      height: 120px;
      background-color: #fff;
      display: flex;
      img {
        margin: 0 20px;
        width: 100px;
        height: 100px;
      }
      .right {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 140px;
        height: 100px;
        font-size: 28px;
      }
    }
  }
}
</style>
