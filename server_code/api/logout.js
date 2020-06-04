'use strict'
const express = require('express');
const resObj = require('../tool/resObj.js');

const router = express.Router();

router.get("/", function (req, res) {
    req.session.destroy(function (err) {
        if (err) return next(new Error('104'));
        res.send(resObj.success({
            "msg": "退出成功"
        }));
    })
})

module.exports = router;