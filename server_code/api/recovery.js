/*
* author:谢奇
* create_day:2020-05-15
* modified_day:2020-05-15
* function:恢复数据库使用的接口
*/
'use strict'
const express = require('express');
const path = require("path");
const async = require("async");
const fs = require("fs");
const { exec } = require("child_process");

const mysql_conf = require("../../config/mysql_conf.js");

const resObj = require('../tool/resObj.js');
const router = express.Router();


//参数检查
router.post("/", function (req, res, next) {
    next();
})

//业务处理
router.post("/", function (req, res, next) {
    async.waterfall([
        function judgeCompressionFileExist(done) {
            let tar_path = path.join(__dirname, "..", "shell", "db_dump", req.body.name);
            fs.access(tar_path, function (err) {
                if (err) {
                    console.error(err);
                    return done(new Error("603"));
                }
                done(null, tar_path);
            })
        },
        function decompressionFile(tar_path, done) {
            let command = `tar -zxvf ${tar_path} -C ${path.join(__dirname, "..", "shell", "db_dump")}`;
            exec(command, function (err, stdout, stderr) {
                if (err) {
                    console.error(err);
                    return done(new Error("604"));
                }
                done(null);
            })
        },
        function judgeSQLFileExist(done) {
            //对tar_path进行解析
            let sql_name = req.body.name.substr(2, 17) + ".sql";
            let sql_path = path.join(__dirname, "..", "shell", "db_dump", sql_name);
            fs.access(sql_path, function (err) {
                if (err) {
                    console.error(err);
                    return done(new Error("605"));
                }
                done(null, sql_path);
            })
        },
        function recoveryDatabase(sql_path, done) {
            let command = `mysql -u${mysql_conf.user} -p${mysql_conf.password} ${mysql_conf.database} < ${sql_path}`;
            exec(command, function (err, stdout, stderr) {
                if (err) {
                    console.error(err);
                    return done(new Error("606"));
                }
                done(null);
            })
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
        res.send(resObj.success({
            msg: "还原数据库成功"
        }))
    })
})


module.exports = router;