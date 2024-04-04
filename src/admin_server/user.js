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
        let results = await handleDB(res,"user","find","查询失败!"," 1 = 1 ");
        let obj = {
            "msg": "查询成功!",
            "data": results,
            "code": "0000"
        }
        res.send(obj)
    })()
})

router.post("/banUser",(req,res)=>{
    (async function () {
        const { id,status } = req.body; 
        let results = await handleDB(res,"user","update","修改失败!"," id = '"+id+"'",{status:status});
        let obj = {}
        if(results.affectedRows == 1){
            obj = {"code" : "0000","msg":"修改成功!"}
        }else{
            obj = {"code" : "0007","msg":"修改失败!"}
        }
        res.send(obj)
    })()
})

module.exports = router;