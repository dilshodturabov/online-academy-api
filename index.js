require('express-async-errors');
const express = require('express');
const app = express();
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');
const enrollmentsRoute = require('./routes/enrollments');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

winston.add(winston.transports.File, {filename: 'restfullapp-logs.log'});
if(!config.get('jwtPrivateKey')){
    console.error('CRITICAL ERROR: restfullapp_jwtPrivateKey environment variable is undefined!');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/enrollments', enrollmentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use(function(err, req, res, next){
    winston.log('')
    res.status(500).send('Serverda kutilmagan xato yuz berdi!');
})
const urlToDatabase = "mongodb://127.0.0.1:27017/test";
mongoose.connect(urlToDatabase, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('database connected...'))
    .catch(err=>console.log('Program crashed on connecting to database!', err))

// console.log(config.get('mailserver.password'));

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`${port} - portni eshitayapman...`);
});