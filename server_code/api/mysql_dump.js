'use strict'
const express = require('express');
const { exec } = require("child_process");
const path = require("path");
const pool = require('../tool/pool.js');
const resObj = require('../tool/resObj.js');
const router = express.Router();


router.use("/", function (req, res, next) {
    exec(path.join(__dirname, "..", "shell", "db_dump.sh"), (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return next(new Error('206'));
        }
        res.send(resObj.success({
            msg: "数据库备份成功"
        }));
    })
})

module.exports = router;