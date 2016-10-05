var express = require('express');
var router = express.Router();
var user = require('../models/user');
var _ = require('underscore');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/timeline',function (req,res,next) {
    res.render('left',{right:'personal/timeline'});
});
router.get('/active',function (req,res,next) {
    res.render('left',{right:'personal/active'});
});

/*用户个人中心*/
router.get('/',function (req,res,next) {
    user.fetchInfoByName(req.session.username,function (err,user) {
        if(err) {
            console.log(err);
            next();
        } else {
            res.render('left',{right:'personal',user:user});
        }
    });
});



/**
 * 上传头像
 * TODO 上传的位置需要修改
 */
router.post('/uploadimg',multipartMiddleware,function (req,res) {
    if(req.files.uploadhead.path) {
        res.json({success:1,path:'/'+req.files.uploadhead.path});
        return;
    } else {
        res.json({success:0});
        return;
    }
});
router.post('/upd',function (req,res) {
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
                    res.redirect('/personal');
                }
            });
        }
    })
});

module.exports = router;