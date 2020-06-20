var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const path = require('path')
const ejs = require('ejs')
const PrivilegeChecker = require('./middlewares/privilege')

var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')

var app = express()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9528')
  res.header('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE, authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(PrivilegeChecker.appendUserInfo)
app.use(PrivilegeChecker.checkLogin)

app.use('/', indexRouter)
app.use('/api/v1/auth/', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
