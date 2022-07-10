import request from '@/utils/request'

/**
 * 获取房屋查询条件
 * @param {需要查询的城市id} params
 * @returns
 */
export const getCondition = (params) => {
  return request({
    url: '/houses/condition',
    params
  })
}

export const getMaps = (params) => {
  return request({
    url: '/area/map',
    params
  })
}

export const getHomeList = (params) => {
  return request({
    url: '/houses',
    params
  })
}
