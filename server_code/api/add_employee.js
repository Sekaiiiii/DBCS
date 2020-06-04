const express = require('express');
const resObj = require('../tool/resObj.js');
const pool = require('../tool/pool.js');

const router = express.Router();

//参数验证
router.post("/", (req, res, next) => {
    next();
});

//业务处理
router.post("/", (req, res, next) => {
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
    pool.query(sql, [param_list], (err, result, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }
        if (result.affectedRows == 1) return res.send(resObj.success({ 'msg': '新建员工成功' }));
        next(new Error('999'));
    })

});


module.exports = router;