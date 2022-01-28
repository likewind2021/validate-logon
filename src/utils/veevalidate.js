import { extend, localize } from 'vee-validate'
import { required, email, min, max, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)

// localize('zh_CN', zh)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    password: '密码',
    nickname: '昵称',
    username: '账号',
    code: '验证码',
    repass: '确认密码'
  },
  fields: { // 对单个 names 的内容进行定义
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}!'
    }
  }
})
