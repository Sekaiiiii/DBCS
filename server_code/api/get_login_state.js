const express = require('express');
const resObj = require('../tool/resObj.js');

const router = express.Router();

//参数验证
router.post("/", (req, res, next) => {
    next();
});

//业务处理
router.get("/", (req, res, next) => {
    res.send(resObj.success({
        msg: '获取登录状态成功',
        is_login: req.session.is_login ? req.session.is_login : false,
        user_info: {
            user_id: req.session.user_id,
            name: req.session.name,
            role: req.session.role,
            employee_id: req.session.employee_id
        }
    }))
});

module.exports = router;