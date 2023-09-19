const winston = require('winston');

module.exports = function(err, req, res, next){
    // winston.log('error', err)
    winston.error(err.message, err)
    res.status(500).send('Serverda kutilmagan xato yuz berdi!');
}