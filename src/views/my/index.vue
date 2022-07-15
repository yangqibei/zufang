<template>
  <div>
    <div class="header header-login" v-if="user && user.token">
      <div class="bgi">
        <img src="@/assets/nologin-bg.png" alt="" />
        <div class="user">
          <div class="user-info">
            <img :src="'http://liufusong.top:8080' + userInfo.avatar" alt="" />
          </div>
          <p>{{ userInfo.nickname }}</p>
          <button @click="logout">退出</button>
          <p>编辑个人资料 ▶</p>
        </div>
      </div>
    </div>
    <!-- header -->
    <div class="header header-nologin" v-else>
      <div class="bgi">
        <img src="@/assets/login-bg.png" alt="" />
        <div class="user">
          <div class="user-info">
            <img src="@/assets/login-touxiang.png" alt="" />
          </div>
          <p>游客</p>
          <button @click="$router.push('/login')">去登陆</button>
        </div>
      </div>
    </div>
    <!-- tab-icon -->
    <van-grid :column-num="3">
      <van-grid-item text="我的收藏" @click="$router.push('/favorate')">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="我的出租" @click="$router.push('/rent')">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="看房记录">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="成为房主">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="个人资料">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="联系我们">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- banner -->
    <div class="footer">
      <img src="@/assets/banner.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  created () {
    this.getUser()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '是否确认退出', title: '提示' })
          .then(() => {
            this.$store.commit('setToken', '')
            this.$toast.success('成功退出')
          })
          .catch(() => {
            this.$toast.fail('取消退出')
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getUser () {
      try {
        const res = await getUser()
        console.log(res)
        this.userInfo = res.data.body
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// header
.header {
  width: 100%;
}
.header-login {
  min-height: 600px;
  position: relative;
  img {
    width: 100%;
    position: relative;
  }
  .user {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 640px;
    height: 420px;
    background-color: #fff;
    box-shadow: 0 0 20px 6px #ddd;
    transform: translateX(-50%);
    text-align: center;
    font-size: 26px;
    margin-bottom: 10px;
    .user-info {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      border: 10px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 4px 4px #bdbdbd;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    p {
      margin: -40px 0 10px;
      &:nth-child(4) {
        color: #999;
        font-size: 24px;
      }
    }
    button {
      width: 100px;
      height: 40px;
      background-color: #21b97a;
      color: #fff;
      border: none;
      border-radius: 20px;
      margin-bottom: 80px;
    }
  }
}
.header-nologin {
  min-height: 700px;
  position: relative;
  img {
    width: 100%;
    position: relative;
  }
  .user {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 640px;
    height: 330px;
    background-color: #fff;
    box-shadow: 0 0 20px 6px #ddd;
    transform: translateX(-50%);
    text-align: center;
    font-size: 26px;
    .user-info {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      border: 10px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 4px 4px #bdbdbd;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    p {
      margin: -40px 0 40px;
    }
    button {
      width: 140px;
      height: 60px;
      background-color: #21b97a;
      color: #fff;
      border: none;
      border-radius: 10px;
    }
  }
}
//icon-tab
.toutiao {
  font-size: 40px;
}
/deep/.van-grid-item__text {
  color: #333;
  font-size: 26px;
  margin-top: 10px;
}
.footer {
  img {
    position: relative;
    top: 20px;
    left: 60px;
    width: 85%;
  }
}
</style>
