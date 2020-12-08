/* eslint-disable */
import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
const permission = {
  "code": "OK",
  "message": "success!",
  "result": {
    "auth": [{
      "action": "home:group",
      "describe": "查看集团数据概览",
      "type": "1",
      "status": "1"
    }, {
      "action": "home:hotel",
      "describe": "查看酒店数据概览",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:add",
      "describe": "添加酒店按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:edit",
      "describe": "编辑酒店按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:del",
      "describe": "删除酒店按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:detail",
      "describe": "查看酒店详情按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:user:bind",
      "describe": "绑定酒店账户按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:setting",
      "describe": "设置酒店信息按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "hotel:switch",
      "describe": "切换酒店按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "company:add",
      "describe": "添加企业按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "company:edit",
      "describe": "编辑企业按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "company:del",
      "describe": "删除企业按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "building:add",
      "describe": "添加楼栋按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "building:edit",
      "describe": "编辑楼栋按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "building:del",
      "describe": "删除楼栋按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "building:floor:add",
      "describe": "添加楼栋楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "floor:add",
      "describe": "添加楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "floor:edit",
      "describe": "编辑楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "floor:del",
      "describe": "删除楼层按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "floor:room:add",
      "describe": "添加楼层房间按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:add",
      "describe": "添加房间按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:edit",
      "describe": "编辑房间按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:del",
      "describe": "删除房间按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:control",
      "describe": "插卡取电操作按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:detail",
      "describe": "查看房间详情按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:gateway:bind",
      "describe": "绑定房间网关按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:gateway:unbind",
      "describe": "解绑房间网关按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:ir:bind",
      "describe": "绑定房间红外按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "room:ir:unbind",
      "describe": "解绑房间红外按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:add",
      "describe": "添加设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:edit",
      "describe": "编辑设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:del",
      "describe": "删除设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "device:control",
      "describe": "控制设备按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "infrared:edit",
      "describe": "编辑红外按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "infrared:del",
      "describe": "删除红外按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "gateway:edit",
      "describe": "编辑网关按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "gateway:del",
      "describe": "删除网关按钮",
      "type": "1",
      "status": "1"
    }, {
      "action": "user:add",
      "describe": "添加用户按钮",
      "type": "1",
      "status": "1"
    }],
    "menu": [{
      "redirect": null,
      "path": "/dashboard/analysis",
      "component": "dashboard/Analysis",
      "route": "1",
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "home",
        "title": "首页"
      },
      "name": "dashboard-analysis",
      "id": "9502685863ab87f0ad1134142788a385"
    }, {
      "redirect": "agent/list",
      "path": "/agent",
      "component": "RouteView",
      "route": "1",
      "children": [{
        "path": "/agent/list",
        "component": "agent/Agent",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "机构信息"
        },
        "name": "agent-list",
        "id": "1320973139581538306"
      }],
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "crown",
        "title": "代理机构"
      },
      "name": "hotel",
      "id": "1320972951756410881"
    },
    // {
    //   "redirect": null,
    //   "path": "/device",
    //   "component": "RouteView",
    //   "route": "1",
    //   "children": [{
    //     "path": "/device/normal",
    //     "component": "device/Normal",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "设备"
    //     },
    //     "name": "device-normal",
    //     "id": "1320974076047986689"
    //   }, {
    //     "path": "/device/infrared",
    //     "component": "device/Infrared",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "红外"
    //     },
    //     "name": "device-infrared",
    //     "id": "1320974183401197569"
    //   }, {
    //     "path": "/device/gateway",
    //     "component": "device/Gateway",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "网关"
    //     },
    //     "name": "device-gateway",
    //     "id": "1320974302615900162"
    //   }],
    //   "meta": {
    //     "keepAlive": false,
    //     "internalOrExternal": false,
    //     "icon": "box-plot",
    //     "title": "设备管理"
    //   },
    //   "name": "device",
    //   "id": "1320973962071969794"
    // },
    // {
    //   "redirect": "/reports/enterprise",
    //   "path": "/reports",
    //   "component": "RouteView",
    //   "route": "1",
    //   "children": [{
    //     "path": "/reports/enterprise",
    //     "component": "reports/Enterprise",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "集团经营报表"
    //     },
    //     "name": "reports-enterprise",
    //     "id": "1320971972944269313"
    //   }, {
    //     "path": "/reports/hotel",
    //     "component": "reports/Hotel",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "酒店经营报表"
    //     },
    //     "name": "reports-hotel",
    //     "id": "1320972084676333569"
    //   }, {
    //     "path": "/reports/mine",
    //     "component": "reports/Mine",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "我的酒店报表"
    //     },
    //     "name": "reports-mine",
    //     "id": "1320972197914152961"
    //   }, {
    //     "path": "/reports/equips",
    //     "component": "reports/Equips",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "网关红外报表"
    //     },
    //     "name": "reports-equips",
    //     "id": "1320972327836913665"
    //   }, {
    //     "path": "/reports/exception",
    //     "component": "reports/Exception",
    //     "route": "1",
    //     "meta": {
    //       "keepAlive": false,
    //       "internalOrExternal": false,
    //       "title": "设备异常报表"
    //     },
    //     "name": "reports-exception",
    //     "id": "1320972449190711298"
    //   }],
    //   "meta": {
    //     "keepAlive": false,
    //     "internalOrExternal": false,
    //     "icon": "profile",
    //     "title": "报表管理"
    //   },
    //   "name": "reports",
    //   "id": "1320971838978199553"
    // },
    {
      "redirect": null,
      "path": "/isystem",
      "component": "RouteView",
      "route": "1",
      "children": [{
        "path": "/isystem/user",
        "component": "system/UserList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "用户管理"
        },
        "name": "isystem-user",
        "id": "3f915b2769fc80648e92d04e84ca059d"
      }, {
        "path": "/isystem/role",
        "component": "system/RoleList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "角色管理"
        },
        "name": "isystem-role",
        "id": "190c2b43bec6a5f7a4194a85db67d96a"
      }, {
        "path": "/isystem/annountcement",
        "component": "system/SysAnnouncementList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "系统消息"
        },
        "name": "isystem-annountcement",
        "id": "1320970861004918786"
      }, {
        "path": "/isystem/log",
        "component": "system/SysLogList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "系统日志"
        },
        "name": "isystem-log",
        "id": "1320971153096249345"
      }, {
        "path": "/isystem/permission",
        "component": "system/MenuList",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "title": "菜单管理"
        },
        "name": "isystem-permission",
        "id": "54dd5457a3190740005c1bfec55b1c34"
      }],
      "meta": {
        "keepAlive": false,
        "internalOrExternal": false,
        "icon": "setting",
        "title": "系统管理"
      },
      "name": "isystem",
      "id": "d7d6e2e4e2934f2c9385a623fd98c6f3"
    }]
  }
}

const getPermissionList = () => {
  return builder(permission.result)
}


const totalCount = 60

const getAgentList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: Mock.mock('@id()'),
      name: Mock.mock('@cword(3, 5)') + '有限公司',
      contact: Mock.mock('@cname()'),
      phone: Mock.mock('@integer(10000000000, 19000000000)'),
      email: Mock.mock('@email()'),
      address: Mock.mock('@county(true)'),
      createAt: Mock.mock('@datetime'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  console.log('mock getAgentList: ', builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  }))

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    total: totalCount,
    totalPage: totalPage,
    records: result
  })
}

Mock.mock(/\/sys\/permission\/getUserPermission/, 'get', getPermissionList)
Mock.mock(/\/sys\/agent\/list/, 'get', getAgentList)
