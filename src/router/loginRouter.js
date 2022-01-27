const Router = require('koa-router')
const loginController = require('../api/LoginController')

const router = new Router()

router.post('/forget', loginController.forget) // 管理业务对应的路径
router.get('/test', loginController.test) // 管理业务对应的路径

module.exports = router
// export default router
