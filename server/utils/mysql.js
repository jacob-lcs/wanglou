const mysql = require('mysql')
const config = require('../config/dbConfig')

var pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  charset : 'utf8mb4'
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject({
          error: 1,
          message: err
        })
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject({
              error: 1,
              message: err
            })
          } else {
            resolve({
              error: 0,
              message: rows
            })
          }
          connection.release()
        })
      }
    })
  })

}

module.exports = {    //暴露方法
  query
}