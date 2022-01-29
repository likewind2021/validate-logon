// const setValue = require('../config/RedisConfig')
const svgCaptcha = require('svg-captcha')

class PublicController {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }
  async getCaptcha (ctx) {
    // const body = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 28
    })
    // 保存图片验证码数据，设置超时时间，单位：s
    // setValue(body.sid, newCaptcha.text, 10 * 60)
    // getValue(body.sid).then((res) => {
    //   console.log(res)
    // })
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}

// export default new PublicController()
module.exports = new PublicController()
