const send = require('../config/MailConfig')
const moment = require('moment')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../config/index')
const checkCode = require('../common/Utils')
const User = require('../model/User')
const bcrypt = require('bcrypt')
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
    // let result = ''
    // try {
    //   result = await checkCode(sid, code)
    // } catch (error) {
    //   console.log(error)
    // }
    // 验证图片验证码的时效性、正确性
    if (await checkCode(sid, code)) {
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
      if (await bcrypt.compare(body.password, user.password)) {
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

  async reg (ctx) {
    // 接收客户端数据
    // const { body } = ctx.request
    // // 校验验证码内容（正确性 时效性）
    // const sid = body.sid
    // const code = body.code
    const { sid, code, username, password, nickname } = ctx.request.body
    // let result = ''
    // try {
    //   result = await checkCode(sid, code)
    // } catch (error) {
    //   console.log(error)
    // }
    const msg = {}
    let check = true
    // 验证图片验证码的时效性、正确性
    if (await checkCode(sid, code)) {
      // 查库，检查 username 是否被注册
      const user1 = await User.findOne({ username })
      if (user1 && user1.username === username) {
        // ctx.body = {
        //   code: 500,
        //   msg: ['此邮箱已经注册，可以通过邮箱找回密码']
        // }
        // return
        msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']
        check = false
      }
      // 查库，检查 nickname 是否被注册
      const user2 = await User.findOne({ nickname })
      if (user2 && user2.nickname === nickname) {
        msg.nickname = ['此昵称已经被注册，请修改']
        check = false
      }
      // 将数据写入数据库
      const newPassword = await bcrypt.hash(password, 5)
      if (check) {
        const user = new User({
          username,
          nickname,
          password: newPassword,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        const result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
        return
      }
    } else {
      // veevalidate 显示的错误
      msg.code = ['验证码已经失效，请重新获取']
      // ctx.body = {
      //   code: 500,
      //   msg: ['验证码已经失效，请重新获取']
      // }
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

// export default new LoginController()
module.exports = new LoginController()
