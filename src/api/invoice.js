import requestJson from 'utils/requestJson'

// 发票列表
export function getInvoiceList(data = {}) {
  return requestJson({
    url: 'http://192.168.91.112:10002/api/v1/zgInvoice/getInvoicePageList',
    method: 'post',
    data
  })
}

// 发票列表 - 获取红冲列表
export function getHCList(params) {
  return requestJson({
    url: `http://192.168.91.112:10002/api/v1/zgInvoice/getInvoiceListByOrderId/${params.invoiceId}`,
    method: 'get'
  })
}

// 发票列表 - 申请红冲
export function getInvoiceListHC(data = {}) {
  return requestJson({
    url: 'http://192.168.91.112:10002/api/v1/zgInvoice/applyRedDash',
    method: 'post',
    data
  })
}

// 发票列表 - 确定红冲
export function ensureInvioiceHc(data = {}) {
  return requestJson({
    url: 'http://192.168.91.112:10002/api/v1/zgInvoice/confirmRedDash',
    method: 'post',
    data
  })
}

// 发票列表 - 导出发票
export function exportInvoice(data = {}) {
  return requestJson({
    url: 'http://192.168.91.112:10002/api/v1/zgInvoice/exportInvoiceList',
    method: 'post',
    responseType: 'blob',
    data
  })
}
