<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="$router.back()"
      fixed
      z-index="2"
    />
    <van-index-bar class="main" :index-list="indexList">
      <van-index-anchor index="当前城市" />
      <van-cell :title="city" />
      <van-index-anchor index="热门城市" />
      <van-cell
        :title="item.label"
        v-for="(item, index) in hotList"
        :key="index"
        @click="chose(item)"
      />

      <div v-for="(obj, index) in cityList" :key="index + '1'">
        <van-index-anchor :index="index.toUpperCase()" />
        <van-cell
          v-for="(item1, index1) in obj"
          :key="index1"
          :title="item1.label"
          @click="fn"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCitys, getHotCitys, citypoint } from '@/api/city'
import orderby from 'lodash/orderBy'
export default {
  created () {
    this.getCitys()
    this.getHotCitys()
  },
  data () {
    return {
      cityList: [],
      hotList: [],
      indexList: [],
      homes: [],
      city: '北京'
    }
  },
  methods: {
    async getCitys () {
      try {
        const { data } = await getCitys({ level: 1 })
        console.log('citylis', data)
        const citylist = {}
        this.cityList = data.body
        data.body = orderby(data.body, ['short'])
        console.log(data.body)
        data.body.forEach((item) => {
          const firstzm = item.short.substr(0, 1)
          if (citylist[firstzm]) {
            citylist[firstzm].push(item)
          } else {
            citylist[firstzm] = [item]
          }
          console.log(citylist)
        })
        const indexs = Object.keys(citylist).sort()
        this.indexList = ['#', '热'].concat(
          indexs.map((item) => item.toUpperCase())
        )
        this.cityList = citylist
      } catch (error) {
        console.log(error)
      }
    },
    async getHotCitys () {
      try {
        const { data } = await getHotCitys()
        console.log('hots', data)
        this.hotList = data.body
      } catch (error) {
        console.log(error)
      }
    },
    async citypoint (value) {
      this.homes = []
      try {
        const { data } = await citypoint({
          id: value
        })
        console.log('points')
        console.log(data.body)
        this.homes = data.body
      } catch (error) {
        console.log(error)
      }
    },
    chose (item) {
      console.log(item)
      this.homes = []
      this.citypoint(item.value)
      this.currencity = item.label
      this.$router.push({ path: '/home' })
      this.$store.commit('setCity', item)
    },
    fn () {
      this.$toast.fail('暂无数据')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar {
  .van-index-bar__index--active {
    background-color: #4eb979 !important;
  }
  .van-nav-bar__title {
    color: #fff;
    font-size: 40px;
  }
  .van-icon {
    color: #fff;
    font-size: 40px;
  }
}
.main {
  margin-top: 90px;
  height: calc(90vh - 90px);
  overflow-y: auto;
  /deep/ .van-index-bar__sidebar {
    span {
      margin: 12px 0;
    }
  }
  /deep/ .van-index-anchor {
    color: #999;
  }
  .van-cell__title {
    color: #333;
    font-size: 32px;
  }
}
</style>
