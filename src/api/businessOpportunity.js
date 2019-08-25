import request from '@/utils/request'

// 商机清单查询
export function getBusinessList(params) {
  return request({
    url: '/zgBusiness/condition/pager/all',
    method: 'post',
    params: params
  })
}

// 组内释放商机【接口：我的商机列表】
export function getIntragroupReleaseList(params) {
  return request({
    url: '/zgBusiness/condition/pager/vo',
    method: 'post',
    params: params
  })
}

// 分配转移释放
export function deal(params) {
  return request({
    url: '/zgBusiness/deal',
    method: 'post',
    params: params
  })
}

// 编辑商机[组内释放商机-标为失效]
export function update(params) {
  return request({
    url: 'zgBusiness/update',
    method: 'post',
    params: params
  })
}
