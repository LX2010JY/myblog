/**
 * Created by ying on 16-10-3.
 */

var mongoose = require('mongoose');
var userSchema = require('../schemas/user');
var user = mongoose.model('user',userSchema);

//通过数据模型获得的值是一个对象，但是这个获得的对象不能随意添加属性，必须在commentSchema 中有定义才行，比如 这里的userinfo，刚开始真是坑死我了，怎么都加不上数据

var CommectSchema = new mongoose.Schema({
    blog_id : String,
    my_id : String,
    reply_id : String,
    mac : String,
    ipaddress : String,
    content : String,
    userinfo : {},
    createAt : {
        type:Date,
        default : Date.now()
    }
});

CommectSchema.pre('save',function (next) {
    this.createAt = Date.now();
    next();
});



CommectSchema.statics = {
    findUserInfo : function (my_id) {
        user.fetchById(my_id,function (err,user) {
            if(err){
                console.log(err);
            } else {
                return user;
            }
        });
    },
    fetchById : function (cb) {
        return this.find({_id:id}).exec(cb);
    },

    fetchBlogById : function (blog_id,cb) {
        var comment_list = this.find({blog_id:blog_id}).sort({createAt:'desc'});
        return comment_list.exec(cb);

    }

};


module.exports = CommectSchema;