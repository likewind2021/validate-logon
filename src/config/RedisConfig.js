const redis = require('redis')
const { promisifyAll } = require('bluebird')
const config = require('./index')

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  // password: config.REDIS.password,
  detect_buffers: true,
  // 重试策略
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}

// 创建连接
const client = promisifyAll(redis.createClient(options))

client.on('data', () => {
  console.log('Redis successfly')
})
// 连接错误
client.on('error', (err) => {
  console.log('Redis CLient Error' + err)
})

// set方法
const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time)
    } else {
      client.set(key, value)
    }
  } else if (typeof value === 'object') {
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

// 获取string
const getValue = (key) => {
  return client.getAsync(key)
}

// 获取对象
const getHValue = (key) => {
  return client.hgetallAsync(key)
}

// 删除
const delValue = (key) => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully')
    } else {
      console.log(err)
    }
  })
}
module.exports = {
  client,
  setValue,
  getValue,
  getHValue,
  delValue
}
