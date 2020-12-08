<template>
  <page-header-wrapper>
    <a-card :bordered="false" class="card-area">
      <!-- 操作按钮区域 -->
      <div class="table-operator" style="margin-top: 5px">
        <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" :beforeUpload="beforeUpload" @change="handleImportExcel">
          <a-button type="primary" icon="import">导入配置</a-button>
        </a-upload>
      </div>

      <!-- table区域-begin -->
      <!-- <div>
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange"
        >
        </a-table>
      </div> -->
      <!-- table区域-end -->
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { getRequestUrl } from '@/utils/ajax'
export default {
  name: 'Analysis',
  mixins: [ProListMixin],
  components: {
  },
  data () {
    return {
      url: {
        importExcelUrl: 'sys/role/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl () {
      return getRequestUrl(this.url.importExcelUrl)
    }
  },
  methods: {
    loadData () {

    },
    beforeUpload (file) {
      var fileType = file.type
      if (!fileType.includes('xls') || !fileType.includes('xlsx')) {
        this.$message.warning('请上传 excel 文件')
        return false
      }
    },
    handleImportExcel (info) {
      // console.log()
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success) {
          this.$message.success(`${info.file.name} 文件上传成功`)
          this.loadData()
        } else {
          this.$message.error(`${info.file.name} ${info.file.response.message}.`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败: ${info.file.msg} `)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
