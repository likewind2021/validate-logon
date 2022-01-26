const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main () {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // 发件服务器域名
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '2996814910@qq.com', // testAccount.user //generated ethereal user
      pass: 'kqcvwreahkhrdgcc' // testAccount.pass // generated ethereal password
    },
    tls: { rejectUnauthorized: false }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"认证邮件" <2996814910@qq.com>', // sender address
    to: '2996814910@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error)
