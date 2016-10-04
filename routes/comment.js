var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var comment = require('../models/comment');
var user = require('../models/user');
var _ = require('underscore');
router.get('/',function (req,res) {
    res.send(req.headers.host);
    console.log(req.headers['user-agent'].split(' '));
});
router.post('/add',function (req,res) {
    var username = req.session.username;
    var blog_id = req.body.blog_id;
    var content = req.body.content;
    var user_agent = req.headers['user-agent'].split(' ');

    user.fetchInfoByName(username,function (err,user) {
        if(err){
            console.log('错误位置---------> /router/comment.js/15 原因: 通过session的username获取用户信息');
        }else {
            _comment = new comment({
                userinfo : user,
                blog_id : blog_id,
                content : content,
                mac : 'Ubuntu chromium',
                ipaddress : req.headers.host
            });
            _comment.save(function (err,comment) {
                if(err){
                    res.json({success:0});
                    return;
                } else {
                    res.json(comment);
                    return;
                }
            })
        }
    });
});
module.exports = router;