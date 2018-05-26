var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');
var logger = require('morgan');
var config = require('./config');


var users = require('./routes/users');
var company = require('./routes/company');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

mongoose.Promise = promise;

mongoose.connect(config.atlasdb, {server:{auto_reconnect:true}});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection-error'));
db.once('open', function () {
    console.log('Connected to tabtalent productiondb');
});

db.on('disconnected', function() {
    console.log('disconnected');
    console.log('dbURI is: '+config.atlasdb);
    mongoose.connect(config.atlasdb,
        {server: {auto_reconnect:true,
                socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},
            replset: { socketOptions: { keepAlive: 1 } }});
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/company', company);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// handle app level errors
app.use(function (err, req, res, next) {
    console.error(err.stack);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle the error here
        res.status(400).json({
            ps_api_response_code: 1001,
            ps_api_response_message: "JSON syntax error"
        });
    } else {
        res.status(500).json({error : err.message, stack : err.stack});
    }
    // Pass the error to the next middleware if it wasn't a JSON parse error
    next(err);
});

module.exports = app;
