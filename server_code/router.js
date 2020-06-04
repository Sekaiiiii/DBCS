"use strict"

const express = require("express");

const router = express.Router();

//路由配置
router.use("/api",require("./api/router"));

module.exports = router;