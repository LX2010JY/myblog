var mongoose = require('mongoose');
var BlogSchemas = require('../schemas/blogs');

var blog = mongoose.model('blog',BlogSchemas);
module.exports = blog;