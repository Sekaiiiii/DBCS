"use strict"

const express = require("express");

const resObj = require("../tool/resObj.js");

const verify_login = require("../middleware/verify_login.js");
const verify_no_login = require("../middleware/verify_no_login.js");
const verify_admin_permission = require('../middleware/verify_admin_permission.js');
const verify_root_permission = require('../middleware/verify_root_permission.js');

const router = express.Router();

// 非登录状态验证
router.use('/login', verify_no_login);

// 登录状态验证
router.use('/logout', verify_login);
router.use('/get_login_state', verify_login);

router.use('/add_user', verify_login);
router.use('/del_user', verify_login);
router.use('/set_user', verify_login);
router.use('/get_user', verify_login);

router.use('/add_employee', verify_login);
router.use('/del_employee', verify_login);
router.use('/set_employee', verify_login);
router.use('/get_employee', verify_login);

router.use('/add_department', verify_login);
router.use('/del_department', verify_login);
router.use('/set_department', verify_login);
router.use('/get_department', verify_login);

router.use('/add_department_function', verify_login);
router.use('/del_department_function', verify_login);
router.use('/set_department_function', verify_login);
router.use('/get_department_function', verify_login);

router.use('/set_myself_password', verify_login);
router.use('/add_myself_info', verify_login);
router.use('/set_myself_info', verify_login);
router.use('/get_myself_info', verify_login);

router.use('/set_user_permission', verify_login);
router.use('/mysql_dump', verify_login);
router.use('/get_mysql_dump', verify_login);
router.use('/del_mysql_dump', verify_login);
router.use('/recovery', verify_login);

// 管理员权限验证
router.use('/add_user', verify_admin_permission);
router.use('/del_user', verify_admin_permission);
router.use('/set_user', verify_admin_permission);
router.use('/get_user', verify_admin_permission);

router.use('/add_employee', verify_admin_permission);
router.use('/del_employee', verify_admin_permission);
router.use('/set_employee', verify_admin_permission);
router.use('/get_employee', verify_admin_permission);

router.use('/add_department', verify_admin_permission);
router.use('/del_department', verify_admin_permission);
router.use('/set_department', verify_admin_permission);
router.use('/get_department', verify_admin_permission);

router.use('/add_department_function', verify_admin_permission);
router.use('/del_department_function', verify_admin_permission);
router.use('/set_department_function', verify_admin_permission);
router.use('/get_department_function', verify_admin_permission);

// Root权限验证
router.use('/set_user_permission', verify_root_permission);
router.use('/mysql_dump', verify_root_permission);
router.use('/get_mysql_dump', verify_root_permission);
router.use('/del_mysql_dump', verify_root_permission);
router.use('/recovery', verify_root_permission);

// 通过各种验证交给具体业务板块处理
router.use('/get_login_state', require('./get_login_state.js'));
router.use('/login', require('./login.js'));
router.use('/logout', require('./logout.js'));

router.use('/add_user', require('./add_user.js'));
router.use('/del_user', require('./del_user.js'));
router.use('/set_user', require('./set_user.js'));
router.use('/get_user', require('./get_user.js'));

router.use('/add_employee', require('./add_employee.js'));
router.use('/del_employee', require('./del_employee.js'));
router.use('/set_employee', require('./set_employee.js'));
router.use('/get_employee', require('./get_employee.js'));

router.use('/add_department', require('./add_department.js'));
router.use('/del_department', require('./del_department.js'));
router.use('/set_department', require('./set_department.js'));
router.use('/get_department', require('./get_department.js'));

router.use('/add_department_function', require('./add_department_function'));
router.use('/set_department_function', require('./set_department_function'));
router.use('/del_department_function', require('./del_department_function'));
router.use('/get_department_function', require('./get_department_function'));


router.use('/set_myself_password', require('./set_myself_password.js'));

router.use('/add_myself_info', require('./add_myself_info.js'));
router.use('/set_myself_info', require('./set_myself_info.js'));
router.use('/get_myself_info', require('./get_myself_info.js'));

router.use('/set_user_permission', require('./set_user_permission.js'));
router.use('/mysql_dump', require('./mysql_dump.js'));
router.use('/get_mysql_dump', require('./get_mysql_dump.js'));
router.use('/del_mysql_dump', require('./del_mysql_dump.js'));
router.use('/recovery', require('./recovery.js'));

// 统一的错误处理
router.use('*', function (err, req, res, next) {
    switch (err.message) {
        case '100':
            res.send(resObj.fail('100', '用户未登录'));
            break;
        case '101':
            res.send(resObj.fail('101', '用户已登录'));
            break;
        case '102':
            res.send(resObj.fail('102', '用户名不存在'));
            break;
        case '103':
            res.send(resObj.fail('103', '账号密码不匹配'));
            break;
        case '104':
            res.send(resObj.fail('104', '调用退出登录接口出现异常'));
            break;
        case '105':
            res.send(resObj.fail('105', '用户调用该接口应具有Admin权限'));
            break;
        case '106':
            res.send(resObj.fail('106', '用户调用该接口应具有Root权限'));
            break;
        case '200':
            res.send(resObj.fail('200', '调用数据库接口出错'));
            break;
        case '201':
            res.send(resObj.fail('201', '没有找到要相应的数据'));
            break;
        case '202':
            res.send(resObj.fail('202', '没有改变相应的数据'));
            break;
        case '203':
            res.send(resObj.fail('203', '获取数据库连接失败'));
            break;
        case '204':
            res.send(resObj.fail('204', '开始数据库事务失败'));
            break;
        case '205':
            res.send(resObj.fail('205', '提交数据库事务失败'));
            break;
        case '206':
            res.send(resObj.fail('206', '数据库备份失败'));
            break;
        case '207':
            res.send(resObj.fail('207', '获取本地文件信息失败'));
            break;
        case '300':
            res.send(resObj.fail('300', '缺少必要的输入参数'));
            break;
        case '301':
            res.send(resObj.fail('301', '传入参数的格式有误'));
            break;
        case '999':
            res.send(resObj.fail('999', '出乎意料的错误'));
            break;
        default:
            res.send(resObj.fail('???', '你是不是还有没有设置的错误嘛'));
            break;
    }
})


module.exports = router;