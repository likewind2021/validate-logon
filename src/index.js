const koa = require('koa')
const helmet = require('koa-helmet')
const statics = require('koa-static')
const koaBody = require('koa-body')
const jsonutil = require('koa-json')
const compose = require('koa-compose')
const compress = require('koa-compress')
const cors = require('@koa/cors')
const router = require('./router/routes')
const path = require('path')

// eslint-disable-next-line new-cap
const app = new koa()

// eslint-disable-next-line no-unneeded-ternary
const isDevMode = process.env.NODE_ENV === 'production' ? false : true

/**
 * 使用koa-compose 集成中间件
 */

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet()
])

if (!isDevMode) {
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3000)
console.log('http://localhost:3000')
