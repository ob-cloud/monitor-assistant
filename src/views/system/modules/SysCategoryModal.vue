<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="父级节点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <tree-select ref="treeSelect" placeholder="请选择父级节点" v-decorator="['pid', validatorRules.pid]" dict="sys_category,name,id" pidField="pid" pidValue="0">
          </tree-select>
        </a-form-item>

        <a-form-item label="类型名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入类型名称"></a-input>
        </a-form-item>

        <a-form-item label="类型编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'code', validatorRules.code]" placeholder="请输入类型编码"></a-input>
        </a-form-item>

        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span style="font-size: 12px;color:red" slot="label">编码规则(注)</span>
          <span style="font-size: 12px;color:red">
            编码值前缀需和父节点保持一致,比如父级节点编码是A01则当前编码必须以A01开头
          </span>
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { getAction, httpAction } from '@/utils/ajax'
  import pick from 'lodash.pick'
  import TreeSelect from '@/components/Pro/TreeSelect'

  export default {
    name: 'SysCategoryModal',
    components: {
      TreeSelect
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title: '操作',
        width: 800,
        visible: false,
        model: {},
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 5
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          }
        },
        confirmLoading: false,
        validatorRules: {
          code: {
            rules: [{
              required: true,
              message: '请输入类型编码!'
            }, {
              validator: this.validateMyCode
            }]
          },
          pid: {},
          name: {}
        },
        url: {
          add: '/sys/category/add',
          edit: '/sys/category/edit',
          checkCode: '/sys/category/checkCode'
        },
        expandedRowKeys: [],
        pidField: 'pid'

      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({})
      },
      edit (record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'pid', 'name', 'code'))
        })
      },
      close () {
        this.$emit('close')
        this.visible = false
      },
      handleOk () {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            const httpurl = !this.model.id ? this.url.add : this.url.edit
            const method = !this.model.id ? 'post' : 'put'
            const formData = Object.assign(this.model, values)

            httpAction(httpurl, formData, method).then((res) => {
              if (this.$isAjaxSuccess(res.code)) {
                that.$message.success(res.message)
                that.submitSuccess(formData)
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.confirmLoading = false
              that.close()
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback (row) {
        this.form.setFieldsValue(pick(row, 'pid', 'name', 'code'))
      },
      submitSuccess (formData) {
        if (!formData.id) {
          const treeData = this.$refs.treeSelect.getCurrTreeData()
          this.expandedRowKeys = []
          this.getExpandKeysByPid(formData[this.pidField], treeData, treeData)
          this.$emit('ok', formData, this.expandedRowKeys.reverse())
        } else {
          this.$emit('ok', formData)
        }
      },
      getExpandKeysByPid (pid, arr, all) {
        if (pid && arr && arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].key === pid) {
              this.expandedRowKeys.push(arr[i].key)
              this.getExpandKeysByPid(arr[i]['parentId'], all, all)
            } else {
              this.getExpandKeysByPid(pid, arr[i].children, all)
            }
          }
        }
      },
      validateMyCode (rule, value, callback) {
        const params = {
          pid: this.form.getFieldValue('pid'),
          code: value
        }
        getAction(this.url.checkCode, params).then((res) => {
          if (this.$isAjaxSuccess(res.code)) {
            callback()
          } else {
            callback(res.message)
          }
        })
      }
    }
  }
</script>
