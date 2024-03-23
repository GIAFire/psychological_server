const express = require("express");
const app = express();
// 导入配置文件
const bodyParser = require("body-parser");
// 1.导入session-cookie模块
const cookieSession = require("cookie-session")
// cookie模块
const cookieParser = require("cookie-parser");
// 导入路由配置
const registerRouter = require("./web_server/register")
const loginRouter = require('./web_server/login')

var config = app => {
    // 1.数据解析
    app.use(bodyParser.json()); // json格式数据解析
    app.use(registerRouter);
    app.use(loginRouter);

}

module.exports = config