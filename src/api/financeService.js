import request from 'utils/finance'
import requestJson from 'utils/requestJson'

// 账户列表 【接口名：进账公司列表接口】
export function getAllZgAccout() {
  return request({
    url: '/zgImportRoute/getAllZgAccout',
    method: 'get'
  })
}

// 添加账户【新增进账公司】
export function saveZgAccount(params) {
  return request({
    url: '/zgImportRoute/saveZgAccount',
    method: 'post',
    data: params
  })
}

// 打款账户设置列表 【分公司列表接口】
export function getList() {
  return request({
    url: '/zgBranchCompany/getList',
    method: 'get'
  })
}

// 添加公司 获取公司信息接口【部门树状列表】
export function getDeptTreeList(params) {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysDept/getDeptTreeList', // 这个调权限的地址
    method: 'post',
    data: params
  })
}

// 添加公司 保存操作【新增分公司】
export function save(params) {
  return request({
    url: '/zgBranchCompany/save',
    method: 'post',
    data: params
  })
}

// 账户列表 添加汇入途径保存【添加汇入途径】
export function addChannel(params) {
  return request({
    url: '/zgImportRoute/save',
    method: 'post',
    data: params
  })
}

// 账户列表 编辑汇入途径保存【修改进账汇入途径】 / 删除汇入途径 同一个接口
export function updateChannel(params) {
  return request({
    url: '/zgImportRoute/update',
    method: 'post',
    data: params
  })
}

// 账户列表 编辑汇入途径返显【根据进账公司业务id获取汇入途径列表】 / 查看汇入途径 同一个接口
export function getListByAccountId(params) {
  return request({
    url: '/zgImportRoute/getListByAccountId/' + params,
    method: 'get'
  })
}

// 打款账户设置 添加商品入账设置 保存【分公司商品打款账户配置】
export function saveMany(params) {
  return request({
    url: '/ZgBcompanyPtypeAccount/saveMany',
    method: 'post',
    data: params
  })
}

// 打款账户设置  编辑、查看 返显数据【根据分公司业务id获取进账公司配置详情】
export function getListByBranchCompanyId(params) {
  return request({
    url: '/ZgBcompanyPtypeAccount/getListByBranchCompanyId/' + params,
    method: 'get'
  })
}

// 打款账户设置 编辑 保存操作【分公司商品打款账户配置修改】
export function updateMany(params) {
  return request({
    url: '/ZgBcompanyPtypeAccount/updateMany',
    method: 'post',
    data: params
  })
}

// 进账列表 【进账分页条件查询】
export function getZgCustomerPaymentPageList(params) {
  return request({
    url: '/zgCustomerPayment/getZgCustomerPaymentPageList',
    method: 'post',
    data: params
  })
}

// 进账列表  汇入途径下拉框【汇入途径列表】
export function getImportRoutList(params) {
  return request({
    url: '/zgImportRoute/getImportRoutList',
    method: 'get'
  })
}

// 进账列表 删除【删除进账记录】
export function deleteByPksid(params) {
  return request({
    url: '/zgCustomerPayment/deleteByPksid/' + params,
    method: 'get'
  })
}

// 入账匹配 手动匹配进账【手动匹配进账】
export function manMatchZgCustomerPayment(params) {
  return request({
    url: '/zgCustomerPayment/manMatchZgCustomerPayment',
    method: 'post',
    data: params
  })
}

// 入账匹配 导入进账 里面的 匹配进账 【批量匹配进账接口】
export function matchZgCustomerPayment(params) {
  return request({
    url: '/zgCustomerPayment/matchZgCustomerPayment',
    method: 'post',
    data: params
  })
}

// 订单列表
export function getOrderList(data) {
  return request({
    url: 'http://192.168.91.112:10002/api/v1/zgOrder/getZgOrderPageList',
    method: 'post',
    data: data
  })
}

// 订单列表 - 业务类型
export function getOrderListSearchBusinessType(data = {}) {
  return requestJson({
    url: 'http://192.168.91.112:8012/api/v1/zgProductCategory/getZgProductCategoryTreeAndProduct',
    method: 'post',
    data
  })
}
