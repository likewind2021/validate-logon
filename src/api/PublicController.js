const svgCaptcha = require('svg-captcha')

class PublicController {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }
  async getCaptcha (ctx) {
    // const body = ctx.request.query
    // console.log(body)
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 28
    })
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}

// export default new PublicController()
module.exports = new PublicController()
