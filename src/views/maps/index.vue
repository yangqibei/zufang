<template>
  <div>
    <van-nav-bar left-arrow title="地图找房" @click-left="$router.back()" />
    <div id="container"></div>
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '70%' }">
      <div class="items">
        <div
          class="item"
          @click="todetial(index)"
          v-for="(obj, index) in homeList"
          :key="index"
        >
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
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getMaps, getHomeList } from '@/api/find'
export default {
  data () {
    return {
      cityList: [],
      time: 0,
      showPopup: false,
      homeList: [],
      homeCode: []
    }
  },
  created () {
    this.initMap('AREA|88cff55c-aaa4-e2e0')
  },
  mounted () {
  },
  methods: {
    async initMap (id) {
      const { data } = await getMaps({
        id
      })
      console.log(data)
      this.createMap(data.body)
    },
    createMap (Arr) {
      const { BMapGL } = window
      const map = new BMapGL.Map('container')
      map.centerAndZoom(new BMapGL.Point(Arr[0].coord.longitude, Arr[0].coord.latitude), 15)
      map.enableScrollWheelZoom(true)
      Arr.forEach(obj => {
        // console.log(obj)
        const opts = {
          position: new BMapGL.Point(obj.coord.longitude, obj.coord.latitude), // 指定文本标注所在的地理位置
          offset: new BMapGL.Size(30, -30) // 设置文本偏移量
        }
        // 创建文本标注对象
        if (this.time > 2) {
          this.wenzi = `<p class='label'>${obj.label}  ${obj.count}套 <i class='map_arrow__27v3o></i> </p>`
        } else {
          this.wenzi = `<p class='label'>${obj.label} </br> ${obj.count}套</p>`
        }
        const label = new BMapGL.Label(this.wenzi, opts)
        // 自定义文本标注样式
        if (this.time < 2) {
          label.setStyle({
            color: '#fff',
            borderColor: '#fff',
            backgroundColor: 'blue',
            padding: '14px 0 0',
            fontSize: '12px',
            textAlign: 'center',
            boxSizing: ' border-box',
            lineHeight: '18px',
            height: '70px',
            width: '70px',
            borderRadius: '50%'
          })
        } else {
          label.setStyle({
            color: '#fff',
            borderColor: '#fff',
            backgroundColor: 'blue',
            fontSize: '12px',
            textAlign: 'center',
            boxSizing: ' border-box',
            height: '38px',
            width: '100px'
          })
        }
        map.addOverlay(label)
        label.addEventListener('click', async () => {
          // console.log(obj.value)
          this.time++
          if (this.time <= 2) {
            map.clearOverlays()
            this.initMap(obj.value)
          } else {
            this.showPopup = true
            try {
              const res = await getHomeList({
                cityId: obj.value
              })
              this.homeList = res.data.body.list
              this.homeList.forEach(item => {
                this.homeCode.push(item.houseCode)
                console.log(item.houseCode)
              })
              console.log(this.homeCode)
            } catch (error) {
              console.log(error)
            }
          }
        })
      })
    },
    todetial (index) {
      this.$store.commit('setHomeCode', this.homeCode[index])
      this.$router.push('/detial')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
#container {
  width: 100vw;
  height: 100vh;
}
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
