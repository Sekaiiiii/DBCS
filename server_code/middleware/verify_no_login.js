'use strict'
module.exports = function (req, res, next) {
    if ("is_login" in req.session) {
        next(new Error('101'));
    } else {
        next();
    }
}