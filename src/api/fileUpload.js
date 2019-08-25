import request from '@/utils/request'

export function fileUpload(params) {
  return request({
    baseURL: process.env.VUE_APP_FILE_API + 'common/upload',
    method: 'get',
    params: params
  })
}
