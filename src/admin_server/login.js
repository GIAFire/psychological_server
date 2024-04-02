const express = require('express');
const router = express.Router();
const db = require("../db/nodejs_orm/index")
const handleDB = require("../db/handleDB") // 导入数据库文件
const CryptoJs = require ('crypto-js');  //导入加密库
const UUID = require ('../utils/UUID');  //导入UUID
const secret = 'dfgkeyuisfudhf';
const expiresIn = '1d';
const JWT = require ('../utils/JWT');  //导入JWT工具类


router.post("/adminLogin",(req,res)=>{
    (async function () {
        const { phone, password } = req.body; 
        let enPwd = CryptoJs.MD5(password).toString();
        let results = await handleDB(res,"admin","find","查询失败!"," phone = '"+phone+"' and password = '"+enPwd+"'")
        // 将查询结果的第0个元素转换为JSON对象
        const user = JSON.parse(JSON.stringify(results[0]));
        user.password = '';
        // 使用JWT生成token
        const token = JWT.getToken(user,secret,expiresIn);
        user.token = token;
        let obj = {};
        // 根据查询结果的长度判断登录状态，并构造相应的返回对象
        if(results.length > 0){
            obj = {"code" : "0000","msg":"登录成功!","data":user}
        }else{
            obj = {"code" : "0007","msg":"登录失败!"}
        }
        // 发送登录结果给客户端
        res.send(obj)
    })()
})

module.exports = router;