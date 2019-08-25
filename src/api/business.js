import request from '@/utils/request'

// 商机动态记录列表/详情
export function getBusinessList(params) {
  return request({
    url: '/zgBusiness/condition/pager/vo',
    method: 'post',
    params: params
  })
}

// 创建商机
export function createBusiness(params) {
  return request({
    url: '/zgBusiness/save',
    method: 'post',
    params: params
  })
}

// 创建商机
export function updateBusiness(params) {
  return request({
    url: '/zgBusiness/update',
    method: 'post',
    params: params
  })
}

// 客户/公司详情
export function getCompanyDetail(params) {
  return request({
    url: '/zgCompany/detail',
    method: 'post',
    params: params
  })
}

// 我的客户列表
export function getMyCustomerList(params) {
  return request({
    url: '/zgCompany/private/condition/pager',
    method: 'post',
    params: params
  })
}

// 商机客户列表
export function getBusinessCustomerList(params) {
  return request({
    url: '/zgCompany/business/condition/pager',
    method: 'post',
    params: params
  })
}

// 商机客户列表
export function getContactList(params) {
  return request({
    url: '/zgLatentUser/condition/pager/business',
    method: 'post',
    params: params
  })
}

// 商机跟进记录
export function getBusinessFollowList(params) {
  return request({
    url: '/zgBusinessFollow/condition/pager',
    method: 'post',
    params: params
  })
}

// 商机动态记录
export function getBusinessDynamic(params) {
  return request({
    url: '/zgBusinessLog/condition/pager',
    method: 'post',
    params: params
  })
}

// 商机分配转移释放
export function businessDeal(params) {
  return request({
    url: '/zgBusiness/deal',
    method: 'post',
    params: params
  })
}

// 商机跟进
export function businessFollow(params) {
  return request({
    url: '/zgBusinessFollow/save',
    method: 'post',
    params: params
  })
}

