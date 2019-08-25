import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import { getIsAdmin } from '../utils/auth'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  /* 客服管理 */
  {
    path: '/customerServiceManagement',
    component: Layout,
    redirect: '/customerServiceManagement/customerList',
    name: 'customerServiceManagement',
    meta: { title: '客服管理', icon: 'menu' },
    children: [
      {
        path: 'customerList',
        name: 'CustomerList',
        component: () => import('@/views/customerServiceManagement/customerList/index'),
        meta: { title: '客户清单', icon: 'my-customer' }
      },
      {
        path: 'customerDetail/:currentCompanyId',
        name: 'CustomerDetail',
        hidden: true,
        component: () => import('@/views/customerServiceManagement/customerList/customerDetail'), // Parent router-view
        meta: { title: '客户详情' }
      },
      /* {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/customerServiceManagement/orderList/index'),
        meta: { title: '订单列表', icon: 'my-customer' }
      }, */
      {
        path: 'orderDetail/:currentCompanyId',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/customerServiceManagement/orderList/orderDetail'),
        meta: { title: '订单详情' }
      }
    ]
  },

  /* 资源配置 */
  {
    path: '/resourceManagement',
    component: Layout,
    redirect: '/resourceManagement',
    name: 'resourceManagement',
    // hidden: true,
    meta: { title: '资源配置', icon: 'menu' },
    children: [
      {
        path: 'importClues',
        name: 'ImportClues',
        component: () => import('@/views/resourceManagement/cluesManagement/importClues'),
        meta: { title: '导入线索' }
      },
      {
        path: 'cluesList',
        name: 'CluesList',
        component: () => import('@/views/resourceManagement/cluesManagement/index'),
        meta: { title: '线索清单' }
      },
      {
        path: 'cluesDetail/:currentThreadId',
        name: 'CluesDetail',
        hidden: true,
        component: () => import('@/views/resourceManagement/cluesManagement/cluesDetail'),
        meta: { title: '线索详情' }
      },
      {
        path: 'customerList',
        name: 'CustomerList',
        component: () => import('@/views/resourceManagement/customerModule/index'),
        meta: { title: '客户清单' }
      },
      {
        path: 'resourceCustomerDetail/:currentCompanyId',
        name: 'ResourceCustomerDetail',
        hidden: true,
        component: () => import('@/views/resourceManagement/customerModule/customerDetail'),
        meta: { title: '客户清单-客户详情' }
      },
      {
        path: 'businessList',
        name: 'BusinessList',
        component: () => import('@/views/resourceManagement/businessModule/index'),
        meta: { title: '商机清单' }
      },
      {
        path: 'resourceBusinessDetail/:currentBusinessId',
        name: 'ResourceBusinessDetail',
        hidden: true,
        component: () => import('@/views/resourceManagement/businessModule/businessDetail'),
        meta: { title: '商机清单-商机详情' }
      },
      {
        path: 'releaseBusinessInGroup',
        name: 'ReleaseBusinessInGroup',
        component: () => import('@/views/resourceManagement/releaseBusiness/index'),
        meta: { title: '组内释放商机' }
      }
    ]
  },

  /* 规则配置 */
  {
    path: '/ruleConfiguration',
    component: Layout,
    redirect: '/ruleConfiguration',
    name: 'ruleConfiguration',
    // hidden: true,
    meta: { title: '规则配置', icon: 'menu' },
    children: [
      {
        path: 'customerLabel',
        name: 'CustomerLabel',
        component: () => import('@/views/ruleConfiguration/customerLabel/index'),
        meta: { title: '客户标签设置' }
      },
      {
        path: 'cluesCapacity',
        name: 'CluesCapacity',
        component: () => import('@/views/ruleConfiguration/cluesCapacity/index'),
        meta: { title: '线索容量设置' }
      },
      {
        path: 'cluesRecycle',
        name: 'CluesRecycle',
        component: () => import('@/views/ruleConfiguration/cluesRecycle/index'),
        meta: { title: '线索回收设置' }
      },
      {
        path: 'privatePollNumSet',
        name: 'PrivatePollNumSet',
        component: () => import('@/views/ruleConfiguration/privatePool/index'),
        meta: { title: '顾问私池数量设置' }
      },
      {
        path: 'customerRecovery',
        name: 'CustomerRecovery',
        component: () => import('@/views/ruleConfiguration/customerRecovery/index'), // Parent router-view
        meta: { title: '客户回收设置' }
      },
      {
        path: 'releaseReason',
        name: 'ReleaseReason',
        component: () => import('@/views/ruleConfiguration/releaseReason/index'), // Parent router-view
        meta: { title: '释放原因设置' }
      },
      {
        path: 'businessCapacity',
        name: 'BusinessCapacity',
        component: () => import('@/views/ruleConfiguration/businessCapacity/index'),
        meta: { title: '商机容量设置' }
      },
      {
        path: 'businessRecycle',
        name: 'BusinessRecycle',
        component: () => import('@/views/ruleConfiguration/businessRecycle/index'),
        meta: { title: '商机回收设置' }
      }
    ]
  },

  // 财务管理
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance',
    name: 'Finance',
    meta: { title: '财务管理', icon: 'menu' },
    children: [
      // 订单列表
      {
        path: 'orderList',
        name: 'FinanceOrder',
        component: () => import('views/finance/orderList/index'),
        meta: { title: '订单列表', icon: 'my-customer' }
      },
      // 订单列表 - 退款
      {
        path: 'refund',
        name: 'Refund',
        hidden: true,
        component: () => import('views/finance/orderList/detail/refund'),
        meta: { title: '退款订单', icon: 'my-customer' }
      },
      // 发票列表
      {
        path: 'invoice',
        name: 'Invoice',
        component: () => import('views/finance/invoice/index'),
        meta: { title: '发票列表', icon: 'my-customer' }
      },
      // 发票详情
      {
        path: 'invoiceDetail',
        name: 'InvoiceDetail',
        hidden: true,
        component: () => import('views/finance/invoice/detail'),
        meta: { title: '发票详情', icon: 'my-customer' }
      },
      {
        path: 'accountAdvance',
        name: 'AccountAdvance',
        component: () => import('@/views/finance/accountAdvance/index'), // Parent router-view
        meta: { title: '进账管理', icon: 'menu' },
        children: [
          {
            path: 'accountMatch',
            name: 'AccountMatch',
            component: () => import('@/views/finance/accountAdvance/accountMatch/index'),
            meta: { title: '入账匹配', icon: 'my-customer' }
          },
          {
            path: 'accountDetail/:payId',
            name: 'AccountDetail',
            hidden: true,
            component: () => import('@/views/finance/accountAdvance/accountMatch/accountDetail'),
            meta: { title: '线下入账详情' }
          },
          {
            path: 'accountList',
            name: 'AccountList',
            component: () => import('@/views/finance/accountAdvance/accountList/index'),
            meta: { title: '进账列表', icon: 'my-customer' }
          }
        ]
      },
      {
        path: 'accountEntry',
        name: 'AccountEntry',
        component: () => import('@/views/finance/accountEntry/index'), // Parent router-view
        meta: { title: '入账管理', icon: 'menu' },
        children: [
          {
            path: 'accountSettings',
            name: 'AccountSettings',
            component: () => import('@/views/finance/accountEntry/accountSettings/accountSettings'),
            meta: { title: '打款账户设置', icon: 'my-customer' }
          },
          {
            path: 'zhList',
            name: 'ZhList',
            component: () => import('@/views/finance/accountEntry/zhList/zhList'),
            meta: { title: '账户列表', icon: 'my-customer' }
          }
        ]
      }
    ]
  },

  /* 权限管理 */
  {
    path: '/rightsManagement',
    component: Layout,
    redirect: '/rightsManagement',
    name: 'RightsManagement',
    // hidden: true,
    meta: { title: '权限管理', icon: 'menu' },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/rightsManagement/userManagement/index'),
        meta: { title: '用户管理', icon: 'my-customer' }
      },
      {
        path: 'organizationStructure',
        name: 'OrganizationStructure',
        component: () => import('@/views/rightsManagement/organizationStructure/index'),
        meta: { title: '组织结构', icon: 'my-customer' }
      },
      {
        path: 'departmentDetail',
        name: 'DepartmentDetail',
        hidden: true,
        component: () => import('@/views/rightsManagement/organizationStructure/departmentDetail'),
        meta: { title: '部门详情', icon: 'my-customer' }
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/rightsManagement/roleManagement/index'),
        meta: { title: '角色管理', icon: 'my-customer' }
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/rightsManagement/menuManagement/index'),
        meta: { title: '菜单管理', icon: 'my-customer' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 临时判断  admin 登陆时，路由显示 '规则配置' 和 '组织结构'
// const userRole = getIsAdmin()
// if (userRole === 'admin') {
//   constantRoutes[4].hidden = false
//   constantRoutes[5].hidden = false
//   constantRoutes[6].hidden = false
// } else {
//   constantRoutes[4].hidden = true
//   constantRoutes[5].hidden = true
// }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
