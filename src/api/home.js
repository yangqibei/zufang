import request from '@/utils/request'
// 获取轮播图图片
export const getSwiper = () => {
  return request({
    url: '/home/swiper'
  })
}

// 获取租房小组数据
export const getGroups = () => {
  return request({
    url: '/home/groups'
  })
}

// 获得发布房屋所需要的参数
export const getPutHomeParams = () => {
  return request({
    url: '/houses/params'
  })
}

// 获取发布房屋所需信息
export const getimgs = (data) =>
  request({
    url: '/houses/image',
    method: 'post',
    data
  })

// 发布房源
export const puthome = (data) => request({
  url: '/user/houses',
  method: 'post',
  data
})

// 房屋详细信息
export const getinfo = (id) =>
  request({
    url: `/houses/${id}`
  })

// 是否收藏房屋 iscollecthome
export const iscollecthome = (id) => request({
  url: `/user/favorites/${id}`
})

// 添加收藏房屋 collecthome
export const collecthome = (id) => request({
  url: `/user/favorites/${id}`,
  method: 'post'
})

// 取消收藏房屋 collecthome
export const delhome = (id) => request({
  url: `/user/favorites/${id}`,
  method: 'delete'
})
