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
        *
    from 
        function
    where
        id >= 1
        ${req.query.name ? 'and name like ?' : ''}
        ${req.query.description ? 'and description like ?' : ''}
    limit
        ?
    offset
        ?
    `;

    let param_list = [];

    if (req.query.name) param_list.push('%' + req.query.name + '%');
    if (req.query.description) param_list.push('%' + req.query.description + '%');

    let limit = 10;
    let offset = 0;
    if (req.query.ppn) limit = req.query.ppn * 1;
    if (req.query.page) offset = limit * (req.query.page - 1);
    param_list.push(limit);
    param_list.push(offset);


    pool.query(sql, param_list, (err, function_list, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }

        res.send(resObj.success({
            msg: '获取部门功能成功',
            data: function_list
        }))
    })

});


module.exports = router;