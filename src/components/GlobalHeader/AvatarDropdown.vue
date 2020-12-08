<template>
  <div>
    <a-dropdown v-if="currentUser && currentUser.username" placement="bottomRight">
      <span class="ant-pro-account-avatar">
        <a-avatar v-if="currentUser.avatar" class="antd-pro-global-header-index-avatar" size="small" :src="currentUser.avatar" />
        <a-avatar v-else style="margin-right: 5px;">User</a-avatar>
        <span>{{ currentUser.username }}</span>
      </span>
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <!-- <a-menu-item v-if="menu" key="center" @click="handleToCenter">
            <a-icon type="user" />
            个人中心
          </a-menu-item>
          <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
            <a-icon type="setting" />
            个人设置
          </a-menu-item> -->
          <a-menu-item v-if="menu" key="password" @click="handlePassword">
            <a-icon type="setting" />
            <span>密码修改</span>
          </a-menu-item>
          <a-menu-divider v-if="menu" />
          <a-menu-item key="logout" @click="handleLogout">
            <a-icon type="logout" />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <span v-else>
      <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
    </span>
    <user-password v-if="currentUser && menu" ref="userPassword"></user-password>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import UserPassword from './UserPassword'
export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  components: { UserPassword },
  methods: {
    handleToCenter () {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handlePassword () {
      this.$refs.userPassword.show(this.currentUser.username)
    },
    handleLogout (e) {
      Modal.confirm({
        title: '提示',
        content: '确认注销登录 ?',
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
