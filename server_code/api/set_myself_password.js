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
    let sql = `update user set password = ? where id = ?`
    let param_list = [];
    param_list.push(req.body.password);
    param_list.push(req.session.user_id);
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
            'msg': '修改用户密码成功'
        }))

    })

});


module.exports = router;