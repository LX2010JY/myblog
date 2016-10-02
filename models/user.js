var db = require('./db');
var _ = require('underscore');

var user = function(){};
user.prototype.find = function(id, callback) {
    var sql = "SELECT * FROM users WHERE id =?";
    // get a connection from the pool
    db.pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [id], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};
module.exports = user;
