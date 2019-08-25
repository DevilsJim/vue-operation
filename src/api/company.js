import request from '@/utils/request'

export function getInfo(params) {
  return request({
    url: '/zgCompany/condition',
    method: 'post',
    params: params
  })
}

export function updateCompamyData(params) {
  return request({
    url: '/zgCompany/update',
    method: 'post',
    params: params
  })
}
