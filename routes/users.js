var express = require('express');
var router = express.Router();
var user = require('../models/user');
var _ = require('underscore');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});
/*用户退出登陆*/
router.get('/logout',function (req,res) {
    req.session.destroy();
    res.redirect('/users/login');
});

var createcanvas = function(){
  var Canvas = require('canvas');
  var canvas = new Canvas(200,200);
  var ctx = canvas.getContext('2d');

  ctx.font = '30px Imact';
  ctx.rotate(.1);
  var num  = parseInt(Math.random()*8999+1000,10);

  ctx.fillText(num,50,100);

  var te = ctx.measureText('youudehexie!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50+te.width,102);
  ctx.stroke();
  return canvas.toDataURL();
}
/*登陆页面*/
router.get('/login',function (req,res) {


    res.render('logres',{status:'login',yzm:createcanvas()});
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
        phone : phone,
        headimg:'',
        nname:'',
        age:'',
        sex:'',
        desc:'',
        graduate_school:'',
        hobby:''
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
