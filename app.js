var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');

var app = express();
global.appRoot = path.resolve(__dirname);

let corsConfig = {
    origin: "*",
    credentials: true,
    preflightContinue: false,
    methods: ['GET', 'POST'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
};
app.use(cors(corsConfig));

app.use(logger('dev'));

app.use(bodyParser.text({limit: 1024*1024*1024}));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

let publicDir;
switch(process.env.NODE_ENV) {
    case "development":
        publicDir = path.join(__dirname, 'public');
        break;
    case "staging":
    case "production":
    default:
        publicDir = path.join(__dirname, 'build');
        break;
}
app.use(express.static(publicDir));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
app.get('/*', (req, res) => {
    res.sendFile(publicDir + '/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error("Error:", err);

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;