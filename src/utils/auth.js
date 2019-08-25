import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'Admin-Token-Operation'
const UserInfoKey = 'Admin-User-Info'
const UserRoleKey = 'Admin-User-key'
const DeptKey = 'Admin-Dept'
const RoleKey = 'Admin-Role'
const IsAdmin = 'Is-Admin'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(UserInfoKey)
  Cookies.remove(DeptKey)
  Cookies.remove(IsAdmin)
  return Cookies.remove(RoleKey)
}

export function setUserInfo(data) {
  return Cookies.set(UserInfoKey, data)
}

export function setRole(data) {
  return Cookies.set(RoleKey, data)
}

export function getLoginUser() {
  return Cookies.get(UserInfoKey)
}

export function setUserRoleId(data) {
  return Cookies.set(UserRoleKey, data)
}

export function setIsAdmin(data) {
  return Cookies.set(IsAdmin, data)
}

export function getLoginRoleId() {
  return Cookies.get(UserRoleKey)
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function getIsAdmin() {
  return Cookies.get(IsAdmin)
}
