<template>
  <page-header-wrapper>
    <a-card :bordered="false" class="card-area">
      <!-- 操作按钮区域 -->
      <div class="table-operator" style="margin-top: 5px">
        <!-- <a-form layout="inline">
          <a-form-item label="数据类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group v-model="type">
              <a-radio value="panel">编组</a-radio>
              <a-radio value="group">分组</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上传">
            <a-upload name="file" :showUploadList="false" :multiple="false" :data="uploadData" :headers="tokenHeader" :action="importExcelUrl" :beforeUpload="beforeUpload" @change="handleImportExcel">
              <a-button type="primary" icon="import">导入配置</a-button>
            </a-upload>
          </a-form-item>
        </a-form> -->
        <a-upload name="file" :showUploadList="false" :multiple="false" :data="uploadData" :headers="tokenHeader" :action="importExcelUrl" :beforeUpload="beforeUpload" @change="handleImportExcel">
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
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { ProListMixin } from '@/utils/mixins/ProListMixin'
import { getRequestUrl } from '@/utils/ajax'
import storage from 'store'
export default {
  name: 'Analysis',
  mixins: [ProListMixin],
  components: {
  },
  data () {
    return {
      url: {
        importExcelUrl: 'consumer/import/importPanelOrGroup'
      },
      type: 'panel',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
  },
  computed: {
    importExcelUrl () {
      return getRequestUrl(this.url.importExcelUrl)
    },
    uploadData () {
      return {
        token: storage.get(ACCESS_TOKEN)
        // type: this.type
      }
    }
  },
  methods: {
    loadData () {

    },
    beforeUpload (file) {
      var fileType = file.type

      if (fileType.indexOf('sheet') < 0) {
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
