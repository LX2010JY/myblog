var mysql = require('mysql');
var config = require('../conf/config');

var pool = mysql.createPool(config.mysql_dev);
exports.pool = pool;