import request from '@/utils/request'

export function getMailList(params) {
  return request({
    url: '/zgCompanyAddress/condition',
    method: 'post',
    params: params
  })
}

export function updateMailData(params) {
  return request({
    url: '/zgCompanyAddress/update',
    method: 'post',
    params: params
  })
}
export function updateZgCompanyAddressToDefault(params) {
  return request({
    url: '/zgCompanyAddress/updateZgCompanyAddressToDefault',
    method: 'post',
    params: params
  })
}

export function addMailData(params) {
  return request({
    url: '/zgCompanyAddress/save',
    method: 'post',
    params: params
  })
}

