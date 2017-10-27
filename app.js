'use strict';
/*
** MODULES
*/
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const compression = require('compression');

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
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals = { translate: global.translate, links: global.config.links };

/*
** MIDDLEWARES
*/
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'})); 
app.use(bodyParser.urlencoded({limit: '10mb', extended: true})); 

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
    res.status(err.status || 500).send(err);
});

module.exports = app;
