const mysql = require("mysql")
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "psychological"
})

function query(sql, callback){
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err,rows){
            callback(err,rows); // 把错误和结果集进行回调
            connection.release(); // 释放资源
        })
    })
}

exports.query = query