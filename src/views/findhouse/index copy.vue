<template>
  <div>
    <div class="header">
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
          <i
            class="toutiao toutiao-fenxiang"
            @click="$router.push('/maps')"
          ></i>
        </template>
      </van-nav-bar>
    </div>
    <div class="shaixuan">
      <van-dropdown-menu duration="0.2" active-color="#4eb979">
        <van-dropdown-item title="区域" ref="item1">
          <van-picker
            show-toolbar
            item-height="30"
            toolbar-position="bottom"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          >
          </van-picker>
        </van-dropdown-item>
        <!-- <van-dropdown-item title="方式" ref="item2">
          <van-picker
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
          <van-popup
            v-model="show"
            v-if="show"
            position="right"
            :style="{ height: '100%', width: '80%' }"
          >
            <van-checkbox-group v-model="result" direction="horizontal">
              <van-cell>
                <span class="option">户型</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.roomType"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
              <van-cell>
                <span class="option">朝向</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.oriented"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
              <van-cell>
                <span class="option">楼层</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.floor"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
              <van-cell>
                <span class="option">房屋亮点</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.characteristic"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
            </van-checkbox-group>
            <div class="btns">
              <van-button class="cancel1" @click="onCancel4">清除</van-button>
              <van-button class="sure1" @click="onConfirm4">确定</van-button>
            </div>
          </van-popup> -->
        <!-- </van-dropdown-item> -->
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import { setKeys } from '@/utils/getData'
import { getCondition } from '@/api/find'
export default {
  created () {
    this.getCondition()
  },
  data () {
    return {
      columns: []
    }
  },
  methods: {
    // 获取房屋查询的条件
    async getCondition () {
      const { data } = await getCondition({
        id: 'AREA|88cff55c-aaa4-e2e0'
      })
      console.log(data)
      const newData = []
      setKeys(data.body.subway, newData)
      console.log(newData)
    },
    onConfirm () { },
    onCancel () { }
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
</style>
