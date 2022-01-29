const combineRoutes = require('koa-combine-routers')

const publicRouter = require('./publicRouter')
const loginRouter = require('./loginRouter')

module.exports = combineRoutes(loginRouter, publicRouter)
// export default combineRoutes(publicRouter, loginRouter) // 整合所有路由
