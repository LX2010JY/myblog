var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/method',function (req,res,next) {
  res.send("方式:"+req.method+"路径："+req.url);
});

router.get('/editor',function (req,res,next) {
  res.render('left',{right:"editor"});
});
module.exports = router;
