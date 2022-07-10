/* eslint-disable eqeqeq */
<template>
  <div class="main">
    <div class="header">
      <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    </div>
    <van-form>
      <van-field label="房源信息" class="title" />
      <van-cell
        title="小区名称"
        :value="xiaoqu"
        is-link
        @click="$router.push('/rent/search')"
      />
      <van-field v-model="zujin" label="租  金" placeholder="请输入租金/月">
        <span slot="extra">￥/月</span>
      </van-field>
      <van-field v-model="mianji" label="建筑面积" placeholder="请输入建筑面积">
        <span slot="extra">m²</span>
      </van-field>
      <van-cell
        title="户 型"
        :value="huxing"
        is-link
        @click="roomType1 = true"
      />
      <van-cell
        title="所在楼层"
        :value="louceng"
        is-link
        @click="floor1 = true"
      />
      <van-cell
        title="朝向"
        :value="chaoxiang"
        is-link
        @click="oriented1 = true"
      />
      <van-cell title="房屋标题" />
      <van-field
        v-model="datas.title"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
      <van-cell title="房屋图像" />
      <van-uploader v-model="fileList" multiple :after-read="afterRead" />
      <van-cell title="房屋配置" />
      <van-checkbox-group v-model="result">
        <van-grid :column-num="5">
          <van-checkbox
            :name="item.label"
            v-for="(item, index) in puthomeinfo.supporting"
            :key="index"
          >
            <template #icon="props">
              <van-grid-item :class="{ isactive: props.checked }">
                <span class="txt"
                  ><i slot="icon" class="toutiao toutiao-shipin"></i> <br />
                  {{ item.label }}</span
                >
              </van-grid-item>
            </template>
          </van-checkbox>
        </van-grid>
      </van-checkbox-group>
      <van-cell title="房屋描述" />
      <van-field
        v-model="datas.description"
        type="textarea"
        rows="4"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        class="miaoshu"
      />
      <div class="form-btn">
        <van-button type="info" @click="this.$router.back()">取消</van-button>
        <van-button type="info" @click="puthomes">提交</van-button>
      </div>
    </van-form>
    <!-- 户型 -->
    <van-popup v-model="roomType1" position="bottom">
      <van-picker
        show-toolbar
        :columns="puthomeinfo.roomType.map((item) => item.label)"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 楼层 -->
    <van-popup v-model="floor1" position="bottom">
      <van-picker
        show-toolbar
        :columns="puthomeinfo.floor.map((item) => item.label)"
        @confirm="onConfirm1"
        @cancel="onCancel1"
      />
    </van-popup>
    <!-- 朝向 -->
    <van-popup v-model="oriented1" position="bottom">
      <van-picker
        show-toolbar
        :columns="puthomeinfo.oriented.map((item) => item.label)"
        @confirm="onConfirm2"
        @cancel="onCancel2"
      />
    </van-popup>
  </div>
</template>

<script>
import { getPutHomeParams, getimgs, puthome } from '@/api/home'
export default {
  name: 'rentAdd',
  created () {
    this.getPutHomeParams()
  },
  data () {
    return {
      searchShow: false,
      zujin: '',
      mianji: '',
      huxing: '请选择',
      louceng: '请选择',
      chaoxiang: '请选择',
      xiaoqu: '请选择小区名称',
      roomType1: false,
      floor1: false,
      oriented1: false,
      puthomeinfo: {},
      fileList: [],
      result: [],
      datas: {
        roomType: null,
        floor: null,
        oriented: null,
        title: null,
        description: null,
        supporting: null,
        zujin: null,
        mianji: null,
        community: null,
        houseImg: null
      },
      imgs: []
    }
  },
  methods: {
    async getPutHomeParams () {
      try {
        const { data } = await getPutHomeParams()
        console.log(data)
        this.puthomeinfo = data.body
      } catch (error) {
        console.log(error)
      }
    },
    onConfirm (value, index) {
      console.log(value, index)
      this.huxing = value
      this.puthomeinfo.roomType.forEach((item) => {
        if (item.label == value) {
          this.datas.roomType = item.value
        }
      })
      this.roomType1 = false
    },
    onConfirm1 (value, index) {
      console.log(value, index)
      this.louceng = value
      this.puthomeinfo.floor.forEach((item) => {
        if (item.label == value) {
          this.datas.floor = item.value
        }
      })
      this.floor1 = false
    },

    onConfirm2 (value, index) {
      console.log(value, index)
      this.chaoxiang = value
      this.puthomeinfo.oriented.forEach((item) => {
        if (item.label == value) {
          this.datas.oriented = item.value
        }
      })
      this.oriented1 = false
    },
    onCancel () {
      this.roomType1 = false
    },
    onCancel1 () {
      this.floor1 = false
    },
    onCancel2 () {
      this.oriented1 = false
    },
    // 图片处理
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      const formdata = new FormData()
      formdata.append('file', file.file)
      const { data } = await getimgs(formdata)
      console.log('上传图片')
      console.log(data.body)
      this.imgs.push(data.body)
    },
    async puthomes () {
      this.$toast.loading('发布中...')
      try {
        this.datas.supporting = this.result.join('|')
        this.datas.houseImg = this.imgs.join('|')
        if (this.imgs.length <= 0) {
          return this.$toast('请上传图片')
        }
        const { data } = await puthome(this.datas)
        if (data.status != 200) {
          this.$toast.fail('发布失败，重新登录试试')
        } else {
          this.$dialog
            .confirm({
              title: '提示',
              message: '发布房源成功',
              confirmButtonText: '继续发布',
              cancelButtonText: '去查看'
            })
            .then(() => {
              console.log('继续')
              // this.datas.forEach(item=>item==null)
              for (let key in this.datas) {
                key = null
                console.log(key)
              }
            })
            .catch(() => {
              this.$router.push('/findhouse')
            })
        }
        console.log('新增房源')
        console.log(data)
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
/deep/.van-form {
  height: 2000px;
}
.form-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .van-button {
    &:nth-child(1) {
      background: #fff;
      color: mediumseagreen;
      border: none;
    }
    &:nth-child(2) {
      background: mediumseagreen;
      border: none;
    }
  }
}
.van-button {
  flex: 1;
}
/deep/.main {
  background-color: #f6f5f6;
  height: 1500px;
}
/deep/.title {
  span {
    color: #21b97a;
  }
}
.van-search {
  position: absolute;
  width: 100%;
  top: -500px;
  height: 100%;
  z-index: 2;
}
/deep/ .van-checkbox {
  padding: 10px 10px;
}
/deep/ .van-checkbox__icon {
  height: unset;
}
/deep/.txt {
  text-align: center;
  width: 100%;
  margin-bottom: 12px;
  .toutiao {
    font-size: 36px;
  }
  text-align: center;
  font-size: 30px;
}
/deep/.van-checkbox {
  padding: 0;
  flex: 20%;
  background-color: #fff;
}
/deep/.miaoshu {
  border: 1px solid #ededed;
}
/deep/.isactive {
  color: #21b97a;
}
</style>
