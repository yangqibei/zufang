<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
      <template>
        <div class="empty">
          <img src="@/assets/empty-image-default.png" alt="" />
          <p>暂无数据,请重新查询</p>
        </div>
      </template>
    </form>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
    },
    onCancel () {
      this.$toast('取消')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-search {
  background-color: #efecef;
}
.empty {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 320px;
    height: 320px;
    margin-bottom: 50px;
  }
  p {
    font-size: 28px;
    color: #969799;
  }
}
</style>
