'use strict';
/*
** MODULES
*/
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

/*
** GLOBALS
*/
global.config = require("./config/config");
global.translate = require("./config/translate");

/*
** ROUTES
*/
const routes = require('./routes');
const route_admin = routes.admin;
const route_shop = routes.shop;
const route_user = routes.user;
const route_moderator = routes.moderator;
const route_website = routes.website;

/*
** SETUP EXPRESS
*/
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals = { translate: global.translate };

/*
** MIDDLEWARES
*/
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '8mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* CREATE ROUTES */
app.use(route_website);
app.use('/user', route_user);
app.use('/admin', route_admin);
app.use('/shop', route_shop);
app.use('/moderator', route_moderator);

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

    console.error(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error', user: {} });
});

module.exports = app;
