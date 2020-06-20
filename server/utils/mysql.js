const sqlconfig = require('../config/mysql')
const knex = require('knex')
/**  knex 方式 */

const Knex = knex({
  client: 'mysql',
  connection: {
    host: sqlconfig.host,
    port: sqlconfig.port,
    database: sqlconfig.database,
    user: sqlconfig.user,
    password: sqlconfig.password
  },
  debug: false,
  pool: {
    max: 10,
    min: 0,
    // 由于存在资源池, 导致句柄不被释放, 程序不能退出
    // 因此将最小句柄数设为0, 每100ms检查一次是否有超过120ms未被使用的资源
    // 以便句柄的及时回收
    // free resouces are destroyed after this many milliseconds
    idleTimeoutMillis: 100,
    // how often to check for idle resources to destroy
    reapIntervalMillis: 150
  },
  acquireConnectionTimeout: 60000,
  log: {
    error(message) {
      console.log(`数据库操作异常 => ${message}`)
    }
  }
})

module.exports = Knex
