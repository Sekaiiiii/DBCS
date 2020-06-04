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
    insert into department(
      name,
      description
    ) value(?)`;
    let param_list = [
        req.body.name,
        req.body.description,
    ];
    pool.query(sql, [param_list], (err, result, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }
        if (result.affectedRows == 1) return res.send(resObj.success({ 'msg': '新建部门功能成功' }));
        next(new Error('999'));
    })

});


module.exports = router;