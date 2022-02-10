const send = require('../config/MailConfig')
const moment = require('moment')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../config/index')
const checkCode = require('../common/Utils')
const User = require('../model/User')

class LoginController {
  // eslint-disable-next-line no-useless-constructor
  constructor () {}
  async forget (ctx) {
    const { body } = ctx.request // post请求
    // console.log(body)
    try {
      const result = await send({
        // body.username -> database -> email
        code: body.code,
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Jackson Yee'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  // test (ctx) {
  //   ctx.body = {
  //     code: 300,
  //     msg: '邮件发送成功'
  //   }
  // }

  async login (ctx) {
    // 接收用户的数据
    // 返回 token
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    let result = ''
    try {
      result = await checkCode(sid, code)
    } catch (error) {
      console.log(error)
    }
    // 验证图片验证码的时效性、正确性
    if (result) {
      // 验证用户账号密码是否正确
      let checkUserPassword = false
      // const user = await User.findOne({ username: body.username })
      const user = await User.findOne({ username: body.username })
      if (!user) {
        ctx.body = {
          code: 200,
          token: '该用户不存在'
        }
        return
      }
      if (user.password === body.password) {
        checkUserPassword = true
      }
      // mongoDB 查库
      if (checkUserPassword) {
        // 验证通过，返回 Token 数据
        console.log('hello')
        // , exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        const token = jsonwebtoken.sign({ _id: 'Jackson Yee' }, config.JWT_SECRET, { expiresIn: '1d' })
        ctx.body = {
          code: 200,
          token: token
        }
      } else {
        // 用户名 密码验证失败，返回提示信息
        ctx.body = {
          code: 401,
          msg: '用户名或密码错误'
        }
      }
    } else {
      // 图片验证码校验失败
      ctx.body = {
        code: 401,
        msg: '图形验证码错误，请检查'
      }
    }
  }
}

// export default new LoginController()
module.exports = new LoginController()
