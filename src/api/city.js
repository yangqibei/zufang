import request from '@/utils/request'

/**
 *得到city
 */
export const getCitys = (params) => {
  return request({
    url: '/area/city',
    params
  })
}
/**
 *得到热门城市
 * @returns
 */
export const getHotCitys = () => {
  return request({
    url: '/area/hot'
  })
}

// 根据城市id获取该城市下的地名坐标信息
export const citypoint = (params) =>
  request({
    url: '/area/map',
    params
  })
