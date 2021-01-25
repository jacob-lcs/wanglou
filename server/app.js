const Koa = require('koa');
const app = new Koa();
const router = require('./routes/index');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const fs = require('fs');
const koaBody = require('koa-body');


const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })


app.use(cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
  }
}));
app.use(async (ctx, next) => {
  const { url = '' } = ctx;
  console.log(url);
  await next();
})
app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());
app.use(morgan('combined', { stream: accessLogStream }))


app.listen(4000);
