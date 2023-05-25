const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).send('Token mavjud bo`lmaganligi tufayli murojat rad etildi!');

        try {
            const decode = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decode;
            next()
        } catch (ex) {
            return res.status(400).send('Yaroqsiz Token');
        }

    }
}