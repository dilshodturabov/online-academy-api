require('express-async-errors');
const express = require('express');
const app = express();
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');
const enrollmentsRoute = require('./routes/enrollments');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const errorMiddleware = require('./middleware/error');
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
require('winston-mongodb');

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({ filename: 'logs/rf-logs.log', level: 'info'}));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://127.0.0.1:27017/test-logs', level: 'info'}));

process.on('uncaughtException', ex =>{
    winston.error(ex.message, ex);
    process.exit(1);
});

process.on('unhandledRejection', ex=>{
    winston.error('unhandledRejection xatosi', ex.message, ex);
    process.exit(1);
})

const myPromise = Promise.reject('yana boshqa kutilmagan xato!').then('bitdi!');

throw new Error('Kutilmagan xato!');



if (!config.get('jwtPrivateKey')) {
    winston.error('CRITICAL ERROR: restfullapp_jwtPrivateKey environment variable is undefined!');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/enrollments', enrollmentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use(errorMiddleware);

const urlToDatabase = "mongodb://127.0.0.1:27017/test";
mongoose.connect(urlToDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.debug('database connected...'))
    .catch(err => winston.error('Program crashed on connecting to database!', err))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    winston.info(`${port} - portni eshitayapman...`);
});