var mongoose = require('mongoose');
var userschemas = require('../schemas/user');

var user = mongoose.model('user',userschemas);

module.exports = user;