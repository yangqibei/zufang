<template>
  <div>
    <van-nav-bar title="标题" left-arrow>
      <template #title>
        <div class="search-box">
          <van-search label="地址" placeholder="请输入小区或地址">
            <template #label>
              <span @click="$router.push('/citys')"
                >{{ $store.state.city.label }}
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
    <!-- shaixuan -->
    <div class="shaixuan">
      <van-sticky>
        <van-dropdown-menu duration="0.2" active-color="#4eb979">
          <van-dropdown-item title="区域" ref="item1">
            <van-picker
              value-key="label"
              show-toolbar
              item-height="30"
              toolbar-position="bottom"
              :columns="columns1"
              @confirm="onConfirm1"
              @cancel="onCancel"
            >
            </van-picker>
          </van-dropdown-item>
          <van-dropdown-item title="方式" ref="item2">
            <van-picker
              value-key="label"
              show-toolbar
              item-height="30"
              toolbar-position="bottom"
              :columns="columns2"
              @confirm="onConfirm2"
              @cancel="onCancel2"
            >
            </van-picker>
          </van-dropdown-item>
          <van-dropdown-item title="租金" ref="item3">
            <van-picker
              value-key="label"
              show-toolbar
              item-height="30"
              toolbar-position="bottom"
              :columns="columns3"
              @confirm="onConfirm3"
              @cancel="onCancel3"
            >
            </van-picker>
          </van-dropdown-item>
          <van-dropdown-item title="筛选" ref="item4" @open="show = true">
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
      <div class="items">
        <van-list
          offset="50"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="item" v-for="obj in homeList" :key="obj.id">
            <img :src="'http://liufusong.top:8080' + obj.houseImg" alt="" />
            <div class="right">
              <h3>{{ obj.title }}</h3>
              <p>{{ obj.desc }}</p>
              <p>近地铁</p>
              <p>
                <span>{{ obj.price }}</span
                >元/月
              </p>
            </div>
          </div>
        </van-list>
      </div>
      <!-- 弹出层 -->
      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '100%', width: '80%' }"
      >
        <!-- 户型 -->
        <van-checkbox-group v-model="result1">
          <van-cell title="户型"></van-cell>
          <van-checkbox
            :name="item.value"
            v-for="(item, index) in confidentList.roomType"
            :key="index"
          >
            <template #icon="props">
              <div :class="props.checked ? 'isactive' : ''" class="border">
                {{ item.label }}
              </div>
            </template>
          </van-checkbox>
        </van-checkbox-group>
        <hr />
        <!-- 朝向 -->
        <van-checkbox-group v-model="result2">
          <van-cell title="朝向"></van-cell>
          <van-checkbox
            :name="item.value"
            v-for="(item, index) in confidentList.oriented"
            :key="index"
          >
            <template #icon="props">
              <div :class="props.checked ? 'isactive' : ''" class="border">
                {{ item.label }}
              </div>
            </template>
          </van-checkbox>
        </van-checkbox-group>
        <hr />
        <!-- 楼层 -->
        <van-checkbox-group v-model="result3">
          <van-cell title="楼层"></van-cell>
          <van-checkbox
            :name="item.value"
            v-for="(item, index) in confidentList.floor"
            :key="index"
          >
            <template #icon="props">
              <div :class="props.checked ? 'isactive' : ''" class="border">
                {{ item.label }}
              </div>
            </template>
          </van-checkbox>
        </van-checkbox-group>
        <hr />
        <!-- 房屋亮点 -->
        <van-checkbox-group v-model="result4">
          <van-cell title="房屋亮点"></van-cell>
          <van-checkbox
            :name="item.value"
            v-for="(item, index) in confidentList.characteristic"
            :key="index"
          >
            <template #icon="props">
              <div :class="props.checked ? 'isactive' : ''" class="border">
                {{ item.label }}
              </div>
            </template>
          </van-checkbox>
        </van-checkbox-group>
        <hr />
        <van-row class="bottombox" type="position">
          <van-col span="8">
            <van-button block @click="show = false" class="cancelbtn"
              >取消</van-button
            >
          </van-col>
          <van-col span="16">
            <van-button block @click="OnConfirm4" class="confirmbtn"
              >确认</van-button
            >
          </van-col>
        </van-row>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getHomeList, getCondition } from '@/api/find'
export default {
  name: 'findhouse',
  created () {
    this.getHomeList()
    this.getCondition()
  },
  data () {
    return {
      active: 0,
      columns1: [],
      columns2: [],
      columns3: [],
      confidentList: [],
      show: false,
      result1: [],
      result2: [],
      result3: [],
      result4: [],
      homeList: [],
      loading: false,
      finished: false,
      start: 1,
      end: 20
    }
  },
  methods: {
    async onConfirm1 (value, index) {
      this.$refs.item1.toggle()
      if (index[0] === 0) {
        const res = await getHomeList({
          cityid: this.$store.state.city.value, area: this.columns1[0].children[index[1]].value
        })
        console.log(res)
        this.homeList = res.data.body.list
      } else {
        const res = await getHomeList({
          cityid: this.$store.state.city.value, area: this.columns1[1].children[index[1]].value
        })
        console.log(res)
        this.homeList = res.data.body.list
      }
      this.$toast.success('更新成功')
    },
    async onConfirm2 (value, index) {
      this.$refs.item2.toggle()
      const res = await getHomeList({
        cityid: this.$store.state.city.value, rentType: this.columns2[index].value
      })
      console.log(res)
      this.homeList = res.data.body.list
      this.$toast.success('更新成功')
    },
    async onConfirm3 (value, index) {
      console.log(this.columns3[index].value)
      this.$refs.item3.toggle()
      const res = await getHomeList({
        cityid: this.$store.state.city.value, price: this.columns3[index].value
      })
      console.log(res)
      this.homeList = res.data.body.list
      this.$toast.success('更新成功')
    },
    async OnConfirm4 () {
      this.show = false
      const res = await getHomeList({
        cityid: this.$store.state.city.value, roomType: this.result1, oriented: this.result2, floor: this.result3, characteristic: this.result4
      })
      console.log(res)
      this.homeList = res.data.body.list
      this.$toast.success('更新成功')
      this.result1 = []
      this.result2 = []
      this.result3 = []
      this.result4 = []
    },
    onCancel () {
      this.$refs.item1.toggle()
    },
    onCancel2 () {
      this.$refs.item2.toggle()
    },
    onCancel3 () {
      this.$refs.item3.toggle()
    },
    async getHomeList () {
      console.log(this.start)
      const res = await getHomeList({
        cityid: this.$store.state.city.value, start: this.start, end: this.end
      })
      console.log(res)
      if (res.data.body.list.length <= 0) {
        this.finished = true
      }
      this.homeList.push(...res.data.body.list)
    },
    async getCondition () {
      const res = await getCondition({
        id: this.$store.state.city.value
      })
      console.log(res)
      this.confidentList = res.data.body
      this.columns1 = [this.confidentList.area, this.confidentList.subway]
      this.columns2 = this.confidentList.rentType
      this.columns3 = this.confidentList.price
    },
    onLoad () {
      this.start = this.end
      this.end = this.end + 5
      this.getHomeList()
      // 加载状态结束
      this.loading = false
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
  padding-bottom: 100px;
  height: 100vh;
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
/deep/.van-checkbox-group {
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 50px;
  div {
    padding: 18px;
    height: 97%;
    color: #888;
  }
  .border {
    border: 1px solid #888;
    box-sizing: border-box;
  }
}
/deep/.isactive {
  color: #21b97a !important;
}
/deep/.cancelbtn {
  color: #21b97a;
}
/deep/.confirmbtn {
  background-color: #21b97a;
  color: #fff;
}
/deep/.van-dropdown-item {
  margin-bottom: 50px;
}
</style>
