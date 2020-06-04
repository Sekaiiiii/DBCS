'use strict'
module.exports = function (req, res, next) {
    if ('is_login' in req.session) {
        next();
    } else {
        next(new Error('100'))
    }
}