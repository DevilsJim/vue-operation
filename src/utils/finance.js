import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_FINANCE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests,  为false时，允许后台设置跨域
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (!getToken()) {
      router.push('/login')
    }
    config.headers = {
      'Content-Type': 'application/json',
      'token': getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 返回整个Response消息体，包含：headers、data、config等信息
    const res = response

    // 返回Response消息体中的data字段数据
    const data = response.data

    // if the custom code is not 10000, it is judged as an error.
    if (data.code !== 10000) {
      Message({
        message: data.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 不常见错误码: 10001 系统错误; 20001 参数异常验证;
      // 常见错误码: 10002 保存用户失败; 20002 联系人已存在，请勿重复添加;
      if (data.code === 50008 || data.code === 50012 || data.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(data.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
