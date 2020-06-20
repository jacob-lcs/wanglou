const _ = require('lodash')
const tokenUtils = require('../utils/tokenUtils')
/**
 * 将用户信息更新到req对象中
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function appendUserInfo(req, res, next) {
  const cookies = req.cookies
  const token = _.get(cookies, ['wanglou_token'], '')
  const user = tokenUtils.parseToken(token)
  if (!token.ucid) {
    res.json({
      result: 'ok',
      code: 4,
      message: '登录超时'
    })
  }
  // 将用户信息添加到req.fee中(只添加信息, 在check里在检查是否需要登录)
  _.set(req, ['wanglou', 'user'], user)
  next()
}

/**
 * 将projectId添加到req.fee中, 只添加数据, 在check中再检查权限
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function appendProjectInfo(req, res, next) {
  const path = req.path
  if (_.startsWith(path, '/project')) {
    const projectId = parseInt(_.get(path.split('/'), [2], 0))
    _.set(req, ['fee', 'project', 'projectId'], projectId)
  }
  next()
}

/**
 * 检查用户是否已登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkLogin(req, res, next) {
  // 验证登录白名单
  const witeList = ['/', '/api/v1/auth/login']
  const ucid = _.get(req, ['wanglou', 'user'], 0)
  console.log(ucid)
  if (ucid === 0 && !witeList.includes(req.url)) {
    console.log('咋这里')
    res.json({
      result: 'ok',
      code: 4,
      message: '登录超时'
    })
    return
  }
  next()
}

/**
 * 检查用户是否拥有该项目权限
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkPrivilege(req, res, next) {
  // const ucid = _.get(req, ['fee', 'user', 'ucid'], 0)
  // const projectId = _.get(req, ['fee', 'project', 'projectId'], 0)
  // 查询数据库
  // const hasPrivilege = await MProjectMember.hasPrivilege(projectId, ucid)
  // if (hasPrivilege === false) {
  //   Logger.log('没有项目权限')
  //   res.send(API_RES.noPrivilege())
  //   return
  // }
  next()
}

module.exports = {
  appendProjectInfo,
  appendUserInfo,
  checkLogin,
  checkPrivilege
}
