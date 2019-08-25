import request from '@/utils/request'

// 我的客户列表
export function getList(params) {
  return request({
    url: '/zgCompany/all/condition/pager',
    method: 'post',
    params: params
  })
}

// 部门树状列表
export function getDeptTreeList() {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysDept/getDeptTreeListBySysId',
    method: 'get'
  })
}

// 根据部门id集合获取本部门及下级部门员工集合
export function getSysUserPageList(data) {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/getSysUserListByDeptIds',
    method: 'post',
    data
  })
}

// 获取当前用户及下属用户列表
export function getCurrentUserDeptUsers() {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/getCurrentUserDeptUsers',
    method: 'get'
  })
}

// 分配顾问
export function collectCompanyToOther(params) {
  return request({
    url: '/zgCompany/collectCompanyToOther',
    method: 'post',
    params: params
  })
}

// 变更客户
export function changeCompanyToOther(params) {
  return request({
    url: '/zgCompany/changeCompanyToOther',
    method: 'post',
    params: params
  })
}

// 审核无效客户
export function checkCompany(params) {
  return request({
    url: '/zgCompany/checkCompany',
    method: 'post',
    params: params
  })
}

// 根据顾问id下客户集合
export function getSysUserPageListById(params) {
  return request({
    url: '/zgUserPrivate/condition',
    method: 'post',
    params: params
  })
}

// 标签总列表
export function getTagsList(params) {
  return request({
    url: '/tag/all/list',
    method: 'post',
    params: params
  })
}

// 添加标签/分组
export function addTag(params) {
  return request({
    url: '/tag/save',
    method: 'post',
    params: params
  })
}

//  修改标签/分组
export function updateTag(params) {
  return request({
    url: '/tag/update',
    method: 'post',
    params: params
  })
}

//  删除标签/分组
export function deleteTag(params) {
  return request({
    url: '/tag/delete',
    method: 'post',
    params: params
  })
}

// 获取专利信息
export function getParentInfo(params) {
  return request({
    baseURL: process.env.VUE_APP_QUANTUM_API + '/parent/info',
    method: 'post',
    params: params
  })
}

// 获取商标信息
export function getTrademarkInfo(params) {
  return request({
    baseURL: process.env.VUE_APP_QUANTUM_API + '/trade/mark/info',
    method: 'post',
    params: params
  })
}

// 获取工商信息
export function getCommerceInfo(params) {
  return request({
    baseURL: process.env.VUE_APP_QUANTUM_API + '/commerce/info',
    method: 'post',
    params: params
  })
}
