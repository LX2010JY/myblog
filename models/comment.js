var mongoose = require('mongoose');
var commetSchema = require('../schemas/comment');
var commet = mongoose.model('comment',commetSchema);

module.exports = commet;