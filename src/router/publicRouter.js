const Router = require('koa-router')
const publicController = require('../api/PublicController')

const router = new Router()

router.get('/getCaptcha', publicController.getCaptcha)

module.exports = router
// export default router
