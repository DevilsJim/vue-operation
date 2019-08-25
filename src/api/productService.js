import request from '@/utils/product'

// 【查询商品一级分类】
export function getZgProductCategoryList(params) {
  return request({
    url: '/zgProductCategory/getZgProductCategoryList',
    method: 'post',
    data: params
  })
}
