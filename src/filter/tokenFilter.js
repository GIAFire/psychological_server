const jwt = require('jsonwebtoken');
const SECRET_KEY = 'psychological'; // 用于token的签名和验证的密钥

// 中间件函数，用于验证token
function verifyToken(req, res, next) {
    // 通常token是在请求头的Authorization字段中发送的
    let token = req.headers['authorization'];
    let tokenWithoutBearer = ''
    if (token) {
        tokenWithoutBearer = token.substring(7);
    }

    const reqPath = req.path;
    if (reqPath === '/login' || reqPath === '/register' || reqPath === '/adminLogin') {
        next(); // 继续下一个中间件或请求处理器
    } else {
        jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'token无效!' });
            }
            next(); // 继续下一个中间件或请求处理器
        });
    }


}

module.exports = verifyToken;