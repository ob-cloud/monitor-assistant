import { postAction, deleteAction } from '@/utils/ajax'
import qs from 'qs'

const headers = {
  Authorization: 'Basic d2ViQXBwOndlYkFwcA==',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'cache-control': 'no-cache'
}
// 授权登录模块
const login = (username, password) => postAction('/oauth/token', qs.stringify({ password, username, grant_type: 'password' }), { headers })
const logout = (token) => deleteAction(`/oauth/token/${token}`)

export {
  login,
  logout
}
