const express = require('express')
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const winston = require('winston');
const links = require('./src/routes/links');
const redirect = require('./src/routes/redirect');
const users = require('./src/routes/users');
const notFound = require('./assets/errors/404.json');
const defaultError = require('./assets/errors/500.json');
const auth = require('./src/helpers/auth');
const config = require('./config');
const app = express()

let port = config.app.port || '3000';
winston.level = config.app.env || 'debug';

// Express config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.app.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/links', links);
app.use('/users', users);
app.use(redirect);

// Catch 404 
app.use(function(req, res, next) {
    res.status(404).json(notFound);
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.status(err.status || 500);
    res.json(defaultError);
});

// Passport config
auth.config(passport);

// Mongoose config
const url = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name;
console.log(url);
mongoose.connect(url, {
    useMongoClient: true,
});

// Start app
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});
