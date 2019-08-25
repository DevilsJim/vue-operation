import request from '@/utils/requestJson'

/**
 * 权限管理
 * */
// 获取部门树状结构图
export function getDeptTreeList(params) {
  return request({
    url: '/sysDept/getDeptTreeList',
    method: 'post',
    data: params
  })
}

// 添加部门
export function addDept(params) {
  return request({
    url: '/sysDept/save',
    method: 'post',
    data: params
  })
}

// 修改部门信息
export function updateDept(params) {
  return request({
    url: '/sysDept/update',
    method: 'post',
    data: params
  })
}

// 获取成员列表
export function getSysUserPageList(params) {
  return request({
    url: '/sysUser/getSysUserPageList',
    method: 'post',
    data: params
  })
}

// 删除部门
export function deleteDept(params) {
  return request({
    url: '/sysDept/delete',
    method: 'post',
    data: params
  })
}

// 权限管理-用户管理
// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/sysUser/getSysUserPageList',
    method: 'post',
    data: params
  })
}

// 获取用户详情
export function getUserDetail(userId) {
  return request({
    url: '/sysUser/selectByID/' + userId,
    method: 'get'
  })
}

// 重置用户密码
export function resetUserPassword(params) {
  return request({
    url: '/sysUser/resetPwdByID/' + params,
    method: 'get',
    data: params
  })
}

// 修改用户信息
export function updateUserInfo(params) {
  return request({
    url: '/sysUser/update',
    method: 'post',
    data: params
  })
}

// 修改用户任职状态
export function updateOffWorkFlag(params) {
  return request({
    url: '/sysUser/updateOffWorkFlag',
    method: 'post',
    data: params
  })
}

// 添加用户信息
export function addUser(params) {
  return request({
    url: '/sysUser/save',
    method: 'post',
    data: params
  })
}

// 获取部门列表
export function getDeptList(params) {
  return request({
    url: '/sysDept/getDeptList',
    method: 'get',
    data: params
  })
}

// 导出用户列表
export function exportSysUserList(params) {
  return request({
    url: '/sysUser/exportSysUserList',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

/*
* 权限管理-菜单管理
* 根据角色获取菜单树
*/
export function getSysMenuTree() {
  return request({
    url: '/sysMenu/getSysMenuTree',
    method: 'get'
  })
}

// 新增菜单
export function addSysMenu(params) {
  return request({
    url: '/sysMenu/saveSysMenu',
    method: 'post',
    data: params
  })
}

// 编辑菜单
export function updateSysMenu(params) {
  return request({
    url: '/sysMenu/updateSysMenuByPkSid',
    method: 'post',
    data: params
  })
}

// 删除菜单
export function delSysMenu(params) {
  return request({
    url: '/sysMenu/deleteSysMenuByPkSid/' + params,
    method: 'get'
  })
}

/*
* 权限管理-角色管理
* 角色列表查询
*/
export function getRoleList(params) {
  return request({
    url: '/sysRole/getSysRolePageList/',
    method: 'post',
    data: params
  })
}

// 角色所配菜单详情
export function getRoleMenuList(params) {
  return request({
    url: '/sysRoleMenu/getSysRoleMenuList',
    method: 'post',
    data: params
  })
}

// 新增角色
export function addSysRole(params) {
  return request({
    url: '/sysRole/saveSysRole',
    method: 'post',
    data: params
  })
}

// 编辑角色
export function updateSysRole(params) {
  return request({
    url: '/sysRole/updateSysRoleByPkSid',
    method: 'post',
    data: params
  })
}

// 删除角色
export function delSysRole(params) {
  return request({
    url: '/sysRole/deleteSysRoleByPkSid/' + params,
    method: 'get'
  })
}

// 获取当前用户及下属用户列表 [资源配置-组内释放商机 搜索条件请选择顾问 使用]
export function getCurrentUserDeptUsers() {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/getCurrentUserDeptUsers',
    method: 'get'
  })
}

// 用户分页列表
export function getUserPageList(data) {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/getSysUserPageList',
    method: 'post',
    data
  })
}
