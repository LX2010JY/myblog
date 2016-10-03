var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    meta:{
        createAt: {
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});
BlogSchema.pre('save',function (next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

/**
 * this.model('blog') 里面的模型名必须和发布的模型名称一样
 * @param cb
 * @returns {Promise}
 */
BlogSchema.methods.finduall = function (cb) {
    console.log("这是实例可以直接执行的方法：");
    return this.model("blog").find({}).exec(cb);
};

/**
 * 静态方法，在model层就可以直接使用
 * @type {{fetch: mongoose.Schema.statics.fetch, findById: mongoose.Schema.statics.findById}}
 */
BlogSchema.statics = {
    fetch:function (cb) {
        return this.find({}).sort({'meta.createAt':'desc'}).exec(cb);
    },
    findById: function (id,cb) {
        return this.findOne({_id:id}).exec(cb);
    }
};
module.exports = BlogSchema;
