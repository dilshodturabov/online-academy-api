const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    const urlToDatabase = "mongodb://127.0.0.1:27017/test";
    mongoose.connect(urlToDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.debug('database connected...'))
}