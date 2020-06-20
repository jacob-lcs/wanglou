const Knex = require('../utils/mysql')
const md5 = require('md5')
const tokenUtils = require('../utils/tokenUtils')

const register = async(req, res, next) => {
  const data = req.body
  const { email, password } = data
  const ret = await Knex.select('ucid').from('t_o_user').where('email', email)
  if (ret.length === 0) {
    const password_md5 = md5(password)
    const ucid = md5(email)
    await Knex('t_o_user').insert({
      email,
      password_md5,
      ucid,
      create_time: new Date().getTime()
    })
    res.json({
      result: 'ok',
      code: 0,
      message: '注册成功'
    })
  } else {
    res.json({
      result: 'ok',
      code: 1,
      message: '该邮箱已注册'
    })
  }
}

const login = async(req, res, next) => {
  const data = req.body
  const { email, password } = data
  let ret = await Knex.select('ucid').from('t_o_user').where('email', email)
  if (ret.length === 0) {
    res.json({
      result: 'ok',
      code: 2,
      message: '没有此用户，请注册'
    })
  }
  const password_md5 = md5(password)
  ret = await Knex.select('ucid', 'nickname', 'email', 'avatar').from('t_o_user').where('email', email).where('password_md5', password_md5)
  if (ret.length === 0) {
    res.json({
      result: 'ok',
      code: 3,
      message: '密码错误'
    })
  }
  const token = tokenUtils.generateToken(ret[0].ucid, ret[0].email, ret[0].nickname, ret[0].avatar)
  res.cookie('ucid', ret[0].ucid, { maxAge: 100 * 86400 * 1000, httpOnly: false })
  res.cookie('nickname', ret[0].nickname, { maxAge: 100 * 86400 * 1000, httpOnly: false })
  res.cookie('email', ret[0].email, { maxAge: 100 * 86400 * 1000, httpOnly: false })
  res.cookie('avatar', ret[0].avatar, { maxAge: 100 * 86400 * 1000, httpOnly: false })
  res.cookie('wanglou_token', token, { maxAge: 100 * 86400 * 1000, httpOnly: false })
  res.json({
    result: 'ok',
    code: 0,
    data: {
      nickname: ret[0].nickname,
      avatar: ret[0].avatar,
      email: ret[0].email
    }
  })
}

const getInfo = async(req, res, next) => {
  res.json({
    result: 'ok',
    code: 0,
    data: req.wanglou.user
  })
}

module.exports = {
  login,
  register,
  getInfo
}
