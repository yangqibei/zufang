import request from '@/utils/request'
// 登录接口书写
export const Login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
