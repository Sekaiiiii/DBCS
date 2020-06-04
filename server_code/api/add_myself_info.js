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
        function createNewEmployee(connect, done) {
            let sql = `
            insert into employee(
                name,
                sex,
                photo,
                birthday,
                politics_status,
                marital_status,
                native_place,
                identity_number,
                phone,
                record_place,
                household_registration_location,
                work_id,
                date_of_enrollment,
                operating_post,
                duty,
                work_statu,
                superior_employee_id,
                department_id
            ) value(?)`;
            let param_list = [
                req.body.name,
                req.body.sex,
                req.body.photo,
                req.body.birthday,
                req.body.politics_status,
                req.body.marital_status,
                req.body.native_place,
                req.body.identity_number,
                req.body.phone,
                req.body.record_place,
                req.body.household_registration_location,
                req.body.work_id,
                req.body.date_of_enrollment,
                req.body.operating_post,
                req.body.duty,
                req.body.work_status,
                req.body.superior_employee_id,
                req.body.department_id
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
            update user set employee_id = ? where id = ?
            `;

            connect.query(sql, [insertId, req.session.user_id], (err, result, fileds) => {
                if (err) {
                    console.error(err);
                    connect.rollback(() => { connect.release() });
                    return done(new Error('200'));
                }
                if (result.affectedRows == 0) {
                    connect.rollback(() => { connect.release() });
                    return done(new Error('201'));
                }
                if (result.changedRows == 0) {
                    connect.rollback(() => { connect.release() });
                    return done(new Error('202'));
                }
                if (result.affectedRows == 1 && result.changedRows == 1) {
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
                'msg': '新增员工信息并绑定至个人账户成功'
            }))
        })

    })
});


module.exports = router;