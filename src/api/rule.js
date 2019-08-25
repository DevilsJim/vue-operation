import request from '@/utils/requestRule'

/**
 * 规则配置
 * */
// 获取顾问私池数量列表
export function getCustomerPrivateList(params) {
  return request({
    url: '/sysUserPrivateLimit/condition/pager/vo',
    method: 'post',
    params: params
  })
}

// 批量修改顾问私池数量
export function updateCustomerPrivateALl(params) {
  return request({
    url: '/sysUserPrivateLimit/updateAll',
    method: 'post',
    params: params
  })
}

// 修改指定顾问私池数量
export function updateCustomerPrivate(params) {
  return request({
    url: '/sysUserPrivateLimit/update',
    method: 'post',
    params: params
  })
}

// 查询客户回收规则
export function getCustomerBackList(params) {
  return request({
    url: '/customerBackRule/condition',
    method: 'post',
    params: params
  })
}

// 修改客户回收规则
export function updateCustomerBackList(params) {
  return request({
    url: '/customerBackRule/update',
    method: 'post',
    params: params
  })
}

// 获取释放原因列表
export function getReleaseReasonList(params) {
  return request({
    url: '/releaseReason/condition',
    method: 'post',
    params: params
  })
}

// 新增释放原因
export function addReleaseReason(params) {
  return request({
    url: '/releaseReason/save',
    method: 'post',
    params: params
  })
}

// 修改释放原因
export function updateReleaseReason(params) {
  return request({
    url: '/releaseReason/update',
    method: 'post',
    params: params
  })
}

// 删除释放原因
export function deleteReleaseReason(params) {
  return request({
    url: '/releaseReason/delete',
    method: 'post',
    params: params
  })
}
