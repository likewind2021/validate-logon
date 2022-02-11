const koa = require('koa')
const JWT = require('koa-jwt')
const helmet = require('koa-helmet')
const statics = require('koa-static')
const koaBody = require('koa-body')
const jsonutil = require('koa-json')
const compose = require('koa-compose')
const compress = require('koa-compress')
const cors = require('@koa/cors')
const router = require('./router/routes')
const path = require('path')
const config = require('./config/index')
const errorHandle = require('./common/errorHandle')

// eslint-disable-next-line new-cap
const app = new koa()

// eslint-disable-next-line no-unneeded-ternary
const isDevMode = process.env.NODE_ENV === 'production' ? false : true

// 定义公共路径，不需要 jwt 鉴权
const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /\/login/] })

/**
 * 使用koa-compose 集成中间件
 */

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
  errorHandle,
  jwt
])

if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000)
console.log('http://localhost:3000')
