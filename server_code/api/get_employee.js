const express = require('express');
const resObj = require('../tool/resObj.js');
const pool = require('../tool/pool.js');

const router = express.Router();

//参数验证
router.get("/", (req, res, next) => {
    next();
});

//业务处理
router.get("/", (req, res, next) => {
    let sql = `
    select
        employee.*,
        department.name as department_name,
        s_employee.name as superior_employee_name
    from
        employee as employee
        left join employee as s_employee on s_employee.id = employee.superior_employee_id
        left join department on department.id = employee.department_id
    where
        employee.id >= 1 
        ${req.query.name ? 'and employee.name like ?' : ''}
    limit
        ?
    offset
        ?
    `;

    let param_list = [];

    if (req.query.name) param_list.push('%' + req.query.name + '%');

    let limit = 10;
    let offset = 0;
    if (req.query.ppn) limit = req.query.ppn * 1;
    if (req.query.page) offset = limit * (req.query.page - 1);
    param_list.push(limit);
    param_list.push(offset);


    pool.query(sql, param_list, (err, user_list, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }

        res.send(resObj.success({
            msg: '获取员工列表成功',
            data: user_list
        }))
    })

});


module.exports = router;