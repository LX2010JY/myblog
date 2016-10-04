var express = require('express');
var router = express.Router();
var blog = require('../models/blogs');
var comment = require('../models/comment');
var user = require('../models/user');
var _= require('underscore');

/* GET artical listing. */
router.get('/', function(req, res) {
    blog.fetch(function (err,blogs) {
        if(err){
            console.log('err');
        }
        res.render('left', {right: 'artical',blogs:blogs});
    });
});
/*博客文章详情页面*/
router.get('/:id',function (req,res,next) {
    _id = req.params.id;
    blog.findById(_id,function (err,blog) {
        if(err) {
            console.log(err);
            next();
        } else {
            comment.fetchBlogById(_id,function (err,comments) {
                if(err){
                    console.log('失败');
                    console.log(err);
                } else {
                    console.log('成功');
                    // for(var key in comments) {
                    //     /////////////////////////////////////
                    //     user.fetchById(comments[key].my_id,function (err,user) {
                    //         if(err){
                    //             console.log("失败");
                    //         } else {
                    //             comments[key].userinfo.username = user[0].username;
                    //             comments[key].userinfo._id = user[0]._id;
                    //         }
                    //     });
                    // }
                    res.render('left',{right:'detail',blog:blog,'comments':comments});
                    next();
                }
            });
//            next();
        }
    });
});
/*写博客页面*/
router.get('/write',function (req,res,next) {

    res.render('left',{right:'write'});
    next();
});
/*添加博文*/
router.post('/add',function (req,res) {
    var title = req.body.title;
    var content = req.body.content;
    var id = req.body._id;
    if(id!=="undefined") {
        blog.findById(id,function (err,blog) {
            if(err) {
                console.log(err);
            }
            blogObj = {
                _id : id,
                title : title,
                content : content
            };
            _blog = _.extend(blog,blogObj);
            _blog.save(function (err,blog) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/artical/'+id);
                    return;
                }
            })

        });
    } else {
        _blog = new blog({
            title: title,
            content: content,
            author: 'Lxiao'
        });

        _blog.save(function (err, blog) {
            if (err) {
                console.log(err);
            }
            res.redirect('/artical');
        });
    }
});
/*删除博客*/
router.get('/del/:id',function (req,res,next) {
    var id=req.params.id;
    blog.remove({_id:id},function (err,blog) {
        if(err){
            console.log(err);
            next();
        } else{
            res.redirect('/artical');
        }
    });
});
/*更新文章*/
router.get('/upd/:id',function (req,res,next) {
    var _id = req.params.id;

    blog.findById(_id,function (err,blog) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.render('left', {right: 'write', blog: blog});
            next();
        }
    });
});

module.exports = router;
