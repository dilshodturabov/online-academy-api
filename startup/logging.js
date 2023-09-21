require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/rf-logs.log', level: 'info' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://127.0.0.1:27017/test-logs', level: 'info' }));
    
    // process.on('uncaughtException', ex => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });
    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({ filename: 'logs/rf-logs.log'}));

    process.on('unhandledRejection', ex => {
        winston.error('unhandledRejection xatosi', ex.message, ex);
        process.exit(1);
    })

    // test for error handling
    // const myPromise = Promise.reject('yana boshqa kutilmagan xato!').then('bitdi!');
    
    // throw new Error('Kutilmagan xato!');
    
}