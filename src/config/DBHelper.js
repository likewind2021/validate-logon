const mongoose = require('mongoose')
const config = require('./index')

// 创建连接
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接成功回调
mongoose.connection.on('connected', () => {
  console.log('successfly', config.DB_URL)
})

// 连接异常回调
mongoose.connection.on('error', (err) => {
  console.log('error', err)
})

// 断开连接

// 连接异常回调
mongoose.connection.on('disconnected', () => {
  console.log('close')
})

module.exports = mongoose
