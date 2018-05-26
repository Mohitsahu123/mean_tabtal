var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};


exports.verifyUser = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var error = new Error('You are not authenticated!');
                error.status = 401;
                return next(error);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};