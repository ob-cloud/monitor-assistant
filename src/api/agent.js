import { getAction, postAction, deleteAction, putAction } from '@/utils/ajax'
// 企业
const getAgentList = (params) => getAction('/sys/agent/list', params)
const editAgent = (params) => putAction('/sys/agent/edit', params)
const addAgent = (params) => postAction('/sys/agent/add', params)
const delAgent = (ids) => deleteAction('/sys/agent/delete', { ids })

export {
  getAgentList,
  addAgent,
  editAgent,
  delAgent
}
