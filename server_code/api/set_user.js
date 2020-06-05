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
    let sql = `update user set ? where id = ?`
    let param_list = [];
    let set_obj = {};
    if (req.body.password) set_obj.password = req.body.password;
    if (req.body.role) set_obj.role = req.body.role;
    if (req.body.employee_id) set_obj.employee_id = req.body.employee_id;
    if (req.body.name) set_obj.name = req.body.name;

    param_list.push(set_obj);
    param_list.push(req.body.id);
    pool.query(sql, param_list, (err, result, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }
        if (result.affectedRows == 0) {
            return next(new Error('201'));
        }
        if (result.changedRows == 0) {
            return next(new Error('202'));
        }
        res.send(resObj.success({
            'msg': '修改用户信息成功'
        }))

    })

});


module.exports = router;