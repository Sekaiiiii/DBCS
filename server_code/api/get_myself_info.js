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
        employee.id = ?
    `;
    pool.query(sql, [req.session.employee_id], (err, user_list, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }
        res.send(resObj.success({
            msg: '获取个人员工信息成功',
            data: user_list[0]
        }))
    })

});


module.exports = router;