const tips = require("../config/response");
const mysql = require("../utils/mysql");

const genValue = (value) => {
  return encodeURIComponent(JSON.stringify(value));
}

let uploadLog = async (ctx, next) => {
  const data = JSON.parse(ctx.request.body);

  const insertLog = `
    insert into log
      (userAgent, url, title, time, message, fileName, lineNumber, columnNumber, stacktrace, type, breadcrumbs, performance)
      values
      ("${genValue(data.userAgent)}", "${genValue(data.url)}", "${genValue(data.title)}", "${genValue(data.time)}", "${genValue(data.message)}", "${genValue(data.fileName)}", "${genValue(data.lineNumber)}", "${genValue(data.columnNumber)}", "${genValue(data.stacktrace)}", "${data.type}", "${genValue(data.breadcrumbs)}", "${genValue(data.performance)}");
    `;
  console.log(`🤖🤝👽 ~ file: watch.js ~ line 10 ~ uploadLog ~ insertLog`, insertLog);

  const res = await mysql.query(insertLog);
  if(res.error === 1) {
    return (ctx.body = {
      ...tips[2],
    });
  }
  return (ctx.body = {
    ...tips[1],
  });
};

const getLogList = async (ctx, next) => {
  const queryLog = `
    select id, type, time
    from log
  `;
  const res = await mysql.query(queryLog);
  const list = JSON.parse(JSON.stringify(res)).message;
  console.log(`🤖🤝👽 ~ file: watch.js ~ line 37 ~ getLogList ~ list`, list);
  for (let item of list) {
    for (let i in item) {
      item[i] = decodeURIComponent(item[i])
    }
  }
  return (ctx.body = {
    ...tips[1],
    data: list,
  });
};

const getLogDetail = async (ctx, next) => {
  const data = ctx.request.query;
  console.log(`🤖🤝👽 ~ file: watch.js ~ line 51 ~ getLogDetail ~ data`, data);
  const queryLog = `
    select *
    from log
    where id=${data.id}
  `;
  const res = await mysql.query(queryLog);
  console.log(`🤖🤝👽 ~ file: watch.js ~ line 57 ~ getLogDetail ~ res`, res);
  const list = JSON.parse(JSON.stringify(res)).message
  for (let item of list) {
    for (let i in item) {
      item[i] = decodeURIComponent(item[i])
    }
  }
  return (ctx.body = {
    ...tips[1],
    data: list[0],
  });
};

module.exports = {
  uploadLog,
  getLogList,
  getLogDetail
}