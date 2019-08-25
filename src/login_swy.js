import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import Axios from 'axios'
import NProgress from 'nprogress' // 是页面跳转是出现在浏览器顶部的进度条
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  const hasToken = getToken()
  if (hasToken) { // 判断是否有token，从vuex中取出
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      next()
      NProgress.done()
      // 可删 ↑
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
      NProgress.done()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})
