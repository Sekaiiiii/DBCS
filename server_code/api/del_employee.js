const express = require('express');
const resObj = require('../tool/resObj.js');
const pool = require('../tool/pool.js');

const router = express.Router();

//参数验证
router.post("/", (req, res, next) => {
    if (!req.body.id) return next(new Error('300'));
    next();
});

//业务处理
router.post("/", (req, res, next) => {
    let sql = `delete  from employee where id = ?`

    pool.query(sql, [req.body.id], (err, result, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }
        
        if (result.affectedRows == 0) {
            return next(new Error('201'));
        }

        res.send(resObj.success({
            'msg': '删除员工成功'
        }))
    })

});


module.exports = router;