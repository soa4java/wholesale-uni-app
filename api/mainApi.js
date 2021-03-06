import {request}  from './request.js'

// 获取首页数据
const getHomeList = data => {
  return request({
    url: '/api/ws/act/pageLayout/getListByParentId',
    data: data
  })
}

const addHit = data => {
  return request({
    url: '/api/ws/act/ad/addHit',
    method: 'post',
    data,
    type: 'form'
  })
}

export { getHomeList, addHit }