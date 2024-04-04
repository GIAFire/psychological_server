const jwt = require('jsonwebtoken'); // 导入jwt工具库，用于生成token
const secret = 'psychological';
const expiresIn = '1d';

const getToken  = (payload) => {
    return jwt.sign(payload, secret, { expiresIn });
}
module.exports = {
    getToken
}
