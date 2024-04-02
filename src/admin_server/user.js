const express = require('express');
const router = express.Router();
const db = require("../db/nodejs_orm/index")
const handleDB = require("../db/handleDB") // 导入数据库文件
const CryptoJs = require ('crypto-js');  //导入加密库
const UUID = require ('../utils/UUID');  //导入UUID
const secret = 'dfgkeyuisfudhf';
const expiresIn = '1d';
const JWT = require ('../utils/JWT');  //导入JWT工具类


router.get("/userList",(req,res)=>{
    (async function () {
        var sql = "select * from user"
        let user = db.model("user");
        user.sql(sql,(err,results)=>{
            let obj = {
                "msg": "查询成功!",
                "data": results,
                "code": "0000"
            }
            res.send(obj)
        })
    })()
})

module.exports = router;