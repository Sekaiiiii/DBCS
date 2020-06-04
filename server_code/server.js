"use strict"

//引入相关包
const express = require("express");
const path = require("path");
const session = require("express-session");
const body_parser = require('body-parser');
//引入配置文件
const app_conf = require("./config/app_conf.js");
const session_conf = require("./config/session_conf.js");

//创建app实例
const app = express();

//设置app监听端口
app.listen(app_conf.port, function () {
    console.log("服务器已经在本地" + app_conf.port + "端口打开");
})

//为app挂载session中间件
app.use(session(session_conf));

//app加载静态资源
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "uploads")));

//app挂载bodyparser中间件
app.use(body_parser.urlencoded());
app.use(body_parser.json());

//为app挂载路由
app.use("/", require("./router.js"));