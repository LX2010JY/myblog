var express = require('express');
var router = express.Router();
var user = require('../models/user');
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
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
