<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { isEmail } from '@/utils/validator'
import config from '@/config/defaultSettings'
import Carousel from '@/components/Carousel'
export default {
  name: 'SimpleLogin',
  components: { Carousel },
  data () {
    return {
      LoginForm: this.$form.createForm(this),
      LoginRules: {
        username: [ 'username', { initialValue: '', rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: this.handleUsernameOrEmail }], validateTrigger: ['blur', 'change'] } ],
        password: [ 'password', { initialValue: '', rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' } ]
      },
      state: {
        time: 60,
        loginStatus: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0
      }
    }
  },
  computed: {
    logo () {
      if (!config.logo) return ''
      return require(`@/assets/` + config.logo)
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      state.loginType = 1 - isEmail(value)
      callback()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        LoginForm: { validateFields },
        state,
        Login
      } = this

      state.loginStatus = true

      validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.password = md5(btoa(values.password) + values.password)
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginStatus = false
            })
        } else {
          setTimeout(() => {
            state.loginStatus = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      if (res) {
        this.$router.push({ path: '/' })
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000)
      } else {
        this.$notification.error({
            message: '错误',
            description: res.message
          })
      }
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  },
  render () {
    const placeholderIconStl = { color: 'rgba(0,0,0,.25)' }
    return (
      <div class="pages-user-index-login">
        <div class="pages-user-index-box">
          <div class="pages-user-index-content">
            <div class="pages-user-index-header"><img src={this.logo} style="width: 44px; height: 44px; margin-right: 16px;" alt="logo" />{config.title}</div>
            <a-form id="formLogin" class="user-layout-login" ref="formLogin" form={this.LoginForm} onSubmit={this.handleSubmit}>
              <a-form-item>
                <a-input size="large" type="text" placeholder="输入登录账户" v-decorator={this.LoginRules.username}>
                  <a-icon slot="prefix" type="user" style={ placeholderIconStl } />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input size="large" type="password" autocomplete="false" placeholder="输入用户密码" v-decorator={this.LoginRules.password}>
                  <a-icon slot="prefix" type="lock" style={ placeholderIconStl } />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  html-type="submit"
                  size="large"
                  type="primary"
                  block
                  loading={this.state.loginStatus}
                  disabled={this.state.loginStatus}
                >确定</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.user-layout-login{
  user-select: none;
  // margin-top: 28px;
  margin-top: 12%;

  .forge-password {
    font-size: 14px;
  }
  a-form-item:last-of-type{
    margin-top: 24px;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
.pages-user-index-login {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #3a4257;
  background-size: cover;
  background-position: center;
}

.pages-user-index-bg {
  background: #347ebc;
  width: 100%;
  height: 237px;
  opacity: .6;
  position: absolute;
  top: calc(50vh - 118.5px)
}

.pages-user-index-abstract-title {
  width: 510px;
  height: 237px;
  color: #fff;
  font-size: 72px;
  position: absolute;
  padding-top: 20px;
  left: 15%;
  top: 0;
  bottom: 0;
  margin: auto;
}

.pages-user-index-abstract-description {
  color: #fff;
  margin-left: 6px;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}

.pages-user-index-box {
  width: 355px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.pages-user-index-content {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 50px rgba(0, 0, 0, .4);
  border-radius: 5px;
  padding: 12% 10%;
}

.pages-user-index-header {
  width: 100%;
  height: 35px;
  font-size: 1.5rem;
  text-align: center;
  color: rgba(0, 0, 0, .85);
  font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
}

@media (min-width: 0px) and (max-width:1400px) {
  .pages-user-index-box {
    width: 340px;
  }
  .pages-user-index-abstract-title {
    // width: 400px;
    width: auto;
    font-size: 64px
  }
}

@media (min-width: 400px) and (max-width:800px) {
  .pages-user-index-box {
    right: 20%;
    width: 320px;
    // width: 300px;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    left: 0;
  }

  .pages-user-index-abstract-title {
    position: absolute;
    top: 100px;
    font-size: 50px;
    width: 100%;
    text-align: center;
    height: 200px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .pages-user-index-abstract-description {
    width: 100%;
    padding: 0 50px;
    text-align: center;
    font-size: 13px;
    height: 60px;
  }
}

@media (min-width: 330px) and (max-width:420px) {
  .pages-user-index-box {
    right: 20%;
    // width: 300px;
    width: 290px;
    top: 20px;
    right: 0;
    bottom: 0;
    margin: auto;
    left: 0;
  }

  .pages-user-index-abstract-title {
    position: absolute;
    top: 10%;
    font-size: 36px;
    width: 100%;
    text-align: center;
    height: 200px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .pages-user-index-abstract-description {
    width: 100%;
    padding: 0 50px;
    text-align: center;
    font-size: 13px;
    height: 60px;
    color: transparent;
  }
}

@media (min-width: 0px) and (max-width:330px) {
  .pages-user-index-box {
    right: 20%;
    width: 280px;
    top: 20px;
    right: 0;
    bottom: 0;
    margin: auto;
    left: 0;
  }

  .pages-user-index-abstract-title {
    position: absolute;
    top: 10%;
    font-size: 36px;
    width: 100%;
    text-align: center;
    height: 200px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .pages-user-index-abstract-description {
    width: 100%;
    padding: 0 50px;
    text-align: center;
    font-size: 13px;
    height: 60px;
    color: transparent;
  }
}

@media (max-height: 600px) {
  .pages-user-index-abstract-title {
    top: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    position: absolute;
  }
}

</style>
