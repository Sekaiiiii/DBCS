'use strict'
module.exports = function (req, res, next) {
    if (req.session.role == 2) {
        next();
    } else {
        next(new Error('105'))
    }
}