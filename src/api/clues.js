import request from '@/utils/request'

// 线索最大容量查询
export function getCluesMaxNumber(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/thread/container/set/condition',
    method: 'post',
    params: params
  })
}

// 修改线索最大容量
export function saveCluesMaxNumber(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/thread/container/set/update',
    method: 'post',
    params: params
  })
}

// 线索回收查询
export function getCluesCollectionData(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/thread/collection/set/condition',
    method: 'post',
    params: params
  })
}

// 线索回收修改
export function saveCluesCollectionData(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/thread/collection/set/update',
    method: 'post',
    params: params
  })
}

// 商机最大容量查询
export function getbusinessMaxNumber(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/businessPrivateLimit/detail',
    method: 'post',
    params: params
  })
}

// 商机数量限制更新
export function saveBusinessMaxNumber(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/businessPrivateLimit/update',
    method: 'post',
    params: params
  })
}

// 商机超时列表
export function getBusinessOvertime(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/businessOvertime/condition',
    method: 'post',
    params: params
  })
}

// 商机超时更新
export function updateBusinessOvertime(data) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/businessOvertime/update',
    method: 'post',
    data
  })
}
