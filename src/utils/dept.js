import Cookies from 'js-cookie'

const CookieKey = 'Dept'

export function setDept(data) {
  return Cookies.set(CookieKey, data)
}

export function getDept() {
  return Cookies.get(CookieKey)
}
