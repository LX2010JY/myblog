var express = require('express');
var router = express.Router();
var blog = require('../models/blogs');
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
router.get('/:id',function (req,res,next) {
    _id = req.params.id;
    blog.findById(_id,function (err,blog) {
        if(err) {
            console.log(err);
            next();
        } else {
            res.render('left',{right:'detail',blog:blog});
            next();
        }
    });
});
router.get('/write',function (req,res,next) {

    res.render('left',{right:'write'});
    next();
});
router.post('/add',function (req,res,next) {
    var title = req.body.title;
    var content = req.body.content;
    var id = req.body._id;
    if(id!=='undefined') {

    }
    _blog = new blog({
        title:title,
        content:content,
        author:'Lxiao'
    });
    _blog.save(function (err,blog) {
        if(err){
            console.log(err);
        }
        console.log(blog);
        res.redirect('/artical');
    });
    next();
});
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
