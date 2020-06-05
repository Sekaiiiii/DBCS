const express = require('express');
const resObj = require('../tool/resObj.js');
const pool = require('../tool/pool.js');
const async = require('async');

const router = express.Router();

//参数验证
router.post("/", (req, res, next) => {
    next();
});

//业务处理
router.post("/", (req, res, next) => {
    async.waterfall([
        function getConnection(done) {
            pool.getConnection((err, connect) => {
                if (err) {
                    console.error(err);
                    return done(new Error('203'));
                }
                done(null, connect);
            })
        },
        function beginTransaction(connect, done) {
            connect.beginTransaction((err) => {
                if (err) {
                    console.error(err);
                    connect.release();
                    return done(new Error('204'));
                }
                done(null, connect);
            })
        },
        function createNewFunction(connect, done) {
            let sql = `
            insert into function(
                name,
                description
            ) value(?)`;
            let param_list = [
                req.body.name,
                req.body.description,
            ];
            connect.query(sql, [param_list], (err, result, fileds) => {
                if (err) {
                    console.error(err);
                    connect.rollback(() => { connect.release() });
                    return done(new Error('200'));
                }
                console.log(result);
                if (result.affectedRows == 1) {
                    return done(null, connect, result.insertId);
                }
                connect.rollback(() => { connect.release() });
                done(new Error('999'));
            })
        },
        function setUser(connect, insertId, done) {
            let sql = `
            insert into department_has_function(department_id,function_id) value(?)
            `;
            connect.query(sql, [[req.body.department_id, insertId]], (err, result, fileds) => {
                if (err) {
                    console.error(err);
                    connect.rollback(() => { connect.release() });
                    return done(new Error('200'));
                }
                if (result.affectedRows == 0) {
                    connect.rollback(() => { connect.release() });
                    return done(new Error('201'));
                }
                if (result.affectedRows == 1) {
                    return done(null, connect);
                }
                connect.rollback(() => { connect.release() });
                done(new Error('999'));
            })
        }


    ], function (err, connect) {
        if (err) return next(err);
        connect.commit((err) => {
            if (err) {
                console.error(err);
                connect.rollback(() => { connect.release() });
                return next(new Error('205'));
            }
            connect.release();
            res.send(resObj.success({
                'msg': '为部门添加功能描述成功'
            }))
        })

    })
});


module.exports = router;