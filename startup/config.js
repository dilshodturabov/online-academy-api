const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('CRITICAL ERROR: restfullapp_jwtPrivateKey environment variable is undefined!');
    }
}