import request from '@/utils/payment'

// 入账匹配列表 【线下入账匹配列表】
export function offlineIncomeList(params) {
  return request({
    url: '/account/offlineIncomeList',
    method: 'post',
    data: params
  })
}

// 入账匹配 详情【付款详情接口】
export function payDetail(params) {
  return request({
    url: '/account/payDetail/' + params,
    method: 'get'
  })
}
