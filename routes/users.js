var express = require('express');
var router = express.Router();
var user = require('../models/user');
var _ = require('underscore');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');
var util = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});
/*用户个人中心*/
router.get('/personal',function (req,res,next) {
    user.fetchInfoByName(req.session.username,function (err,user) {
        if(err) {
            console.log(err);
            next();
        } else {
            res.render('left',{right:'user/personal',user:user});
        }
    });
});
/*登陆页面*/
router.get('/login',function (req,res) {
    res.render('logres',{status:'login'});
});
/*注册页面*/
router.get('/register',function (req,res) {
    res.render('logres',{status:'register'});
});
/**
 * 上传头像
 * TODO 上传的位置需要修改
 */
router.post('/personal/uploadimg',multipartMiddleware,function (req,res) {
    if(req.files.uploadhead.path) {
        res.json({success:1,path:'/'+req.files.uploadhead.path});
        return;
    } else {
        res.json({success:0});
        return;
    }
});
router.post('/personal/upd',function (req,res) {
    var userObj = req.body;
    user.fetchInfoByName(req.session.username,function (err,user) {
        if(err){
            console.log('错误-------->位置:个人中心获取用户信息/router/user.js/upd');
        } else {
            userObj._id = user._id;
            _user = _.extend(user,userObj);
            console.log(_user);
            _user.save(function (err,user) {
                if(err){
                    console.log('错误------->位置：个人中心保存用户信息错误/router/user.js/upd');
                } else {
                    res.redirect('/users/personal');
                }
            });
        }
    })
});
/**
 * 用户登陆判断是否正确
 */
router.post('/login',function (req,res) {
    var username = req.body.username;
    var password = req.body.password;

    user.fetchName(username,password,function (err,user) {
        if(err){
            res.json({'success':0});
            return;
        } else {
            req.session.username = username;
            if(user!=1) res.json({'success':0});
            else res.json({'success':1});
        }
    });
});

router.post('/register',function (req,res) {
    var username = req.body.username;
    var password = req.body.passwd;
    var phone = req.body.phone;
    _users = new user({
        username : username,
        password : password,
        phone : phone
    });
    _users.save(function(err,user) {
        if(err){
            res.json({'success':0});
            return;
        } else {
            res.json({'success':1});
            return;
        }
    });
});
module.exports = router;
