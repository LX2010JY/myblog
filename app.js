var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var multiparty = require('connect-multiparty');

var routes = require('./routes/index');
var users = require('./routes/users');
var artical = require('./routes/artical');
var comments = require('./routes/comment');
var personal = require('./routes/personal');

var app = express();


mongoose.connect('mongodb://127.0.0.1:27017/blog');
blog = require('./models/blogs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({secret:'12345',username:'冯佳雨',name:'lxiao',resave:false,saveUninitialized:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '.')));

app.use(multiparty({uploadDir:'./upload/head/'}));
app.use('/users', users);

//判断是否已经登陆
app.use(function (req,res,next) {
    req.session.username="冯佳雨";
    if(!req.session.username) {
        res.redirect('/users/login');
    } else {
        next();
    }
});
app.use('/personal',personal);
app.use('/', routes);
app.use('/artical',artical);



app.use('/comment',comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
