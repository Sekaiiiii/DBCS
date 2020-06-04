const express = require('express');
const resObj = require('../tool/resObj.js');
const pool = require('../tool/pool.js');

const router = express.Router();

//参数验证
router.post("/", (req, res, next) => {
    if (!req.body.name) return next(new Error('300'));
    if (!req.body.password) return next(new Error('300'));
    next();
});

//业务处理
router.post("/", (req, res, next) => {
    let sql = `select * from user where name = ?`

    pool.query(sql, [req.body.name], (err, user_list, fileds) => {
        if (err) {
            console.error(err);
            return next(new Error('200'));
        }
        if (user_list.length == 0) return next(new Error('102'));
        if (user_list[0].password != req.body.password) return next(new Error('103'));

        req.session.is_login = true;
        req.session.user_id = user_list[0].id;
        req.session.name = user_list[0].name;
        req.session.role = user_list[0].role;
        req.session.employee_id = user_list[0].employee_id;

        res.send(resObj.success({
            'msg': '登录成功'
        }))
    })

});


module.exports = router;