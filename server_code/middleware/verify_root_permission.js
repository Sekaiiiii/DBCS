'use strict'
module.exports = function (req, res, next) {
    if (req.session.role == 3) {
        next();
    } else {
        next(new Error('106'))
    }
}