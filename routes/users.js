var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*登陆页面*/
router.get('/login',function (req,res) {
    res.render('logres',{status:'login'});
});
/*注册页面*/
router.get('/register',function (req,res) {
    res.render('logres',{status:'register'});
});

module.exports = router;
