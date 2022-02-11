const Router = require('koa-router')
const loginController = require('../api/LoginController')

const router = new Router()

router.prefix('/login')
router.post('/forget', loginController.forget) // 管理业务对应的路径
// router.get('/test', loginController.test)
router.post('/login', loginController.login)
router.post('/reg', loginController.reg)

module.exports = router
// export default router
