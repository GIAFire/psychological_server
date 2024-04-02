const jwt = require('jsonwebtoken'); // 导入jwt工具库，用于生成token


const getToken  = (payload,secret,expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
}
module.exports = {
    getToken
}
