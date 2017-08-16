'use strict';
/*
** MODULES
*/
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

/*
** ROUTES
*/
const user = require('./routes/user');
const admin = require('./routes/admin');
const moderator = require('./routes/moderator');

/*
** GLOBALS
*/
global.config = require("./config/config");
global.translate = require("./config/translate");

const app = express();

app.use(function (req, res, next) {
    res.locals.domain = global.config.domain;
    res.locals.discordLink = global.config.urls.discord;
    res.locals.forumLink = global.config.urls.forumLink;
    res.locals.siteLink = global.config.urls.site;
    res.locals.logoLink = global.config.urls.logo;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
** MIDDLEWARES
*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

/* Basic routes */
app.use('/', user);

/*
    AUTH LEVEL
    >= ADMIN
 */
app.use('/admin', admin);

/*
    AUTH LEVEL
    >= GM
 */
app.use('/moderator', moderator);

// NEED TO CHECK IF SESSION OR REDIRECT TO LOGIN
/*app.get('*', function(req, res) {
   res.render('dashboard');
});*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
