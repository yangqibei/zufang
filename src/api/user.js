import request from '@/utils/request'

// 获取个人信息
export const getUser = () => {
  return request({
    url: 'user'
  })
}

// 我的出租rent
export const getRent = () => {
  return request({
    url: '/user/houses'
  })
}

// 我的收藏
export const getFavorites = (params) => {
  return request({
    url: '/user/favorites',
    params
  })
}

export const delFavorites = (params) => {
  return request({
    method: 'DELETE',
    url: '/user/favorites',
    params
  })
}
