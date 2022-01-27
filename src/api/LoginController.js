const send = require('../config/MailConfig')
const moment = require('moment')

class LoginController {
  // eslint-disable-next-line no-useless-constructor
  constructor () {}
  async forget (ctx) {
    console.log(ctx.request)
    const { body } = ctx.request // post请求
    try {
      const result = await send({
        // body.username -> database -> email
        code: 'august',
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

  test (ctx) {
    ctx.body = {
      code: 300,
      msg: '邮件发送成功'
    }
  }
}

module.exports = new LoginController()
// export default new LoginController()
