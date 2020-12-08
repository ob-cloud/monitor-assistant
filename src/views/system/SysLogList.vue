<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @submit.prevent="searchQuery">
          <a-row :gutter="24">

            <a-col :sm="12" :md="6" :lg="5">
              <a-form-item label="执行人">
                <a-input placeholder="请输入执行人" v-model="queryParam.operator"></a-input>
              </a-form-item>
            </a-col>

            <a-col :sm="12" :md="6" :lg="5">
              <a-form-item label="操作行为">
                <a-input placeholder="请输入操作行为" v-model="queryParam.content"></a-input>
              </a-form-item>
            </a-col>

            <template v-if="toggleSearchStatus">
              <a-col :sm="12" :md="6" :lg="5">
                <a-form-item label="日志类型">
                  <a-select placeholder="请日志类型" v-model="queryParam.type" allowClear>
                    <!-- <a-select-option :value="-1">在线</a-select-option> -->
                    <a-select-option value="设备管理">设备管理</a-select-option>
                    <!-- <a-select-option value="场景管理">场景管理</a-select-option> -->
                    <a-select-option value="用户管理">用户管理</a-select-option>
                    <a-select-option value="酒店管理">酒店管理</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>

            <a-col :sm="12" :md="6" :lg="5">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                <a @click="handleToggleSearch" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator" style="border-top: 5px">
        <a-button @click="handleExport" type="primary">导出日志</a-button>
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
        </a-table>
      </div>
      <!-- table区域-end -->
      <sys-log-modal ref="logMdal"></sys-log-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getSysLogList } from '@/api/system'
import { parseTime } from '@/utils/util'
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import SysLogModal from './modules/SysLogModal'
export default {
  name: '',
  mixins: [ ProListMixin ],
  components: { SysLogModal },
  data () {
    return {
      description: '这是用户管理页面',
      queryParam: {
        pageNo: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '编号',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: '类型',
          align: 'center',
          dataIndex: 'type'
        },
        {
          title: '操作行为',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作时间',
          align: 'center',
          dataIndex: 'createTime',
          customRender (sysTime) {
            return parseTime(sysTime)
          }
        },
        {
          title: '执行人',
          dataIndex: 'operator',
          align: 'center'
        }
      ]
    }
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
      getSysLogList({ ...params, hotelId: this.$store.getters.hotelId }).then((res) => {
        if (this.$isAjaxSuccess(res.code)) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total || 0
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    handleExport () {
      this.$refs.logMdal.edit()
    }
  }
}
</script>
