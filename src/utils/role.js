import Cookies from 'js-cookie'

const CookieKey = 'Role'

export function setRole(data) {
  return Cookies.set(CookieKey, data)
}

export function getRole() {
  return Cookies.get(CookieKey)
}
