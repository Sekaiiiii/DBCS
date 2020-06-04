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
    let sql = `update employee set ? where id = ?`
    let param_list = [];
    let set_obj = {};
    let key_array = Object.keys(req.body);
    if (key_array.length == 0) {
        return next(new Error('300'));
    }
    key_array.forEach(key => {
        set_obj[key] = req.body[key]
    })
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
            'msg': '修改员工信息成功'
        }))

    })

});


module.exports = router;