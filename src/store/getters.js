import storage from 'store'
import { USER_INFO } from '@/store/mutation-types'

const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  permissionList: state => state.user.permissionList,
  userInfo: state => { state.user.info = storage.get(USER_INFO); return state.user.info },
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab
}

export default getters
