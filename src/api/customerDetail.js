import request from '@/utils/request'

// 查询动态记录
export function getCustomerDynamics(params) {
  return request({
    url: '/crmDynamicLog/condition/pager',
    method: 'post',
    params: params
  })
}

// 查询主公司关系
export function getCompanyDetail(params) {
  return request({
    url: '/zgCompany/condition',
    method: 'post',
    params: params
  })
}

// 查询主子公司关系
export function getCompanyChildrenDetail(params) {
  return request({
    url: '/zgCompany/releationCondition',
    method: 'post',
    params: params
  })
}

// 查询公司下的联系人
export function getLatentUserPager(params) {
  return request({
    url: '/zgLatentUser/condition/pager',
    method: 'post',
    params: params
  })
}
export function saveZgLatentUser(params) {
  return request({
    url: '/zgLatentUser/save',
    method: 'post',
    params: params
  })
}

// 设置子公司为主显公司
export function setChild2Parent(params) {
  return request({
    url: '/zgCompany/selectAndUpdateToMainCompany',
    method: 'post',
    params: params
  })
}
export function saveFollowDataR(params) {
  return request({
    url: '/tCompanyFollow/save',
    method: 'post',
    params: params
  })
}

// 当前负责人详情查询
export function getLeaderInfo(params) {
  return request({
    url: '/zgUserPrivate/condition',
    method: 'post',
    params: params
  })
}
export function saveBusinessDataR(params) {
  return request({
    url: '/zgBusiness/save',
    method: 'post',
    params: params
  })
}

// 释放到公海
export function setPrivateToPublic(params) {
  return request({
    url: '/zgCompany/releaseCompanyToPublic',
    method: 'post',
    params: params
  })
}

export function getLatentUserDetail(params) {
  return request({
    url: '/zgLatentUser/condition',
    method: 'post',
    params: params
  })
}

// 商机列表
export function getBusinessPager(params) {
  return request({
    url: '/zgBusiness/condition/pager',
    method: 'post',
    params: params
  })
}

export function getBusinessDetail(params) {
  return request({
    url: '/zgBusiness/condition',
    method: 'post',
    params: params
  })
}

export function updateLatentUserDetail(params) {
  return request({
    url: '/zgLatentUser/update',
    method: 'post',
    params: params
  })
}

// 保存商机
export function saveBusiness(params) {
  return request({
    url: '/zgBusiness/save',
    method: 'post',
    params: params
  })
}

// 保存商机
export function updateBusiness(params) {
  return request({
    url: '/zgBusiness/update',
    method: 'post',
    params: params
  })
}

// 公司详情修改
export function updateCompanyInfo(params) {
  return request({
    url: '/zgCompany/update',
    method: 'post',
    params: params
  })
}
