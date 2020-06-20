const _ = require('lodash')
const dateFns = require('date-fns')
const md5 = require('md5')
const jwtInfo = require('../config/jwt')
const MD5_SALT = jwtInfo.key

function encodeBase64(content) {
  return Buffer.from(content).toString('base64')
}

function decodeBase64(encodeStr) {
  return Buffer.from(encodeStr, 'base64').toString()
}

function generateChecksum(content) {
  const hash1 = md5(content + MD5_SALT)
  return md5(MD5_SALT + hash1)
}

/**
 * 解析cookie中的token字段, 返回用户信息, 没有登录返回空对象
 * @param {Object} cookie
 * @return {Object}
 */
function parseToken(token) {
  const jsonInfo = decodeBase64(token)

  let info = {}
  try {
    info = JSON.parse(jsonInfo)
  } catch (e) {
    return {}
  }
  const checksum = generateChecksum(info.user)
  if (checksum !== info.checksum) {
    return {}
  }

  const user = JSON.parse(info.user)

  const ucid = _.get(user, ['ucid'], 0)
  const name = _.get(user, ['nickname'], '')
  const avatar = _.get(user, ['avatar'], '')
  const email = _.get(user, ['email'], '')
  const loginAt = _.get(user, ['loginAt'], 0)
  return {
    ucid,
    name,
    email,
    loginAt,
    avatar
  }
}

/**
 * 生成 cookie token
 * @param {*} ucid
 * @param {*} nickname
 * @param {*} email
 * @return {String}
 */
function generateToken(ucid, email, nickname, avatar) {
  const loginAt = dateFns.getUnixTime(new Date())
  const user = JSON.stringify({
    ucid,
    nickname,
    email,
    avatar,
    loginAt
  })
  // 利用checksum和loginAt避免登录信息被篡改
  const checksum = generateChecksum(user)
  const infoJson = JSON.stringify({
    user,
    checksum
  })
  const info = encodeBase64(infoJson)
  return info
}

module.exports = {
  parseToken,
  generateToken
}
