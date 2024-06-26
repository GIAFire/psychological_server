const express = require('express');
const router = express.Router();
const db = require("../db/nodejs_orm/index")
const handleDB = require("../db/handleDB") // 导入数据库文件
const CryptoJs = require ('crypto-js');  //导入加密库
const UUID = require ('../utils/UUID');  //导入UUID


router.post("/register",(req,res)=>{
    (async function () {
        const { phone, password,username,school,stuNum } = req.body; 
        let enPwd = CryptoJs.MD5(password).toString();
        const id = UUID.generateUUID();
        let results = await handleDB(res,"user","insert","插入失败!",{id:id,phone:phone,password:enPwd,username:username,school:school,stuNum:stuNum,status:1})
        let obj = {}
        if(results.affectedRows == 1){
            obj = {"code" : "0000","msg":"注册成功!"}
        }else{
            obj = {"code" : "0007","msg":"注册失败!"}
        }
        res.send(obj)
    })()
})

module.exports = router;