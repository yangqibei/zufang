<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="账号登录" left-arrow />
    <!-- 表单 -->
    <van-form @submit="onsubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            pattern: /^[a-zA-Z0-9_-]{4,8}$/,
            message: '用户名在4-8位之间',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            pattern: /^[a-zA-Z0-9_-]{6,8}$/,
            message: '密码长度在6-8位之间',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >登 录</van-button
        >
      </div>
    </van-form>
    <div class="info-box">
      <a class="login-info" @click="toregist">还没有账号，去注册~</a>
    </div>
  </div>
</template>

<script>
import { Login } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toregist () {
      this.$router.push({
        path: '/regiset', // 都去 router/index.js定义
        name: 'regiset'
      })
    },
    async onsubmit (value) {
      try {
        const res = await Login(value)
        console.log(res)
        this.$store.commit('setToken', res.data.body.token)
      } catch (error) {
        console.log(error)
        this.$toast.fail('登录失败')
      }
      if (this.$store.state.user && this.$store.state.user.token) {
        this.$toast.success('登录成功')
        setTimeout(async () => {
          try {
            await this.$router.push({ name: 'my' })
          } catch (error) {
            console.log(error)
          }
        }, 1000)
      } else {
        this.$toast.fail('账号密码错误 登录失败')
      }
    }
    // async onsubmit (value) {
    //   // console.log('submit', value)
    //   try {
    //     const res = await Login(value)
    //     console.log(res)
    //     this.$store.commit('setUser', res.data.body)
    //   } catch (error) {
    //     console.log(error)
    //     this.$toast.fail('登录失败')
    //     // token有限期2个小时 两种思路 让用户重新登录refresh_token
    //     if (this.$store.state.user && this.$store.state.user.token) {
    //       this.$toast.success('登录成功')
    //       setTimeout(() => {
    //         try {
    //           this.$router.push('/home')
    //         } catch (error) {
    //           console.log(error)
    //           this.$toast.fail('登录失败')
    //         }
    //       }, 2000)
    //     }
    //   }
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-field {
  height: 120px;
  font-size: 34px;
  margin-top: 42px;
  margin-bottom: 42px;
}
.login-btn {
  background-color: #21b97a;
  color: #fff;
  font-size: 36px;
  height: 100px;
}
.login-info {
  font-size: 28px;
  color: #666;
}
.info-box {
  width: 100%;
  text-align: center;
}
</style>
