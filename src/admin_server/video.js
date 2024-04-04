const express = require('express');
const router = express.Router();
const db = require("../db/nodejs_orm/index")
const handleDB = require("../db/handleDB") // 导入数据库文件
const CryptoJs = require('crypto-js');  //导入加密库
const UUID = require('../utils/UUID');  //导入UUID
const secret = 'dfgkeyuisfudhf';
const expiresIn = '1d';
const JWT = require('../utils/JWT');  //导入JWT工具类


router.get("/videoList", (req, res) => {
    (async function () {
        let videoList = await handleDB(res,"video","find","查询失败!"," 1 = 1 order by sort asc")
        for (let i = 0; i < videoList.length; i++) {
            const element = videoList[i];
            element.image_url = 'http://localhost:3000' + element.image_url;
            element.video_url = 'http://localhost:3000' + element.video_url;
        }
        let obj = {
            "msg": "查询成功!",
            "data": videoList,
            "code": "0000"
        }
        res.send(obj)
    })()
})


router.post("/addVideo",(req,res)=>{
    (async function () {
        const { videoName, videoUrl,imageUrl,sort } = req.body; 
        const id = UUID.generateUUID();
        let results = await handleDB(res,"video","insert","插入失败!",{id:id,video_name:videoName,video_url:videoUrl,image_url:imageUrl,sort:sort})
        let obj = {}
        if(results.affectedRows == 1){
            obj = {"code" : "0000","msg":"视频添加成功!"}
        }else{
            obj = {"code" : "0007","msg":"视频添加失败!"}
        }
        res.send(obj)
    })()
})

router.post("/delVideo",(req,res)=>{
    (async function () {
        const { id } = req.body; 
        let results = await handleDB(res,"video","delete","删除失败!"," id= '"+id+"'")
        let obj = {}
        if(results.affectedRows == 1){
            obj = {"code" : "0000","msg":"视频删除成功!"}
        }else{
            obj = {"code" : "0007","msg":"视频删除失败!"}
        }
        res.send(obj)
    })()
})

router.post("/updateVideo",(req,res)=>{
    (async function () {
        const { videoName, videoUrl,imageUrl,sort } = req.body; 
        const id = UUID.generateUUID();
        let results = await handleDB(res,"video","insert","插入失败!",{id:id,video_name:videoName,video_url:videoUrl,image_url:imageUrl,sort:sort})
        let obj = {}
        if(results.affectedRows == 1){
            obj = {"code" : "0000","msg":"视频添加成功!"}
        }else{
            obj = {"code" : "0007","msg":"视频添加失败!"}
        }
        res.send(obj)
    })()
})


module.exports = router;