import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// Ready translated locale messages
const messages = {
  zh: {
    message: {
      internalError: "内部错误",
      scanEnvError: "只能在app环境中扫码",
      scanCheckError: "你扫描地址不正确，请确认二维码",
      appError: "请在手机中查看",
      cancel: "取 消",
      loading: "载入中",
      timeOut: "超时",
    },
    login: {
      account: '账号',
      password: '密码',
      inputAccount: '请输入账号',
      inputPassword: '请输入密码',
      login: '登录',
      register: '注册账号',
      forgetPassword: "忘记密码",
      invalidToken:"token无效",
    },
    home: {
      scanQr: "扫码核销",
      memberQr: "会员识别",
      messageList: "通知公告",
      employeeList: "员工列表",
      taskList: "任务列表",
      fileUpload: "文件上传",
      structure: "组织架构",
      frontPage: "首页",
      profile: "个人中心",
      inventory: "库存信息",
    },
    component: {
      messageDetail: "消息详情",
      employeeDetail: "员工详情",
      taskDetail: "任务详情",
      inventoryDetail: "库存详情",
      imgUpload: "图片上传",
    },
    user: {
      logout: "退出登录",
      langSwitch: "语言切换",
      changePsw: "密码修改",
      notification: "消息",
    }
  },


  en: {
    message: {
      internalError: "Internal Error",
      scanEnvError: "Scan can be used only in app",
      scanCheckError: "QR address is invalid, please check",
      appError: "check it out in app",
      cancel: "cancel",
      loading: "loading",
      timeOut: "Time out",
    },
    login: {
      account: 'Account',
      password: 'Password',
      inputAccount: 'Please input account',
      inputPassword: 'Please input password',
      login: 'Login',
      register: 'Register',
      forgetPassword: "Forget Password",
      invalidToken:"invalid token",
    },
    home: {
      scanQr: "Scan",
      memberQr: "Membership",
      messageList: "Message",
      employeeList: "Employee",
      taskList: "Task",
      fileUpload: "File Upload",
      structure: "Structure",
      frontPage: "Front Page",
      profile: "Profile",
      inventory: "Inventory",
    },
    component: {
      messageDetail: "Message Detail",
      employeeDetail: "Employee Detail",
      taskDetail: "Task Detail",
      inventoryDetail: "Inventory Detail",
      imgUpload: "Upload Image",
    },
    user: {
      logout: "Log Out",
      langSwitch: "Change Language",
      changePsw: "Change Passphrase",
      notification: "notification",
    }
  },
}
export default new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})
