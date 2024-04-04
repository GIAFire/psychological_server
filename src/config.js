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
const adminLoginRouter = require('./admin_server/login')
const adminUser = require('./admin_server/user')
const uploud = require('./admin_server/uploud')
const adminVideo = require('./admin_server/video')

var config = app => {
    app.use('/uploads', express.static('uploads'));// 设置uploads文件夹为静态文件服务
    app.use(bodyParser.json()); // json格式数据解析
    app.use(registerRouter);
    app.use(loginRouter);
    app.use(adminLoginRouter);
    app.use(adminUser);
    app.use(uploud);
    app.use(adminVideo);

}

module.exports = config