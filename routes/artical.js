var express = require('express');
var router = express.Router();
var blog = require('../models/blogs');
var comment = require('../models/comment');
var user = require('../models/user');
var _= require('underscore');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.post('/upload',multipartMiddleware,function (req,res) {
    console.log(req.files.upload_file.path);
    res.json({'success':true,'msg':'上传成功(message)','file_path':'/'+req.files['upload_file']['path']});
});




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
                    console.log(err);
                } else {
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
                }
            });
//            next();
        }
    });
});
/*写博客页面*/
router.get('/write',function (req,res,next) {
    res.render('left',{right:'write'});
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
                    res.json({'success':0});
                } else {
                    res.json({'success':1,'url':'/artical/'+id});
                    // res.redirect('/artical/'+id);
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
                res.json({'success':0});
                // console.log(err);
            }
            res.json({'success':1,'url':'/artical'});
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
