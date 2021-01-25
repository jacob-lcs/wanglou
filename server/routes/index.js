const router = require('koa-router')()
const api = require('../api')

router.get('/api/watch/getLogList', api.watch.getLogList)
router.get('/api/watch/getLogDetail', api.watch.getLogDetail)
router.post('/api/watch/uploadLog', api.watch.uploadLog)

module.exports = router