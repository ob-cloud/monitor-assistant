<template>
  <a-drawer
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
  >
    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="机构账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入机构账号" v-decorator="[ 'name', validatorRules.username]" :readOnly="!!model.id" />
        </a-form-item>

        <template v-if="!model.id">
          <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input type="password" placeholder="请输入登陆密码" v-decorator="[ 'password', validatorRules.password]" />
          </a-form-item>

          <a-form-item label="确认密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input type="password" @blur="handleConfirmBlur" placeholder="请重新输入登陆密码" v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]" />
          </a-form-item>
        </template>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构地址">
          <a-input placeholder="请输入机构地址" v-decorator="[ 'address', {rules: [{ required: true, message: '请输入机构地址!' }]} ]" :readOnly="!!model.id" />
        </a-form-item>

        <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系人名称" v-decorator="[ 'contact', validatorRules.username]" :readOnly="!!model.id" />
        </a-form-item>

        <a-form-item label="电子邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入邮箱" v-decorator="[ 'email', validatorRules.email]" :readOnly="!!model.id" />
        </a-form-item>

        <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入手机号码" v-decorator="[ 'phone', validatorRules.phone]" :readOnly="!!model.id" />
        </a-form-item>
      </a-form>
    </a-spin>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import { isEmail } from '@/utils/validator'
import { addAgent, editAgent } from '@/api/agent'
export default {
  data () {
    return {
      title: '操作',
      drawerWidth: 700,
      visible: false,
      disableSubmit: false,
      modaltoggleFlag: true,
      confirmDirty: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        username: {
          rules: [{
            required: true, message: '请输入用户账号!'
          }, {
            validator: this.validateUsername
          }]
        },
        password: {
          rules: [{
            required: true,
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
            message: '密码由8位数字、大小写字母和特殊符号组成!'
          }, {
            validator: this.validateToNextPassword
          }]
        },
        confirmpassword: {
          rules: [{
            required: true, message: '请重新输入登陆密码!'
          }, {
            validator: this.compareToFirstPassword
          }]
        },
        phone: { rules: [{ validator: this.validatePhone }] },
        email: {
          rules: [{
            validator: this.validateEmail
          }]
        }
      }
    }
  },
  methods: {
    toggleScreen () {
      this.drawerWidth = this.modaltoggleFlag ? window.innerWidth : 700
      this.modaltoggleFlag = !this.modaltoggleFlag
    },
    add () {
      this.edit({})
    },
    edit (record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'name', 'address', 'email', 'phone', 'contact'))
      })
    },
    // 确定
    handleSubmit () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const formData = Object.assign({}, values)
          if (this.model.id) formData.id = this.model.id
          console.log(formData)
          const obj = !this.model.id ? addAgent(formData) : editAgent(formData)
          obj.then((res) => {
            if (that.$isAjaxSuccess(res.code)) {
              that.$message.success(res.message)
              that.$emit('ok')
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
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    // 关闭
    handleCancel () {
      this.close()
    },
    close () {
      this.$emit('close')
      this.visible = false
      this.disableSubmit = false
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form
      const confirmpassword = form.getFieldValue('confirmpassword')

      if (value && confirmpassword && value !== confirmpassword) {
        callback('两次输入的密码不一样！')
      }
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], {
          force: true
        })
      }
      callback()
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一样！')
      } else {
        callback()
      }
    },
    validatePhone (rule, value, callback) {
      if (!value) {
        callback()
      } else {
        if (new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
          callback()
        } else {
          callback('请输入正确格式的手机号码!')
        }
      }
    },
    validateEmail (rule, value, callback) {
      if (!value) {
        callback()
      } else {
        if (isEmail(value)) {
          callback()
        } else {
          callback('请输入正确格式的邮箱!')
        }
      }
    },
    validateUsername (rule, value, callback) {
      callback()
    }
  }
}
</script>
<style scoped>
.drawer-bootom-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>
