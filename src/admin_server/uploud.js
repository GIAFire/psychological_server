const express = require('express');
const multer = require('multer');
const router = express.Router();


// 设置存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // 确保这个文件夹已经存在
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post("/uploudVideo",upload.single('myFile'),(req,res)=>{
    // 获取文件名,返回给前端
    const fileName = "/uploads/"+req.file.filename;
    res.send(fileName);
})

router.post("/uploudImg",upload.single('myImg'),(req,res)=>{
    // 获取文件名,返回给前端
    const fileName = "/uploads/"+req.file.filename;
    res.send(fileName);
})

module.exports = router;