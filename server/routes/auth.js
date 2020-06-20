var express = require('express')
var router = express.Router()

const auth = require('../api/auth')

router.post('/login', auth.login)
router.post('/register', auth.register)
router.get('/getInfo', auth.getInfo)

module.exports = router
