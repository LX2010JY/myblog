var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    phone : String,
    email : String,
    headimg:String,
    nname : String,
    sex:String,
    graduate_school:String,
    hobby:String,
    age : String,
    desc:String,
    meta : {
        createAt : {
            type:Date,
            default:Date.now()
        },
        updateAt : {
            type:Date,
            default:Date.now()
        }
    }
});


UserSchema.methods.speak = function () {
    return "这是userschema数据库,你造吗？";
};

UserSchema.pre('save',function (next) {
    if(this.isNew) {
        this.meta.updateAt = this.meta.createAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
UserSchema.statics = {
    fetchName : function (username,password,cb) {
        return this.find({username:username,password:password}).count().exec(cb);
    },
    fetchInfoByName : function (username,cb) {
        return this.findOne({username:username}).exec(cb);
    },
    fetchById : function (id,cb) {
        return this.find({_id:id}).exec(cb);
    }
};

module.exports = UserSchema;