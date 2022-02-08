const getValue = require('../config/RedisConfig')

const checkCode = async (key, value) => {
  const redisData = await getValue(key)
  if (redisData != null) {
    // 注意使大小写不敏感
    if (redisData.toLowerCase === value.toLowerCase) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = checkCode
