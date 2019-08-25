import request from '@/utils/request'

// 我的客户列表
export function getList(params) {
  return request({
    url: '/zgCompany/private/condition/pager',
    method: 'post',
    params: params
  })
}

// 资源库列表
export function getResourceList(params) {
  return request({
    url: '/zgCompany/public/condition/pager',
    method: 'post',
    params: params
  })
}

// 公司详情
export function getCompanyInfo(params) {
  return request({
    url: '/zgCompany/condition',
    method: 'post',
    params: params
  })
}

// 公司详情
export function getCompanyRelation(params) {
  return request({
    url: '/zgCompany/releationCondition',
    method: 'post',
    params: params
  })
}

// 当前负责人详情
export function getUserPrivate(params) {
  return request({
    url: '/zgUserPrivate/condition',
    method: 'post',
    params: params
  })
}

// 公司联系人列表
export function getUserPrivateList(params) {
  return request({
    url: '/zgLatentUser/condition/pager',
    method: 'post',
    params: params
  })
}

// 公司动态记录查询
export function getCrmDynamicLog(params) {
  return request({
    url: '/crmDynamicLog/condition/pager',
    method: 'post',
    params: params
  })
}

// 捡入私海
export function pickUpPrivate(params) {
  return request({
    url: '/zgCompany/collectCompanyToPrivate',
    method: 'post',
    params: params
  })
}

// 添加客户
export function createCustomer(params) {
  return request({
    url: '/zgCompany/createCompany',
    method: 'post',
    params: params
  })
}
