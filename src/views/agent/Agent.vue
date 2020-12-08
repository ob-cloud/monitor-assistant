<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">

          <a-col :sm="12" :md="6" :lg="5">
            <a-form-item label="名称">
              <a-input placeholder="请输入代理商名称" v-model="queryParam.companyName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :sm="12" :md="6" :lg="5">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">查看</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">密码</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <agent-modal ref="modalForm" @ok="modalFormOk"></agent-modal>
  </a-card>
</template>

<script>
  import AgentModal from './modules/AgentModal'
  import { getAgentList, delAgent } from '@/api/agent'
  import { ProListMixin } from '@/utils/mixins/ProListMixin'
  import * as dayjs from 'dayjs'

  export default {
    name: '',
    mixins: [ ProListMixin ],
    components: { AgentModal },
    data () {
      return {
        description: '这是用户管理页面',
        queryParam: {
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '机构名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '机构地址',
            align: 'center',
            dataIndex: 'address'
          },
          {
            title: '联系人',
            align: 'center',
            dataIndex: 'contact'
          },
          {
            title: '联系电话',
            align: 'center',
            dataIndex: 'phone'
          },
          {
            title: '电子邮件',
            align: 'center',
            dataIndex: 'email'
          },
          {
            title: '添加时间',
            align: 'center',
            dataIndex: 'createAt',
            customRender (t) {
              return t ? dayjs(t).format('YYYY-MM-DD HH:mm:ss') : ''
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 170
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      loadData (arg) {
        this.getDataList(arg)
      },
      getDataList (arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        const params = { ...this.queryParam }
        params.pageNo = this.ipagination.current
        params.pageSize = this.ipagination.pageSize
        this.loading = true
        getAgentList(params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total || 0
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => { this.loading = false })
      },
      handleDelete (id) {
        delAgent(id).then(res => {
          if (this.$isAjaxSuccess(res.code)) {
            this.loadData(1)
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  }
</script>
