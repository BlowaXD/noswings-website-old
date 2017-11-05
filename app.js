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
const session = require('express-session');
const cookieParser = require('cookie-parser');
const request = require('request');
const i18n = require('i18n');

/*
** GLOBALS
*/
global.config = require("./config/config");
global.translate = require("./config/translate");
global.online = {};
global.news = {};

/*
** ROUTES
*/
const routes = require('./routes');
const route_admin = routes.admin;
const route_shop = routes.shop;
const route_user = routes.user;
const route_moderator = routes.moderator;
const route_website = routes.website;
function refreshOnline() {
    request.get(global.config.api.get_online, (err, response, body) => {
        if (!err) {
            global.online = JSON.parse(body);
        }
    });
}

function refreshNews() {
    request.get(global.config.api.get_news, (err, response, body) => {
        if (!err) {
            global.news = JSON.parse(body);
        }
    });
}

/*
** SETUP EXPRESS
*/
const app = express();
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals = {translate: global.translate, links: global.config.links};
i18n.configure({
    locales: ['en', 'fr', 'es'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'i18n'
});


/*
** NEWS AND ONLINE STATUS
 */
refreshOnline();
refreshNews();
setInterval(function(){
    refreshOnline();
}, 30000);
setInterval(function(){
    refreshNews();
}, 3600000);


/*
** MULTILANGUAGE SUPPORT
*/
app.use(cookieParser("noswings_language"));
app.use(session({
    secret: "noswings_language",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(i18n.init);

/*
** MIDDLEWARES
*/
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

/* CREATE ROUTES */
app.use(function (req, res, next) {
    if (req.cookies.i18n) {
        res.setLocale(req.cookies.i18n);
    }
    res.locals.user = req.user;
    res.locals.__ = i18n.__;
    res.locals.online = Object.values(global.online).reduce((a, b) => a + b.length, 0);
    return (next());
});

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
app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.error(err);
    // render the error page
    res.status(err.status || 500).send(err);
});

module.exports = app;
