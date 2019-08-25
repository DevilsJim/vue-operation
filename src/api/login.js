import request from '@/utils/request'

// 登录
export function login(params) {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/auth/login',
    method: 'get',
    params: params
  })
}

// 获取用户详情
export function getUserInfo(userID) {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/selectByID/' + userID,
    method: 'get'
  })
}
