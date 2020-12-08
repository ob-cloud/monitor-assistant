import {
  USER_AUTH,
  SYS_BUTTON_AUTH
} from '@/store/mutation-types'

// export function authFilter(code) {
//   return globalAuth(code)
//   // if(nodeAuth(code,formData)){
//   //   return true
//   // }else{
//   //   return globalAuth(code)
//   // }
// }

export function nodeAuth (code, formData) {
  let permissionList = []
  try {
    if (formData) {
      const bpmList = formData.permissionList
      permissionList = bpmList.filter(item => item.type === '1')
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
  if (permissionList.length === 0) {
    return false
  }

  const permissions = []
  for (const item of permissionList) {
    if (item.type === '1') {
      permissions.push(item.action)
    }
  }
  if (permissions.includes(code)) {
    return true
  } else {
    for (const item2 of permissionList) {
      if (code === item2.action) {
        return true
      }
    }
  }
  return false
}

export function globalAuth (code) {
  const permissionList = []
  const authList = JSON.parse(sessionStorage.getItem(USER_AUTH) || '[]')
  for (const auth of authList) {
    if (auth.type === '1') {
      permissionList.push(auth)
    }
  }
  // 设置全局配置是否有命中
  if (!permissionList || permissionList.length <= 0) {
    return false
  }
  const permissions = []
  for (const item of permissionList) {
    if (item.type === '1') {
      permissions.push(item.action)
    }
  }
  if (permissions.includes(code)) {
    return true
  } else {
    for (const item2 of permissionList) {
      if (code === item2.action) {
        return true
      }
    }
    return false
  }
}

export function disabledAuthFilter (code, formData) {
  if (nodeDisabledAuth(code, formData)) {
    return true
  } else {
    return globalDisabledAuth(code)
  }
}

function nodeDisabledAuth (code, formData) {
  console.log('页面权限禁用--NODE--开始')
  let permissionList = []
  try {
    console.log('页面权限禁用--NODE--开始', formData)
    if (formData) {
      const bpmList = formData.permissionList
      permissionList = bpmList.filter(item => item.type === '2')
    } else {
      return false
    }
  } catch (e) {
    // console.log('页面权限异常----', e)
  }
  if (!permissionList.length) {
    return false
  }

  console.log('流程节点页面权限禁用--NODE--开始')
  const permissions = []
  for (const item of permissionList) {
    if (item.type === '2') {
      permissions.push(item.action)
    }
  }
  // console.log('页面权限----'+code)
  if (!permissions.includes(code)) {
    return false
  } else {
    for (const item2 of permissionList) {
      if (code === item2.action) {
        console.log('流程节点页面权限禁用--NODE--生效')
        return true
      }
    }
  }
  return false
}

function globalDisabledAuth (code) {
  console.log('全局页面禁用权限--Global--开始')

  const permissionList = []
  const allPermissionList = []

  // let authList = Vue.ls.get(USER_AUTH)
  const authList = JSON.parse(sessionStorage.getItem(USER_AUTH) || '[]')
  for (const auth of authList) {
    if (auth.type === '2') {
      permissionList.push(auth)
    }
  }
  // console.log('页面禁用权限--Global--',sessionStorage.getItem(SYS_BUTTON_AUTH))
  const allAuthList = JSON.parse(sessionStorage.getItem(SYS_BUTTON_AUTH) || '[]')
  for (const gauth of allAuthList) {
    if (gauth.type === '2') {
      allPermissionList.push(gauth)
    }
  }
  // 设置全局配置是否有命中
  let gFlag = false // 禁用命中
  let invalidFlag = false // 无效命中
  if (!allPermissionList && allPermissionList.length > 0) {
    for (const itemG of allPermissionList) {
      if (code === itemG.action) {
        if (itemG.status === '0') {
          invalidFlag = true
          break
        } else {
          gFlag = true
          break
        }
      }
    }
  }
  if (invalidFlag) {
    return false
  }
  if (!permissionList || permissionList.length <= 0) {
    return gFlag
  }
  const permissions = []
  for (const item of permissionList) {
    if (item.type === '2') {
      permissions.push(item.action)
    }
  }
  // console.log('页面禁用权限----'+code)
  if (!permissions.includes(code)) {
    return gFlag
  } else {
    for (const item2 of permissionList) {
      if (code === item2.action) {
        console.log('全局页面权限解除禁用--Global--生效')
        gFlag = false
      }
    }
    return gFlag
  }
}

export function colAuthFilter (columns, pre) {
  const authList = getNoAuthCols(pre)
  const cols = columns.filter(item => {
    return hasColoum(item, authList)
  })
  return cols
}

/**
 * 【子表行编辑】实现两个功能：
 * 1、隐藏JEditableTable无权限的字段
 * 2、禁用JEditableTable无权限的字段
 * @param columns
 * @param pre
 * @returns {*}
 */
export function colAuthFilterJEditableTable (columns, pre) {
  const authList = getAllShowAndDisabledAuthCols(pre)
  const cols = columns.filter(item => {
    let oneAuth = authList.find(auth => {
      return auth.action === pre + item.key
    })
    if (!oneAuth) {
      return true
    }

    // 代码严谨处理，防止一个授权标识，配置多次
    if (oneAuth instanceof Array) {
      oneAuth = oneAuth[0]
    }

    // 禁用逻辑
    if (oneAuth.type === '2' && !oneAuth.isAuth) {
      item['disabled'] = true
      return true
    }
    // 隐藏逻辑逻辑
    if (oneAuth.type === '1' && !oneAuth.isAuth) return false
    return true
  })
  return cols
}

function hasColoum (item, authList) {
  return !authList.includes(item.dataIndex)
}

// 权限无效时不做控制，有效时控制，只能控制 显示不显示
// 根据授权码前缀获取未授权的列信息
function getNoAuthCols (pre) {
  const permissionList = []
  const allPermissionList = []

  // let authList = Vue.ls.get(USER_AUTH)
  const authList = JSON.parse(sessionStorage.getItem(USER_AUTH) || '[]')
  for (const auth of authList) {
    // 显示策略，有效状态
    if (auth.type === '1' && startWith(auth.action, pre)) {
      permissionList.push(substrPre(auth.action, pre))
    }
  }
  // console.log('页面禁用权限--Global--',sessionStorage.getItem(SYS_BUTTON_AUTH))
  const allAuthList = JSON.parse(sessionStorage.getItem(SYS_BUTTON_AUTH) || '[]')
  for (const gauth of allAuthList) {
    // 显示策略，有效状态
    if (gauth.type === '1' && gauth.status === '1' && startWith(gauth.action, pre)) {
      allPermissionList.push(substrPre(gauth.action, pre))
    }
  }
  const cols = allPermissionList.filter(item => { return !permissionList.includes(item) })
  return cols
}

/**
 * 额外增加方法【用于行编辑组件】
 * date: 2020-04-05
 * author: scott
 * @param pre
 * @returns {*[]}
 */
function getAllShowAndDisabledAuthCols () {
  // 用户拥有的权限
  const userAuthList = JSON.parse(sessionStorage.getItem(USER_AUTH) || '[]')
  // 全部权限配置
  const allAuthList = JSON.parse(sessionStorage.getItem(SYS_BUTTON_AUTH) || '[]')

  const newAllAuthList = allAuthList.map(function (item) {
    const hasAuthArray = userAuthList.filter(u => u.action === item.action)
    if (hasAuthArray && hasAuthArray.length > 0) {
      item['isAuth'] = true
    }
    return item
  })
  return newAllAuthList
}

function startWith (str, pre) {
  if (!pre || !str || !str.length || pre.length > str.length) return false
  return str.substr(0, pre.length) === pre
}

function substrPre (str, pre) {
  return str.substr(pre.length)
}
