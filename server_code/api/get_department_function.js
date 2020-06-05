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
        department_has_function,function
    where
        department_has_function.function_id = function.id and
        department_has_function.department_id = ?    
    `;

    pool.query(sql, req.query.department_id, (err, function_list, fileds) => {
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